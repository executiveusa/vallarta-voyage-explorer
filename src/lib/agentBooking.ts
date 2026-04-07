// Agent booking - frontend-only stub
export interface AgentBookingPayload {
  source: "agent";
  agent_id: string;
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
  confidence: number;
  notes?: string;
  request_id?: string;
}

export interface AgentTargetInput {
  area?: string;
  category?: string;
  sunset_spot_id?: string;
}

export const findAgentTarget = async (_input: AgentTargetInput) => {
  console.log('[AgentBooking] findAgentTarget - frontend only, no-op');
  return null;
};

export const createAgentBooking = async (payload: AgentBookingPayload) => {
  console.log('[AgentBooking] createAgentBooking - frontend only', payload);
  return { id: crypto.randomUUID(), status: 'pending', isDuplicate: false };
};
