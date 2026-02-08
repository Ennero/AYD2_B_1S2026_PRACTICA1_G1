import { PrismaClient } from '../generated/prisma/client.ts'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'
import { EnvVars } from '../store/enviroment.ts'

// TODO Falta aplicar patron singlenton (mañana lo hago xd)

const pool = new pg.Pool({ connectionString: EnvVars.instance.DATABASE_URL })
const adapter = new PrismaPg(pool)

declare global {
    var prisma: PrismaClient | undefined
}

const DB = global.prisma ?? new PrismaClient({ adapter })

if (EnvVars.instance.NODE_ENV === 'development') {
    global.prisma = DB
}

export const connectDB = async (): Promise<void> => {
    try {
        await DB.$connect()
        console.log('Database connected successfully')
    } catch (error) {
        console.error('Error connecting to the database:', error)
        throw error
    }
}

export default DB