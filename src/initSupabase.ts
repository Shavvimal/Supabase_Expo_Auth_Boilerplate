import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://yvzhhovdlkectuzsaplx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2emhob3ZkbGtlY3R1enNhcGx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDk5Mzc0MTMsImV4cCI6MTk2NTUxMzQxM30.nErmz8WQN22NDRm7etEQ-nemMpfBAbSNaG80AGS-vqs'


// Better put your these secret keys in .env file
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  localStorage: AsyncStorage as any,
  detectSessionInUrl: false, // Prevents Supabase from evaluating window.location.href, breaking mobile
  autoRefreshToken: true,
  persistSession: true,
});
