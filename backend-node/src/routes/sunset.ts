import { Hono } from 'hono';
import SunCalc from 'suncalc';

const app = new Hono();

// Puerto Vallarta coordinates
const PUERTO_VALLARTA = {
  latitude: 20.6534,
  longitude: -105.2253,
  timezone: 'America/Mexico_City'
};

/**
 * Calculate current sunset phase
 * Returns: "day", "golden", or "night"
 */
function calculateSunsetPhase(date: Date = new Date()): {
  phase: 'day' | 'golden' | 'night';
  sunset: Date;
  sunrise: Date;
  goldenHourStart: Date;
  goldenHourEnd: Date;
  nightStart: Date;
  nextPhaseChange: Date;
} {
  const times = SunCalc.getTimes(date, PUERTO_VALLARTA.latitude, PUERTO_VALLARTA.longitude);
  
  const now = date.getTime();
  const sunriseTime = times.sunrise.getTime();
  const sunsetTime = times.sunset.getTime();
  const goldenHourEnd = times.goldenHour.getTime(); // Evening golden hour start
  const nightStart = times.night.getTime(); // When it gets fully dark
  
  // Golden hour: 1 hour before sunset to ~30 min after sunset
  const goldenHourStart = sunsetTime - (60 * 60 * 1000); // 1 hour before sunset
  const goldenHourEndTime = nightStart; // Until astronomical twilight ends
  
  let phase: 'day' | 'golden' | 'night';
  let nextPhaseChange: Date;
  
  if (now < goldenHourStart) {
    phase = 'day';
    nextPhaseChange = new Date(goldenHourStart);
  } else if (now >= goldenHourStart && now < goldenHourEndTime) {
    phase = 'golden';
    nextPhaseChange = new Date(goldenHourEndTime);
  } else {
    phase = 'night';
    // Next phase change is tomorrow's golden hour
    const tomorrow = new Date(date);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowTimes = SunCalc.getTimes(tomorrow, PUERTO_VALLARTA.latitude, PUERTO_VALLARTA.longitude);
    nextPhaseChange = new Date(tomorrowTimes.sunset.getTime() - (60 * 60 * 1000));
  }
  
  return {
    phase,
    sunset: times.sunset,
    sunrise: times.sunrise,
    goldenHourStart: new Date(goldenHourStart),
    goldenHourEnd: new Date(goldenHourEndTime),
    nightStart: times.night,
    nextPhaseChange
  };
}

/**
 * GET /api/sunset/phase
 * Returns current sunset phase and timing data
 */
app.get('/phase', (c) => {
  try {
    const result = calculateSunsetPhase();
    
    return c.json({
      phase: result.phase,
      location: {
        city: 'Puerto Vallarta',
        latitude: PUERTO_VALLARTA.latitude,
        longitude: PUERTO_VALLARTA.longitude,
        timezone: PUERTO_VALLARTA.timezone
      },
      times: {
        sunrise: result.sunrise.toISOString(),
        sunset: result.sunset.toISOString(),
        goldenHourStart: result.goldenHourStart.toISOString(),
        goldenHourEnd: result.goldenHourEnd.toISOString(),
        nightStart: result.nightStart.toISOString()
      },
      nextPhaseChange: result.nextPhaseChange.toISOString(),
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error calculating sunset phase:', error);
    return c.json({ error: 'Failed to calculate sunset phase' }, 500);
  }
});

/**
 * GET /api/sunset/forecast
 * Returns sunset times for the next 7 days
 */
app.get('/forecast', (c) => {
  try {
    const forecast = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      
      const result = calculateSunsetPhase(date);
      
      forecast.push({
        date: date.toISOString().split('T')[0],
        sunset: result.sunset.toISOString(),
        goldenHourStart: result.goldenHourStart.toISOString(),
        goldenHourEnd: result.goldenHourEnd.toISOString()
      });
    }
    
    return c.json({
      location: {
        city: 'Puerto Vallarta',
        latitude: PUERTO_VALLARTA.latitude,
        longitude: PUERTO_VALLARTA.longitude
      },
      forecast
    });
  } catch (error) {
    console.error('Error generating sunset forecast:', error);
    return c.json({ error: 'Failed to generate forecast' }, 500);
  }
});

export default app;
