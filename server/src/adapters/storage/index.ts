import type { PublicObjectStorage } from './public-object-storage.ts'
import { SupabasePublicObjectStorageAdapter } from './supabase-public-object-storage.adapter.ts'

let storage: PublicObjectStorage | undefined

export function getPublicObjectStorage(): PublicObjectStorage {
    if (storage) return storage
    storage = new SupabasePublicObjectStorageAdapter()
    return storage
}

export type { PublicObjectStorage, UploadObjectInput, UploadObjectResult } from './public-object-storage.ts'
