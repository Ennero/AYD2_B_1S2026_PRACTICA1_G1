import 'dotenv/config'
import { PrismaClient } from '../generated/prisma/client.ts'


declare global {
    var prisma: PrismaClient | undefined
}

const DB = global.prisma ?? new PrismaClient({} as any)

if (process.env.NODE_ENV === 'development') {
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