/*
MIT License

Copyright (c) 2026, all rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import { Router } from "express";
import { UserController } from "./controller";
import { UserDatasourceImpl } from "../../infrastructure/datasources/user.datasource.impl";
import { UserRepositoryImpl } from "../../infrastructure/repositories/user.repository.impl";
import { BcryptPasswordHasherService } from "../../infrastructure/services/bcrypt.password-hasher.service";
import { CreateUserUseCase } from "../../domain/use-cases/user/create-user.usecase";
import { validateCreateUserDTO } from "./middlewares/create-user.dto.middleware";
import { validateUpdateUserDTO } from "./middlewares/update-user.dto.middleware";
import multer from 'multer';
import { GetUsersUseCase } from "../../domain/use-cases/user/get-users.usecase";
import { GetUserByIdUseCase } from "../../domain/use-cases/user/get-user-by-id.usecase";
import { UpdateUserUseCase } from "../../domain/use-cases/user/update-user.usecase";
import { DeleteUserUseCase } from "../../domain/use-cases/user/delete-user.usecase";
import { UploadUserAvatarUseCase } from "../../domain/use-cases/user/upload-user-avatar.usecase";
import { SupabaseStorageDatasourceImpl } from "../../infrastructure/datasources/supabase.storage.datasource.impl";
import { StorageRepositoryImpl } from "../../infrastructure/repositories/storage.repository.impl";

export class UserRoutes {

    static get routes(): Router {

        const router = Router();
        const datasource = new UserDatasourceImpl();
        const repository = new UserRepositoryImpl(datasource);
        const passwordHasher = new BcryptPasswordHasherService();

        const createUserUseCase = new CreateUserUseCase(repository, passwordHasher);
        const getUsersUseCase = new GetUsersUseCase(repository);
        const getUserByIdUseCase = new GetUserByIdUseCase(repository);
        const updateUserUseCase = new UpdateUserUseCase(repository, passwordHasher);
        const deleteUserUseCase = new DeleteUserUseCase(repository);

        const storageDatasource = new SupabaseStorageDatasourceImpl();
        const storageRepository = new StorageRepositoryImpl(storageDatasource);
        const uploadUserAvatarUseCase = new UploadUserAvatarUseCase(storageRepository, repository);

        const routesController = new UserController(
            createUserUseCase,
            getUsersUseCase,
            getUserByIdUseCase,
            updateUserUseCase,
            deleteUserUseCase,
            uploadUserAvatarUseCase,
        );

        const upload = multer({
            storage: multer.memoryStorage(),
            limits: { fileSize: 25 * 1024 * 1024 },
        });

        router.post('/', validateCreateUserDTO, routesController.create);
        router.get('/', routesController.getAll);
        router.get('/:id', routesController.getById);
        router.put('/:id', validateUpdateUserDTO, routesController.update);
        router.delete('/:id', routesController.delete);

        // Avatar upload to Supabase Storage, updates urlImg
        router.post('/:id/avatar', upload.single('file'), routesController.uploadAvatar);


        return router;
    }
}