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

import { Request, Response } from "express";
import { CreateUserDTO } from "../../domain";
import { CreateUserUseCase } from "../../domain/use-cases/user/create-user.usecase";

export class UserController {


    // Dependency injection
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
    ){}

    public create = async (request: Request, response: Response) => {
        const dto = (request as any).dto as CreateUserDTO | undefined;

        if (!dto) {
            return response.status(400).json({ error: 'DTO no encontrado. Revisa el middleware.' });
        }

        try {
            const user = await this.createUserUseCase.execute(dto);

            return response.status(201).json({
                idUser: user.idUser,
                email: user.email,
                gender: user.gender,
                type: user.type,
                name: user.name,
                lastName: user.lastName,
                urlImg: user.urlImg,
                phone: user.phone,
                createdAt: user.createdAt,
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'UNKNOWN_ERROR';

            if (message === 'EMAIL_ALREADY_EXISTS') {
                return response.status(409).json({ error: 'El email ya está registrado' });
            }

            return response.status(500).json({ error: 'Error al crear usuario' });
        }
    }

    getAll(request: Request, response: Response){
        response.json({ message: "UserController GET ALL endpoint" });
    }

    getById(request: Request, response: Response){
        response.json({ message: "UserController GET BY ID endpoint" });
    }

    update(request: Request, response: Response){
        response.json({ message: "UserController UPDATE endpoint" });
    }

    delete(request: Request, response: Response){
        response.json({ message: "UserController DELETE endpoint" });
    }

}