import { createClient } from "@supabase/supabase-js";
import type { RegistrationInput } from "@/lib/registration-schema";

export type RegistrationRecord = RegistrationInput & {
  id: string;
  created_at: string;
};

type Database = {
  public: {
    Tables: {
      registrations: {
        Row: RegistrationRecord;
        Insert: RegistrationInput;
        Update: Partial<RegistrationInput>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function hasSupabaseConfig() {
  return Boolean(supabaseUrl && (serviceRoleKey || anonKey));
}

export function getSupabaseAdmin() {
  if (!supabaseUrl || (!serviceRoleKey && !anonKey)) {
    return null;
  }

  return createClient<Database>(supabaseUrl, serviceRoleKey ?? anonKey!, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}

export async function createRegistration(input: RegistrationInput) {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return {
      data: null,
      error: new Error("Supabase environment variables are not configured.")
    };
  }

  const { data, error } = await supabase
    .from("registrations")
    .insert(input)
    .select("id, created_at")
    .single();

  return { data, error };
}

export async function getRegistrations() {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return {
      data: [] as RegistrationRecord[],
      error: new Error("Supabase environment variables are not configured.")
    };
  }

  const { data, error } = await supabase
    .from("registrations")
    .select("*")
    .order("created_at", { ascending: false });

  return {
    data: data ?? [],
    error
  };
}
