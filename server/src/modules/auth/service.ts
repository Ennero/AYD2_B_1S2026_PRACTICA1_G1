import DB from '../../db/db.ts'
import { UserType } from '../../store/enums.ts'

export async function createUserFromDB() {
    await DB.uSER.create({
        data: {
            email: "soyemilio@gmail.com",
            password: "123",
            gender: 1,
            type: UserType.Client,
            name: "emilio",
            last_name: "morales",
            url_img: null,
            phone: "123123123",
            created_at: new Date()
        }
    })
    // Crea un usuario xd
    // Necesita correciones el metodo, nomas es para ver como funciona
}