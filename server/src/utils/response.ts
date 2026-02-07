import type { Response } from 'express'

export type ErrorResponseBody = {
    ok: false
    message: string
    details?: unknown
}

export type OkResponseBody<T> = {
    ok: true
    data: T
}

export function response_ok<T>(res: Response, data: T, statusCode = 200) {
    return res.status(statusCode).json({ ok: true, data } satisfies OkResponseBody<T>)
}

export function response_with_error(
    res: Response,
    opts: {
        statusCode?: number
        message: string
        details?: unknown
    },
) {
    const statusCode = opts.statusCode ?? 500
    return res.status(statusCode).json({
        ok: false,
        message: opts.message,
        ...(opts.details === undefined ? {} : { details: opts.details }),
    } satisfies ErrorResponseBody)
}

// Aliases (por si en otros módulos lo llaman en camelCase)
export const responseOk = response_ok
export const responseWithError = response_with_error

export function assertNever(x: never, message = 'Unexpected value'): never {
    throw new Error(`${message}: ${String(x)}`)
}
