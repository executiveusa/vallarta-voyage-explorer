import { supabase } from "@/integrations/supabase/client";

export interface AgentBookingPayload {
  source: "agent";
  agent_id: string; // "openai:gpt-4" | "chatbot"
  user_context: {
    name?: string;
    email?: string;
    preferences?: {
      date?: string;
      guests?: number;
      vibe?: string;
      budget?: string;
    };
  };
  target?: {
    type: "sunset_spot" | "listing" | "experience";
    id: string;
  };
  confidence: number; // 0.0 - 1.0
  notes?: string;
  request_id?: string; // For idempotency
}

export interface AgentTargetInput {
  area?: string;
  category?: string;
  sunset_spot_id?: string;
}

export const findAgentTarget = async (input: AgentTargetInput) => {
  // 1. Query listings by area/category
  // Prioritize: Concierge > Verified > Featured
  // Never return Free for auto-routing

  let query = supabase
    .from('listings')
    .select('*')
    .neq('plan_tier', 'free'); // Exclude free

  if (input.area) {
    query = query.eq('area', input.area);
  }
  if (input.category) {
    query = query.eq('category', input.category);
  }

  const { data, error } = await query;

  if (error || !data || data.length === 0) {
    return null;
  }

  // 2. Sort results in memory (or SQL if simple)
  // Priority: concierge > verified > featured
  const tierWeight = {
    'concierge': 3,
    'partner': 2, // 'featured' in DB might be 'partner' or 'verified', existing migration used 'featured' text internally or 'partner' check
    'verified': 2, 
    'featured': 1,
    'free': 0
  };

  const sorted = data.sort((a, b) => {
    // @ts-ignore
    const scoreA = tierWeight[a.plan_tier] || 0;
    // @ts-ignore
    const scoreB = tierWeight[b.plan_tier] || 0;
    return scoreB - scoreA;
  });

  return sorted[0]; // Best match
};

export const createAgentBooking = async (payload: AgentBookingPayload) => {
  // 1. Idempotency Check
  if (payload.request_id) {
    const { data: existing } = await supabase
      .from('booking_intents')
      .select('id, status')
      .eq('request_id', payload.request_id)
      .single();
    
    if (existing) {
      console.log("Idempotent booking hit:", existing);
      return { id: existing.id, status: existing.status, isDuplicate: true };
    }
  }

  // 2. Confidence Gate
  let status = 'new';
  if (payload.confidence < 0.7) {
    status = 'needs_clarification';
  }

  // 3. Resolve Target
  let attributedListingId = null;
  if (payload.target?.type === 'listing' && payload.target.id) {
    attributedListingId = payload.target.id;
  } else if (!payload.target?.id) {
    // Try to resolve generic target if context allows (not fully implemented in this MVP block, relying on direct target or manual triage)
    // Future: call findAgentTarget based on preferences
    if (payload.user_context.preferences?.vibe) {
        // Example: find listing by vibe/area (simplified)
    }
  }

  // 4. Insert
  const { data, error } = await supabase
    .from('booking_intents')
    .insert({
      name: payload.user_context.name || "Agent User",
      contact_email: payload.user_context.email || "agent_placeholder@example.com", 
      message: payload.notes || "Agent-generated booking intent.",
      origin: 'agent',
      agent_id: payload.agent_id,
      confidence: payload.confidence,
      request_id: payload.request_id,
      status: status,
      attributed_listing_id: attributedListingId,
      metadata: {
        agent: true,
        preferences: payload.user_context.preferences
      }
    })
    .select()
    .single();

  if (error) {
    console.error("Agent booking failed:", error);
    throw error;
  }

  return { id: data.id, status: data.status, isDuplicate: false };
};
