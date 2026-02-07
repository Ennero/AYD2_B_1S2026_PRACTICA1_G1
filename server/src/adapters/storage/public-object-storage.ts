export type UploadObjectInput = {
    bucket: string
    path: string
    contentType: string
    data: ArrayBuffer | Uint8Array
}

export type UploadObjectResult = {
    publicUrl: string
}

// Target interface (the "expected" API inside the project).
// Concrete providers (Supabase, S3, local FS, etc.) adapt to this.
export interface PublicObjectStorage {
    uploadObject(input: UploadObjectInput): Promise<UploadObjectResult>
}
