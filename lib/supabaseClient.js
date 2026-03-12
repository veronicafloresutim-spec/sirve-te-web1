//import { createClient } from '@supabase/supabase-js';

//export const supabase = createClient(
  //process.env.NEXT_PUBLIC_SUPABASE_URL,
  //process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
//);

import { createClient } from "@supabase/supabase-js";

// Conexión a Supabase usando variables de entorno
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
);

