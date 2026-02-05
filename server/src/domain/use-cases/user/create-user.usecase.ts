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

import { CreateUserDTO } from "../../dtos";
import { UserEntity } from "../../entities";
import { UserRepository } from "../../repositories/user.repository";
import { PasswordHasherService } from "../../services/password-hasher.service";

export class CreateUserUseCase {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly passwordHasher: PasswordHasherService,
    ){}

    async execute(dto: CreateUserDTO): Promise<UserEntity> {
        const existing = await this.userRepository.findByEmail(dto.email);
        if (existing) {
            throw new Error('EMAIL_ALREADY_EXISTS');
        }

        const hashedPassword = await this.passwordHasher.hash(dto.password);

        return this.userRepository.create({
            email: dto.email,
            password: hashedPassword,
            gender: dto.gender,
            type: dto.type,
            name: dto.name,
            lastName: dto.lastName,
            phone: dto.phone,
            urlImg: dto.urlImg,
            createdAt: dto.createdAt,
        });
    }
}
