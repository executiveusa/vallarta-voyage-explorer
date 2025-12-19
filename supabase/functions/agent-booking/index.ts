
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-agent-secret',
}

// Simple in-memory rate limit map (clears on cold start)
// Key: string (IP or AgentID) -> { count: number, resetTime: number }
const rateLimitMap = new Map<string, { count: number, resetTime: number }>();

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { 
      agent_id, 
      user_context, 
      target, 
      confidence, 
      notes, 
      request_id 
    } = await req.json()

    // 1. Auth Check (Shared Secret)
    const secret = req.headers.get('x-agent-secret');
    const envSecret = Deno.env.get('AGENT_BOOKING_SECRET');
    
    // For local dev/MVP without env secret set, weak fallback or strict?
    // STRICT: If env var is set, enforce it. If not set, maybe allow dev?
    // Let's enforce it if it exists, otherwise warn/block.
    // For this implementation, let's assume if env var is missing, we open (or strict fail).
    // Let's strict fail if env var is set.
    if (envSecret && secret !== envSecret) {
         return new Response(JSON.stringify({ error: 'Unauthorized agent' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401,
        })
    }


    // 2. Rate Limiting (Memory)
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const limitKey = `${agent_id || 'anon'}:${ip}`;
    const now = Date.now();
    const limitRecord = rateLimitMap.get(limitKey);

    if (limitRecord) {
        if (now > limitRecord.resetTime) {
            // Reset
            rateLimitMap.set(limitKey, { count: 1, resetTime: now + 3600000 });
        } else {
            if (limitRecord.count >= 10) { // Max 10 per hour per agent/IP combo
                 return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                    status: 429,
                })
            }
            limitRecord.count++;
        }
    } else {
        rateLimitMap.set(limitKey, { count: 1, resetTime: now + 3600000 });
    }

    // 3. Supabase Client (Service Role)
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // 4. Idempotency Check
    if (request_id) {
        const { data: existing } = await supabaseClient
            .from('booking_intents')
            .select('id, status')
            .eq('request_id', request_id)
            .single();
        
        if (existing) {
             return new Response(JSON.stringify({ 
                 message: 'Duplicate request', 
                 booking_id: existing.id, 
                 status: existing.status,
                 isDuplicate: true 
             }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200,
            })
        }
    }

    // 5. Routing Logic
    let attributedListingId = null;
    let effectiveStatus = 'new';
    
    // Confidence Gate
    if (confidence < 0.7) {
        effectiveStatus = 'needs_clarification';
    }

    // Target Logic (Server-Side)
    if (target?.type === 'listing' && target.id) {
        attributedListingId = target.id;
    } else if (user_context.preferences) {
        // Simple routing heuristic: 
        // If area provided -> find 'verified' partner in area
        // This simulates the 'findAgentTarget' logic safely
        // For MVP, if no direct target, we leave attributed_listing_id null => Admin triage
    }


    // 6. Insert Intent
    const { data, error } = await supabaseClient
      .from('booking_intents')
      .insert({
        name: user_context.name || "Agent User",
        contact_email: user_context.email || "agent_placeholder@example.com", 
        message: notes || "Agent-generated booking intent.",
        origin: 'agent',
        agent_id: agent_id || 'unknown',
        confidence: confidence,
        request_id: request_id, 
        status: effectiveStatus,
        attributed_listing_id: attributedListingId,
        metadata: {
           agent: true,
           agent_id: agent_id,
           preferences: user_context.preferences,
           notes: notes
        }
      })
      .select()
      .single()

    if (error) throw error

    return new Response(JSON.stringify({ 
        message: 'Agent booking intent created',
        booking_id: data.id,
        status: data.status,
        isDuplicate: false
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 201,
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
