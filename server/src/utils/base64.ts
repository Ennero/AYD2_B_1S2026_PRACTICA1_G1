export function decodeBase64ToBytes(input: string): Uint8Array {
    // Supports plain base64 or data URLs like: data:image/png;base64,AAAA
    const trimmed = input.trim()

    const commaIndex = trimmed.indexOf(',')
    const base64 = trimmed.startsWith('data:') && commaIndex !== -1 ? trimmed.slice(commaIndex + 1) : trimmed

    // Node.js global Buffer is available (types come from @types/node)
    return Uint8Array.from(Buffer.from(base64, 'base64'))
}

export function guessExtensionFromMime(mime: string): string {
    const normalized = mime.toLowerCase().trim()
    if (normalized === 'image/jpeg' || normalized === 'image/jpg') return 'jpg'
    if (normalized === 'image/png') return 'png'
    if (normalized === 'image/webp') return 'webp'
    if (normalized === 'image/gif') return 'gif'
    return 'bin'
}
