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

export class UserEntity {

    constructor(
        public readonly idUser: number,
        public readonly email: string,
        public readonly password: string,
        public readonly gender: number,
        public readonly type: string,
        public readonly name: string,
        public readonly lastName: string,
        public readonly urlImg: string | null,
        public readonly phone: string,
        public readonly createdAt: Date,
    ){}

    
    public static fromObject( object: {[key: string]: any} ): UserEntity {
        const {
            idUser,
            email,
            password,
            gender,
            type,
            name,
            lastName,
            urlImg,
            phone,
            createdAt,
        } = object;

        if(
            idUser === undefined ||
            !email ||
            !password ||
            gender === undefined ||
            !type ||
            !name ||
            !lastName ||
            !phone ||
            !createdAt
        ){
            throw new Error('Invalid object to convert to UserEntity');
        }

        return new UserEntity(
            Number(idUser),
            String(email),
            String(password),
            Number(gender),
            String(type),
            String(name),
            String(lastName),
            urlImg === undefined ? null : (urlImg === null ? null : String(urlImg)),
            String(phone),
            createdAt instanceof Date ? createdAt : new Date(String(createdAt)),
        );
    }

}