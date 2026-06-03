import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://uzyfrpndedbobsawgoek.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6eWZycG5kZWRib2JzYXdnb2VrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5MTAzMzEsImV4cCI6MjA5NTQ4NjMzMX0.-moXkvWSCoIcFYd79k7hno9rZ9A2belOpUc-jWmtenU';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;

export const AppConfig = {
  appName: 'ExpoVix',
  version: '1.0.0',
  plans: {
    starter: { maxBooths: 300, maxEvents: 3 },
    pro: { maxBooths: 600, maxEvents: 10 },
    business: { maxBooths: null, maxEvents: null }
  }
};