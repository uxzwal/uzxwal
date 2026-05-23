// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Database features will be disabled.');
}

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Check connection
export const checkConnection = async () => {
  if (!supabase) return false;
  
  try {
    const { error } = await supabase.from('projects').select('count');
    return !error;
  } catch (err) {
    console.error('Supabase connection error:', err);
    return false;
  }
};
