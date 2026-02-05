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
import { CreateUserDTO, UpdateUserDTO } from "../../domain";
import { CreateUserUseCase } from "../../domain/use-cases/user/create-user.usecase";
import { DeleteUserUseCase } from "../../domain/use-cases/user/delete-user.usecase";
import { GetUserByIdUseCase } from "../../domain/use-cases/user/get-user-by-id.usecase";
import { GetUsersUseCase } from "../../domain/use-cases/user/get-users.usecase";
import { UpdateUserUseCase } from "../../domain/use-cases/user/update-user.usecase";
import { UploadUserAvatarUseCase } from "../../domain/use-cases/user/upload-user-avatar.usecase";
import {
    respondWithBadRequest,
    respondWithConflict,
    respondWithCreated,
    respondWithInternalServerError,
    respondWithNotFound,
    respondWithSuccess,
} from "../shared/http/respond";

export class UserController {


    // Dependency injection
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly getUsersUseCase: GetUsersUseCase,
        private readonly getUserByIdUseCase: GetUserByIdUseCase,
        private readonly updateUserUseCase: UpdateUserUseCase,
        private readonly deleteUserUseCase: DeleteUserUseCase,
        private readonly uploadUserAvatarUseCase: UploadUserAvatarUseCase,
    ){}

    public create = async (request: Request, response: Response) => {
        const dto = (request as any).dto as CreateUserDTO | undefined;

        if (!dto) {
			return respondWithBadRequest(response, 'DTO no encontrado. Revisa el middleware.');
        }

        try {
            const user = await this.createUserUseCase.execute(dto);

			return respondWithCreated(response, {
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
				return respondWithConflict(response, 'El email ya está registrado');
            }

			return respondWithInternalServerError(response, 'Error al crear usuario');
        }
    }

    public getAll = async (_request: Request, response: Response) => {
        try {
            const users = await this.getUsersUseCase.execute();
			return respondWithSuccess(response, users.map((user) => ({
                idUser: user.idUser,
                email: user.email,
                gender: user.gender,
                type: user.type,
                name: user.name,
                lastName: user.lastName,
                urlImg: user.urlImg,
                phone: user.phone,
                createdAt: user.createdAt,
			})));
        } catch (_error) {
			return respondWithInternalServerError(response, 'Error al obtener usuarios');
        }
    }

    public getById = async (request: Request, response: Response) => {
        const idUser = Number(request.params.id);
		if (Number.isNaN(idUser)) return respondWithBadRequest(response, 'ID inválido');

        try {
            const user = await this.getUserByIdUseCase.execute(idUser);
			return respondWithSuccess(response, {
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
			if (message === 'USER_NOT_FOUND') return respondWithNotFound(response, 'Usuario no encontrado');
			return respondWithInternalServerError(response, 'Error al obtener usuario');
        }
    }

    public update = async (request: Request, response: Response) => {
        const idUser = Number(request.params.id);
		if (Number.isNaN(idUser)) return respondWithBadRequest(response, 'ID inválido');

        const dto = (request as any).dto as UpdateUserDTO | undefined;
		if (!dto) return respondWithBadRequest(response, 'DTO no encontrado. Revisa el middleware.');

        try {
            const user = await this.updateUserUseCase.execute(idUser, dto);
			return respondWithSuccess(response, {
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
			if (message === 'USER_NOT_FOUND') return respondWithNotFound(response, 'Usuario no encontrado');
			return respondWithInternalServerError(response, 'Error al actualizar usuario');
        }
    }

    public delete = async (request: Request, response: Response) => {
        const idUser = Number(request.params.id);
		if (Number.isNaN(idUser)) return respondWithBadRequest(response, 'ID inválido');

        try {
            await this.deleteUserUseCase.execute(idUser);
			return respondWithSuccess(response, { ok: true });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'UNKNOWN_ERROR';
			if (message === 'USER_NOT_FOUND') return respondWithNotFound(response, 'Usuario no encontrado');
			return respondWithInternalServerError(response, 'Error al eliminar usuario');
        }
    }

    public uploadAvatar = async (request: Request, response: Response) => {
        const idUser = Number(request.params.id);
		if (Number.isNaN(idUser)) return respondWithBadRequest(response, 'ID inválido');

        const file = (request as any).file as Express.Multer.File | undefined;
		if (!file) return respondWithBadRequest(response, 'Missing file');

        const authHeader = request.headers.authorization;
        const accessToken = authHeader?.startsWith('Bearer ') ? authHeader.slice('Bearer '.length) : undefined;

        try {
            const input: any = {
                idUser,
                originalName: file.originalname,
                contentType: file.mimetype,
                buffer: file.buffer,
            };

            if (accessToken !== undefined) input.accessToken = accessToken;

            const result = await this.uploadUserAvatarUseCase.execute(input);
			return respondWithCreated(response, {
                ok: true,
                path: result.path,
                publicUrl: result.publicUrl,
                user: {
                    idUser: result.user.idUser,
                    email: result.user.email,
                    gender: result.user.gender,
                    type: result.user.type,
                    name: result.user.name,
                    lastName: result.user.lastName,
                    urlImg: result.user.urlImg,
                    phone: result.user.phone,
                    createdAt: result.user.createdAt,
                }
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'UNKNOWN_ERROR';
			if (message === 'USER_NOT_FOUND') return respondWithNotFound(response, 'Usuario no encontrado');
			return respondWithInternalServerError(response, 'Error al subir avatar');
        }
    }

}