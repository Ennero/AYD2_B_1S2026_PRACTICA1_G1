import { getPublicObjectStorage } from '../adapters/storage/index.ts'

export async function uploadBufferToBucket(opts: {
    bucket: string
    path: string
    contentType: string
    data: ArrayBuffer | Uint8Array
}): Promise<{ publicUrl: string }>
{
    const storage = getPublicObjectStorage()
    return storage.uploadObject(opts)
}

export function buildPublicBucketPath(parts: string[]) {
    return parts
        .filter(Boolean)
        .join('/')
        .replaceAll('..', '.')
        .replaceAll('//', '/')
}
