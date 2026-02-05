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

import { StorageRepository } from '../../repositories/storage.repository';
import { UserEntity } from '../../entities';
import { UserRepository } from '../../repositories/user.repository';

export interface UploadUserAvatarInput {
	accessToken?: string;
	idUser: number;
	originalName: string;
	contentType: string;
	buffer: Buffer;
}

export class UploadUserAvatarUseCase {
	constructor(
		private readonly storageRepository: StorageRepository,
		private readonly userRepository: UserRepository,
	) {}

	async execute(input: UploadUserAvatarInput): Promise<{ user: UserEntity; path: string; publicUrl: string | null }> {
		const existing = await this.userRepository.findById(input.idUser);
		if (!existing) throw new Error('USER_NOT_FOUND');

		const safeName = input.originalName.replace(/[^a-zA-Z0-9._-]/g, '_');
		const objectPath = `users/${input.idUser}/${Date.now()}-${safeName}`;
		const uploadInput: any = {
			objectPath,
			buffer: input.buffer,
			contentType: input.contentType,
			upsert: false,
		};

		if (input.accessToken !== undefined) uploadInput.accessToken = input.accessToken;

		const uploaded = await this.storageRepository.upload(uploadInput);

		const urlToStore = uploaded.publicUrl ?? uploaded.path;
		const updated = await this.userRepository.update(input.idUser, { urlImg: urlToStore });

		return { user: updated, path: uploaded.path, publicUrl: uploaded.publicUrl };
	}
}
