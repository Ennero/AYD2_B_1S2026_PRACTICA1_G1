import { createClient, type SupabaseClient } from '@supabase/supabase-js'

import { getRequiredEnv } from '../utils/env.ts'

declare global {
    // eslint-disable-next-line no-var
    var supabase: SupabaseClient | undefined
}

export function getSupabaseClient(): SupabaseClient {
    const url = getRequiredEnv('SUPABASE_URL')
    // Prefer service role key when running server-side; if not present, anon key works for public buckets.
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_ANON_KEY
    if (!key) throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY or SUPABASE_ANON_KEY')

    const existing = global.supabase
    if (existing) return existing

    const client = createClient(url, key)
    if (process.env.NODE_ENV === 'development') global.supabase = client

    return client
}
