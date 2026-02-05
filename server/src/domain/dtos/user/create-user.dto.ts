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

export class CreateUserDTO {

    private constructor(
        public readonly email: string,
        public readonly password: string,
        public readonly gender: number,
        public readonly type: string,
        public readonly name: string,
        public readonly lastName: string,
        public readonly phone: string,
        public readonly urlImg: string | null,
        public readonly createdAt: Date,
    ){}

    static create( props: {[key: string]: any} ): [string | undefined, CreateUserDTO | undefined] {

        const {
            email,
            password,
            gender,
            type,
            name,
            lastName,
            phone,
            urlImg,
            createdAt,
        } = props;

        if( !email ) return ['Email es requerido', undefined];
        if( typeof email !== 'string' ) return ['Email inválido', undefined];

        if( !password ) return ['Password es requerida', undefined];
        if( typeof password !== 'string' ) return ['Password inválida', undefined];
        if( password.length < 6 ) return ['Password debe tener al menos 6 caracteres', undefined];

        if( gender === undefined || gender === null ) return ['Gender es requerido', undefined];
        const parsedGender = Number(gender);
        if( Number.isNaN(parsedGender) ) return ['Gender inválido', undefined];

        if( !type ) return ['Type es requerido', undefined];
        if( typeof type !== 'string' ) return ['Type inválido', undefined];

        if( !name ) return ['Name es requerido', undefined];
        if( typeof name !== 'string' ) return ['Name inválido', undefined];

        if( !lastName ) return ['Last name es requerido', undefined];
        if( typeof lastName !== 'string' ) return ['Last name inválido', undefined];

        if( !phone ) return ['Phone es requerido', undefined];
        if( typeof phone !== 'string' ) return ['Phone inválido', undefined];

        let parsedCreatedAt = new Date();
        if( createdAt ) {
            parsedCreatedAt = new Date(String(createdAt));
            if( Number.isNaN(parsedCreatedAt.getTime()) ) return ['createdAt inválido', undefined];
        }

        const dto = new CreateUserDTO(
            email.trim(),
            password,
            parsedGender,
            type.trim(),
            name.trim(),
            lastName.trim(),
            phone.trim(),
            urlImg === undefined || urlImg === null ? null : String(urlImg),
            parsedCreatedAt,
        );

        return [undefined, dto];
    }
}
