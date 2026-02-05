
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

import { prisma } from '../../config/postgres';
import { CreateUserRepositoryInput, UpdateUserRepositoryInput, UserDatasource, UserEntity } from '../../domain';

export class UserDatasourceImpl implements UserDatasource {

    async create(data: CreateUserRepositoryInput): Promise<UserEntity> {
        const user = await prisma.user.create({
            data: {
                email: data.email,
                password: data.password,
                gender: data.gender,
                type: data.type,
                name: data.name,
                lastName: data.lastName,
                urlImg: data.urlImg,
                phone: data.phone,
                createdAt: data.createdAt,
            },
        });

        return UserEntity.fromObject(user);
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        const user = await prisma.user.findFirst({
            where: { email },
        });

        return user ? UserEntity.fromObject(user) : null;
    }

    async findById(idUser: number): Promise<UserEntity | null> {
        const user = await prisma.user.findFirst({
            where: { idUser },
        });

        return user ? UserEntity.fromObject(user) : null;
    }

    async findAll(): Promise<UserEntity[]> {
        const users = await prisma.user.findMany({
            orderBy: { idUser: 'asc' },
        });

        return users.map(UserEntity.fromObject);
    }

    async update(idUser: number, data: UpdateUserRepositoryInput): Promise<UserEntity> {
		const updateData: any = {};
		if (data.email !== undefined) updateData.email = data.email;
		if (data.password !== undefined) updateData.password = data.password;
		if (data.gender !== undefined) updateData.gender = data.gender;
		if (data.type !== undefined) updateData.type = data.type;
		if (data.name !== undefined) updateData.name = data.name;
		if (data.lastName !== undefined) updateData.lastName = data.lastName;
		if (data.phone !== undefined) updateData.phone = data.phone;
		if (data.urlImg !== undefined) updateData.urlImg = data.urlImg;

        const user = await prisma.user.update({
            where: { idUser },
			data: updateData,
        });

        return UserEntity.fromObject(user);
    }

    async delete(idUser: number): Promise<void> {
        await prisma.user.delete({
            where: { idUser },
        });
    }

}