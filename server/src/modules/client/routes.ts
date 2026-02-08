import { Router } from 'express'
import { body } from 'express-validator'

import { ClientController } from './controller.ts'
import { authMiddleware } from '../../middleware/auth.ts'
import { requireRole } from '../../middleware/require-role.ts'
import { validateFields } from '../../middleware/validate-fields.ts'
import { UserType } from '../../store/enums.ts'

const clientRouter = Router()
const clientController = new ClientController()

// GET /api/client/profile
clientRouter.get(
	'/profile',
	[
		authMiddleware,
		requireRole(UserType.Client),
	],
	clientController.profileClient,
)

// PUT /api/client/profile
clientRouter.put(
	'/profile',
	[
		authMiddleware,
		requireRole(UserType.Client),

		body('name').isString().notEmpty().withMessage('name must be a non-empty string'),
		body('last_name').isString().notEmpty().withMessage('last_name must be a non-empty string'),
		body('gender').notEmpty().withMessage('gender must not be empty'),
		body('phone').notEmpty().withMessage('phone must not be empty'),
		body('email').isEmail().withMessage('email must be valid'),
		body('url_img').optional({ nullable: true }).isURL().withMessage('url_img must be a valid URL'),
		body('password').optional().isString().isLength({ min: 6 }).withMessage('password must be at least 6 characters long'),
		validateFields,
	],
	clientController.updateProfileClient,
)

export default clientRouter