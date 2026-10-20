import { createClient } from '@supabase/supabase-js'

// Configure with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (anon key only; never the service role key).
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const isSupabaseConfigured = Boolean(url && key)

// Placeholder values keep the client constructible when unconfigured; callers must check
// isSupabaseConfigured before sending anything.
export const supabase = createClient(url || 'http://localhost:54321', key || 'unconfigured')
