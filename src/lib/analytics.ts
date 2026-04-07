export const trackEvent = async (eventName: string, properties: Record<string, unknown> = {}) => {
  // Frontend-only: log to console
  console.log('[Analytics]', eventName, properties);
};
