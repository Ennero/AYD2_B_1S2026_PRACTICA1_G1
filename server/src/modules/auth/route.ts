import { Router } from 'express'
import { body } from 'express-validator'

import * as controller from './controller.ts'
import { validateFields } from '../../middleware/validate-fields.ts'
import { authMiddleware } from '../../middleware/auth.ts'

const authRouter = Router()

authRouter.post(
    '/register',
    [
        body('email').isEmail().withMessage('email must be valid'),
        body('password')
            .isString()
            .isLength({ min: 6, max: 72 })
            .withMessage('password must be between 6 and 72 chars'),
        body('name').isString().notEmpty().withMessage('name is required'),
        body('last_name').isString().notEmpty().withMessage('last_name is required'),
        // If you already have a URL, you can still pass it.
        body('url_img').optional({ nullable: true }).isURL().withMessage('url_img must be a valid URL'),

        // If you want the API to upload the image to Supabase Storage, send base64 + mime.
        body('img_base64').optional().isBase64().withMessage('img_base64 must be base64 (or data URL)'),
        body('img_mime').optional().isMimeType().withMessage('img_mime must be a valid mime type'),
        body('phone').isString().isLength({ min: 8, max: 9 }).withMessage('phone must be 8-9 chars'),
        body('gender').isNumeric().withMessage('gender must be numeric'),
        validateFields,
    ],
    controller.register,
)

authRouter.post(
    '/login',
    [
        body('email').isEmail().withMessage('email must be valid'),
        body('password').isString().notEmpty().withMessage('password is required'),
        validateFields,
    ],
    controller.login,
)

authRouter.get('/me', authMiddleware, controller.me)

export default authRouter