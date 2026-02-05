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

export class UpdateUserDTO {
	private constructor(
		public readonly email?: string,
		public readonly password?: string,
		public readonly gender?: number,
		public readonly type?: string,
		public readonly name?: string,
		public readonly lastName?: string,
		public readonly phone?: string,
		public readonly urlImg?: string | null,
	) {}

	static create(props: { [key: string]: any }): [string | undefined, UpdateUserDTO | undefined] {
		const { email, password, gender, type, name, lastName, phone, urlImg } = props;

		let parsedGender: number | undefined = undefined;
		if (gender !== undefined) {
			parsedGender = Number(gender);
			if (Number.isNaN(parsedGender)) return ['Gender inválido', undefined];
		}

		if (email !== undefined && typeof email !== 'string') return ['Email inválido', undefined];
		if (password !== undefined && typeof password !== 'string') return ['Password inválida', undefined];
		if (password !== undefined && password.length < 6) return ['Password debe tener al menos 6 caracteres', undefined];
		if (type !== undefined && typeof type !== 'string') return ['Type inválido', undefined];
		if (name !== undefined && typeof name !== 'string') return ['Name inválido', undefined];
		if (lastName !== undefined && typeof lastName !== 'string') return ['Last name inválido', undefined];
		if (phone !== undefined && typeof phone !== 'string') return ['Phone inválido', undefined];
		if (urlImg !== undefined && urlImg !== null && typeof urlImg !== 'string') return ['urlImg inválido', undefined];

		const dto = new UpdateUserDTO(
			email === undefined ? undefined : email.trim(),
			password,
			parsedGender,
			type === undefined ? undefined : type.trim(),
			name === undefined ? undefined : name.trim(),
			lastName === undefined ? undefined : lastName.trim(),
			phone === undefined ? undefined : phone.trim(),
			urlImg === undefined ? undefined : (urlImg === null ? null : String(urlImg)),
		);

		return [undefined, dto];
	}
}
