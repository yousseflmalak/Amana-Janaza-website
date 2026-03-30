import { createClient } from '@supabase/supabase-js';

/**
 * Client Supabase avec la clé service_role.
 * Bypass les RLS — à utiliser UNIQUEMENT côté serveur (Server Components, API Routes).
 * Ne jamais exposer au client.
 */
export function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
