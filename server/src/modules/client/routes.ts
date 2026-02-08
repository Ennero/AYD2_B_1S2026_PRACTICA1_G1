import { Router } from 'express'
import { body } from 'express-validator'

import { ClientController } from './controller.ts'
import { authMiddleware } from '../../middleware/auth.ts'
import { requireRole } from '../../middleware/require-role.ts'
import { validateFields } from '../../middleware/validate-fields.ts'
import { UserType } from '../../store/enums.ts'

const clientRouter = Router()
const clientController = new ClientController()

// =============================== DAVID ===============================
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
		body('password').optional().isString().isLength({ min: 8 }).withMessage('password must be at least 8 characters long'),
		validateFields,
	],
	clientController.updateProfileClient,
)

// GET /api/client/properties/favorite
clientRouter.get(
	'/properties/favorite',
	[
		authMiddleware,
		requireRole(UserType.Client),
	],
	clientController.propertiesfavorite,
)

// DELETE /api/client/properties/favorite/?id
clientRouter.delete(
	'/properties/favorite',
	[
		authMiddleware,
		requireRole(UserType.Client),
	],
	clientController.deletepropertiesfavorites,
)

// GET /api/client/property/?id=31
clientRouter.get(
	'/property',
	[
		authMiddleware,
		requireRole(UserType.Client),
	],
	clientController.getpropertybyid,
)

// POST /api/client/property/favorite
clientRouter.post(
	'/property/favorite',
	[
		authMiddleware,
		requireRole(UserType.Client),
		body('id_property').isInt({ gt: 0 }).withMessage('id_property must be a positive integer'),
	],
	clientController.addpropertytofavorite,
)

// GET /api/client/appointment/all
clientRouter.get(
	'/appointment/all',
	[
		authMiddleware,
		requireRole(UserType.Client),
	],
	clientController.getallappointments,
)

// GET /api/client/appointment/finalized
clientRouter.get(
	'/appointment/finalized',
	[
		authMiddleware,
		requireRole(UserType.Client),
	],
	clientController.getfinalizedappointments,
)

// GET /api/client/appointment/pending
clientRouter.get(
	'/appointment/pending',
	[
		authMiddleware,
		requireRole(UserType.Client),
	],
	clientController.getpendingappointments,
)

// =============================== DAVID ===============================

export default clientRouter