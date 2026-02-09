import { PrismaClient } from '../generated/prisma/client.ts'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'
import { EnvVars } from '../store/enviroment.ts'

declare global {
    var prisma: PrismaClient | undefined
}

export class DB_Connection {
    static #instance: DB_Connection
    readonly DB: PrismaClient

    private constructor() {
        const pool = new pg.Pool({ connectionString: EnvVars.instance.DATABASE_URL })
        const adapter = new PrismaPg(pool)
        this.DB = global.prisma ?? new PrismaClient({ adapter })
        if (EnvVars.instance.NODE_ENV === 'development') {
            global.prisma = this.DB
        }
    }

    public static get instance(): DB_Connection {
        if (!DB_Connection.#instance) {
            DB_Connection.#instance = new DB_Connection()
        }
        return DB_Connection.#instance;
    }

    async connectDB(): Promise<void> {
        try {
            await this.DB.$connect()
            console.log('Database connected successfully')
        } catch (error) {
            console.error('Error connecting to the database:', error)
            throw error
        }
    }



}


// const pool = new pg.Pool({ connectionString: EnvVars.instance.DATABASE_URL })
// const adapter = new PrismaPg(pool)

// declare global {
//     var prisma: PrismaClient | undefined
// }

// const DB = global.prisma ?? new PrismaClient({ adapter })

// if (EnvVars.instance.NODE_ENV === 'development') {
//     global.prisma = DB
// }

// export const connectDB = async (): Promise<void> => {
//     try {
//         await DB.$connect()
//         console.log('Database connected successfully')
//     } catch (error) {
//         console.error('Error connecting to the database:', error)
//         throw error
//     }
// }

export default DB_Connection.instance.DB