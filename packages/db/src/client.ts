import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { createClient } from "@supabase/supabase-js";
import * as schema from "./schema";

// 1. Drizzle ORM Database Connection
const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres:postgres@127.0.0.1:5432/adhyayan_ai";

const client = postgres(connectionString, { max: 10 });
export const db = drizzle(client, { schema });

// 2. Supabase Client for Auth & Storage
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
