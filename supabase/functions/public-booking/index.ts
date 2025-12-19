
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// In-Memory Rate Limiter (MVP - Per instance)
// Key: IP -> { count, resetTime }
const rateLimitMap = new Map<string, { count: number, resetTime: number }>();

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { 
      name, 
      email, 
      message, 
      date, 
      guests, 
      metadata, 
      source_path,
      honeypot
    } = await req.json()

    // 1. Honeypot check
    if (honeypot) {
         // Silently succeed
         return new Response(JSON.stringify({ ok: true, spam: true }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
        })
    }
    
    // 2. Rate Limit (3/hour per IP)
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const limitRecord = rateLimitMap.get(ip);
    
    if (limitRecord) {
        if (now > limitRecord.resetTime) {
             rateLimitMap.set(ip, { count: 1, resetTime: now + 3600000 });
        } else {
             if (limitRecord.count >= 3) {
                 return new Response(JSON.stringify({ error: 'Too many requests. Please try again later.' }), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                    status: 429,
                })
             }
             limitRecord.count++;
        }
    } else {
         rateLimitMap.set(ip, { count: 1, resetTime: now + 3600000 });
    }

    // 3. Supabase Client (Service Role)
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // 4. Insert (Human Origin)
    const { error } = await supabaseClient
      .from('booking_intents')
      .insert({
        name: name || "Anonymous User",
        contact_email: email, 
        message: message,
        origin: 'human',
        status: 'new',
        source_path: source_path,
        metadata: {
           channel: metadata?.channel || 'form',
           agent_suggested: metadata?.agent_suggested || false,
           confidence: metadata?.confidence,
           preferences: {
             date,
             guests
           }
        }
      })

    if (error) throw error

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
