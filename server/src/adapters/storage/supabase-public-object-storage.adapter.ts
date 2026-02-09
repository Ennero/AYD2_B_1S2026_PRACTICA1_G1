import { getSupabaseClient } from '../../lib/supabase.ts'
import type { PublicObjectStorage, UploadObjectInput, UploadObjectResult } from './public-object-storage.ts'

export class SupabasePublicObjectStorageAdapter implements PublicObjectStorage {
    private readonly ensuredBuckets = new Set<string>()

    async uploadObject(input: UploadObjectInput): Promise<UploadObjectResult> {
        const supabase = getSupabaseClient()

        const uploadOnce = async () => {
            return supabase.storage.from(input.bucket).upload(input.path, input.data, {
                contentType: input.contentType,
                upsert: true,
            })
        }

        let { error } = await uploadOnce()

        // If the bucket doesn't exist, try to create it (requires service role key / admin perms).
        if (error && /bucket not found/i.test(error.message) && !this.ensuredBuckets.has(input.bucket)) {
            this.ensuredBuckets.add(input.bucket)

            const { error: createError } = await supabase.storage.createBucket(input.bucket, {
                public: true,
            })

            if (createError) {
                throw new Error(
                    `Bucket "${input.bucket}" not found and could not be created automatically. ` +
                        `Create it in Supabase Dashboard (Storage) or set SUPABASE_SERVICE_ROLE_KEY. ` +
                        `Details: ${createError.message}`,
                )
            }

            ;({ error } = await uploadOnce())
        }

        if (error) throw error

        const { data } = supabase.storage.from(input.bucket).getPublicUrl(input.path)
        return { publicUrl: data.publicUrl }
    }
}
