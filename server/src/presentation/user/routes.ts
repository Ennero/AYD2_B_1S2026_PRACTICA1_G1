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

export class UserRoutes {

    static get routes(): Router {

        const router = Router();
        const datasource = new UserDatasourceImpl();
        const repository = new UserRepositoryImpl(datasource);
        const passwordHasher = new BcryptPasswordHasherService();
        const createUserUseCase = new CreateUserUseCase(repository, passwordHasher);
        const routesController = new UserController(createUserUseCase);

        router.post('/user', validateCreateUserDTO, routesController.create);
        router.get('/user', routesController.getAll);
        router.get('/user/:id', routesController.getById);
        router.put('/user/:id', routesController.update);
        router.delete('/user/:id', routesController.delete);


        return router;
    }
}