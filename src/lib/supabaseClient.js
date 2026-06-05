import { createClient } from '@supabase/supabase-js';

// Prefer Vite environment variables; fall back to the hardcoded values for
// backwards compatibility. For production, set `VITE_SUPABASE_URL` and
// `VITE_SUPABASE_ANON_KEY` in your environment and remove the hardcoded key.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://uzyfrpndedbobsawgoek.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6eWZycG5kZWRib2JzYXdnb2VrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5MTAzMzEsImV4cCI6MjA5NTQ4NjMzMX0.-moXkvWSCoIcFYd79k7hno9rZ9A2belOpUc-jWmtenU';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
