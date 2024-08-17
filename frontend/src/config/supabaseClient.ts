import { createClient } from '@supabase/supabase-js';

const supabaseUrl = window.process.env.VITE_SUPA_URL || '';
const supabaseKey = window.process.env.VITE_SUPA_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
