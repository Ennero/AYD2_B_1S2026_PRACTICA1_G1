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

import { UpdateUserDTO } from '../../dtos';
import { UserEntity } from '../../entities';
import { UserRepository } from '../../repositories/user.repository';
import { PasswordHasherService } from '../../services/password-hasher.service';

export class UpdateUserUseCase {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly passwordHasher: PasswordHasherService,
	) {}

	async execute(idUser: number, dto: UpdateUserDTO): Promise<UserEntity> {
		const existing = await this.userRepository.findById(idUser);
		if (!existing) throw new Error('USER_NOT_FOUND');

		const hashedPassword = dto.password ? await this.passwordHasher.hash(dto.password) : undefined;
		const updateData: { [key: string]: any } = {};

		if (dto.email !== undefined) updateData.email = dto.email;
		if (hashedPassword !== undefined) updateData.password = hashedPassword;
		if (dto.gender !== undefined) updateData.gender = dto.gender;
		if (dto.type !== undefined) updateData.type = dto.type;
		if (dto.name !== undefined) updateData.name = dto.name;
		if (dto.lastName !== undefined) updateData.lastName = dto.lastName;
		if (dto.phone !== undefined) updateData.phone = dto.phone;
		if (dto.urlImg !== undefined) updateData.urlImg = dto.urlImg;

		return this.userRepository.update(idUser, updateData);
	}
}
