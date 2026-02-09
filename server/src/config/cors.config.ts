import { EnvVars } from '../store/enviroment.ts'
const corsOptions = {
    origin: EnvVars.instance.NODE_ENV === 'development'
        ? ['https://tu-dominio.com', 'https://www.tu-dominio.com'] // Dominios de producción
        : ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:5173'], // Desarrollo
    credentials: true, // ← IMPORTANTE: Para enviar cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    exposedHeaders: ['Set-Cookie']
}

export default corsOptions
