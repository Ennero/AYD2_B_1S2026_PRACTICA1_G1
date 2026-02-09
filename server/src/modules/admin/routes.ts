import { Router } from 'express'
import { body } from 'express-validator'

import { AdminController } from './controller.ts'
import { authMiddleware } from '../../middleware/auth.ts'
import { requireRole } from '../../middleware/require-role.ts'
import { validateFields } from '../../middleware/validate-fields.ts'
import { base64ImageValidator, imageMimeValidator } from '../../middleware/validators/image.validators.ts'
import { UserType } from '../../store/enums.ts'

const adminRouter = Router()
const adminController = new AdminController()

// POST /api/admin/agents
adminRouter.post(
    '/agents',
    [
        authMiddleware,
        requireRole(UserType.Admin),

        body('id_user').optional().isInt({ min: 1 }).withMessage('id_user must be a positive integer'),
        body('email').isEmail().withMessage('email must be valid'),
        body('name').isString().notEmpty().withMessage('name is required'),
        body('last_name').isString().notEmpty().withMessage('last_name is required'),
        body('phone').notEmpty().withMessage('phone is required'),

        // La URL pública la genera el backend
        base64ImageValidator('img_base64'),
        imageMimeValidator('img_mime'),

        body('type').optional().isString(),
        validateFields,
    ],
    adminController.createAgent,
)

// PUT /api/admin/agents/:id
adminRouter.put(
    '/agents/:id',
    [
        authMiddleware,
        requireRole(UserType.Admin),

        body('id_user').optional().isInt({ min: 1 }).withMessage('id_user must be a positive integer'),
        body('email').optional().isEmail().withMessage('email must be valid'),
        body('name').optional().isString().notEmpty().withMessage('name must be a non-empty string'),
        body('last_name').optional().isString().notEmpty().withMessage('last_name must be a non-empty string'),
        body('phone').optional().notEmpty().withMessage('phone must not be empty'),

        base64ImageValidator('img_base64'),
        imageMimeValidator('img_mime'),

        body('type').optional().isString(),
        validateFields,
    ],
    adminController.updateAgent,
)

//hekado
// GET /api/admin/agents
adminRouter.get(
	'/agents',
	[
		authMiddleware,
		requireRole(UserType.Admin),
	],
	adminController.getAgents,
)

// GET /api/admin/agents/:id
adminRouter.get(
	'/agents/:id',
	[
		authMiddleware,
		requireRole(UserType.Admin),
	],
	adminController.getAgentById,
)

// DELETE /api/admin/agents/:id
adminRouter.delete(
	'/agents/:id',
	[
		authMiddleware,
		requireRole(UserType.Admin),
	],
	adminController.deleteAgent,
)
//fin helado
export default adminRouter