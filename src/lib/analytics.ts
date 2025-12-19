import { supabase } from "@/integrations/supabase/client";

export const trackEvent = async (eventName: string, properties: Record<string, any> = {}) => {
  try {
    await supabase.from('events').insert({
      event_name: eventName,
      properties: properties
    });
  } catch (err) {
    console.error('Analytics error:', err);
  }
};
