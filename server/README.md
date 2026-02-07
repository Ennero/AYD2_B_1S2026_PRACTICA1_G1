# Server (API) - HomeFinder Pro

API RESTful desarrollada con **Node.js + Express + TypeScript + Prisma + PostgreSQL**.

## 📋 Requisitos

- **Node.js** (recomendado v18+)
- **Docker Desktop** (para Windows/Mac) o **Docker Engine + Docker Compose** (para Linux)

## 🚀 Inicio Rápido con Docker Compose

### 1. Configurar Variables de Entorno

Crea/edita el archivo `.env` en esta carpeta (`server/`):

```dotenv
PORT=3000
NODE_ENV=development

# Postgres (Docker)
POSTGRES_USER=postgres
POSTGRES_PASSWORD=123456
POSTGRES_DB=ptdb
POSTGRES_PORT=5433
DATABASE_URL=postgresql://postgres:123456@localhost:5433/ptdb

# Auth
JWT_SECRET=change-me-in-production

# Supabase (para almacenamiento de imágenes)
SUPABASE_URL=https://hrctwyfmjbsfpcxyfrpn.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_BUCKET_USERS=AYD2_B_1S2026_PRACTICA1_G1/users
```

### 2. Levantar Todo el Sistema

Ejecuta un solo comando para levantar PostgreSQL, ejecutar migraciones, poblar la base de datos y arrancar el servidor:

```bash
docker-compose up --build
```

Esto hará automáticamente:
✅ Crear y levantar el contenedor de PostgreSQL  
✅ Crear y levantar el contenedor del backend  
✅ Ejecutar las migraciones de Prisma  
✅ Poblar la base de datos con datos iniciales (seed)  
✅ Iniciar el servidor en modo desarrollo  

El servidor estará disponible en: **http://localhost:3000**

### 3. Detener los Servicios

```bash
docker-compose down
```

Para reiniciar limpio (borra TODOS los datos):

```bash
docker-compose down -v
docker-compose up --build
```

## 🛠️ Desarrollo Local (sin Docker para el backend)

Si prefieres ejecutar el backend fuera de Docker (solo PostgreSQL en Docker):

### 1. Levantar solo PostgreSQL

```bash
docker-compose up postgres-db -d
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Ejecutar Migraciones y Seed

```bash
npm run db:setup
```

O paso por paso:

```bash
npx prisma generate      # Genera el cliente de Prisma
npx prisma migrate dev   # Ejecuta migraciones
npm run db:seed          # Pobla la base de datos
```

### 4. Ejecutar en Desarrollo

```bash
npm run dev
```

## 📦 Prisma - ORM del Proyecto

### ¿Qué es Prisma?

**Prisma** es un ORM (Object-Relational Mapping) moderno para Node.js y TypeScript que simplifica el trabajo con bases de datos. En este proyecto, Prisma se utiliza para:

#### 1. **Definición del Schema de Base de Datos**
En lugar de escribir SQL manualmente, defines tu modelo de datos en [`prisma/schema.prisma`](./prisma/schema.prisma):

```prisma
model USER {
  id_user    Int       @id @default(autoincrement())
  email      String    @unique @db.VarChar(30)
  password   String    @db.VarChar(255)
  name       String    @db.VarChar(30)
  // ... más campos
}

model property {
  id_property   Int      @id @default(autoincrement())
  title         String   @db.VarChar(50)
  price         Decimal  @db.Decimal(10, 2)
  // ... más campos
}
```

#### 2. **Migraciones de Base de Datos**
Prisma genera automáticamente scripts SQL para crear/actualizar tablas:

```bash
npx prisma migrate dev --name nombre_migracion
```

Esto crea archivos en `prisma/migrations/` que versionan los cambios del schema.

#### 3. **Cliente Type-Safe**
Genera un cliente TypeScript completamente tipado:

```typescript
import DB from './db/db.ts'

// Consultas con autocompletado y validación de tipos
const users = await DB.uSER.findMany({
  where: { type: 'CLIENT' },
  include: { favorite: true }
})
```

#### 4. **Operaciones CRUD Simplificadas**

```typescript
// Crear
const newUser = await DB.uSER.create({
  data: { email: 'test@example.com', name: 'Test' }
})

// Leer
const user = await DB.uSER.findUnique({ where: { id_user: 1 } })

// Actualizar
await DB.uSER.update({
  where: { id_user: 1 },
  data: { name: 'Updated Name' }
})

// Eliminar
await DB.uSER.delete({ where: { id_user: 1 } })
```

### Comandos Útiles de Prisma

```bash
# Generar cliente de Prisma
npx prisma generate

# Crear nueva migración
npx prisma migrate dev --name nombre_descriptivo

# Aplicar migraciones en producción
npx prisma migrate deploy

# Abrir Prisma Studio (GUI para ver datos)
npx prisma studio

# Resetear base de datos (¡CUIDADO! Borra todo)
npx prisma migrate reset
```

## 🗄️ Datos Iniciales (Seed)

El proyecto incluye una seed que genera:
- **1 Administrador**: `admin@homefinder.com` / `Admin123!`
- **6 Agentes inmobiliarios**: correos `@homefinder.com` / `Agent123!`
- **20 Clientes**: correos `@gmail.com` / `Client123!`
- **37 Propiedades** (casas, apartamentos, terrenos, locales)
- **30+ Favoritos** y **80+ Registros de visitas**
- **40+ Invitaciones** con diferentes estados

Ver más detalles en [SEED_DATA_SUMMARY.md](./SEED_DATA_SUMMARY.md)

## 🔌 Endpoints de la API

### Autenticación

- `POST /api/auth/register` - Registrar nuevo usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/me` - Obtener perfil (requiere token)

Ejemplo de registro:

```json
{
  "email": "test@example.com",
  "password": "123456",
  "name": "Test",
  "last_name": "User",
  "phone": "123456789",
  "gender": 1,
  "type": "CLIENT"
}
```

## 🐳 Arquitectura de Contenedores

El `docker-compose.yml` define dos servicios:

```yaml
services:
  postgres-db:    # Base de datos PostgreSQL
  backend:        # API Node.js con auto-migración y seed
```

### Flujo de Inicio del Backend:
1. **Espera** a que PostgreSQL esté listo (healthcheck)
2. **Ejecuta** migraciones de Prisma (`prisma migrate deploy`)
3. **Ejecuta** seed si la BD está vacía
4. **Inicia** el servidor Express en modo watch

## 📚 Scripts Disponibles

```bash
npm run dev           # Desarrollo con hot-reload (tsx watch)
npm run build         # Compilar TypeScript a JavaScript
npm run start         # Producción (ejecuta dist/index.js)

npm run db:generate   # Generar cliente de Prisma
npm run db:migrate    # Ejecutar migraciones en desarrollo
npm run db:seed       # Ejecutar seed manualmente
npm run db:setup      # Generate + Migrate + Seed (todo en uno)
```

## 🔍 Herramientas de Depuración

### Prisma Studio
Interfaz gráfica para explorar/editar datos:

```bash
npx prisma studio
```

Accede en: http://localhost:5555

### Logs de Docker

```bash
# Ver logs en tiempo real
docker-compose logs -f backend

# Ver logs de PostgreSQL
docker-compose logs -f postgres-db
```

### Conectar a PostgreSQL con Cliente

```bash
docker exec -it homefinder-postgres psql -U postgres -d ptdb
```

O usa **DBeaver**:
- Host: `localhost`
- Puerto: `5433`
- Usuario: `postgres`
- Contraseña: `123456`
- Base de datos: `ptdb`

## 🚨 Problemas Comunes

### "Docker no está corriendo"
**Solución**: Inicia Docker Desktop antes de ejecutar `docker-compose up`.

### "Port 5433 already in use"
**Solución**: Ya tienes PostgreSQL corriendo localmente. Detén el servicio o cambia `POSTGRES_PORT` en `.env`.

### "Cannot find module '@prisma/adapter-pg'"
**Solución**: 
```bash
npm install
npx prisma generate
```

### "The table public.USER does not exist"
**Solución**: Faltan migraciones. Ejecuta:
```bash
npx prisma migrate dev
```

### "numeric field overflow" en propiedades
**Solución**: El campo `price` ya está configurado como `DECIMAL(10,2)` en la migración inicial. Si ves este error, asegúrate de que las migraciones estén aplicadas correctamente.

### "Seed already populated"
**Solución**: Normal. La seed tiene protección para no duplicar datos. Si necesitas resetear:
```bash
npx prisma migrate reset
npm run db:seed
```

### "Connection refused" al conectar con PostgreSQL
**Solución**: 
1. Verifica que el contenedor esté corriendo: `docker ps`
2. Espera unos segundos, PostgreSQL tarda en inicializar
3. Revisa los logs: `docker-compose logs postgres-db`

### Cambios en schema.prisma no se reflejan
**Solución**:
```bash
npx prisma migrate dev --name nombre_del_cambio
npx prisma generate
```

## 📖 Recursos Adicionales

- [Documentación de Prisma](https://www.prisma.io/docs)
- [Express.js Guide](https://expressjs.com/)
- [Docker Compose Reference](https://docs.docker.com/compose/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## 👥 Equipo de Desarrollo

HomeFinder Pro S.A. - Práctica 1 - Grupo 1  
Análisis y Diseño de Sistemas 2 - Sección B - 1S 2026

---

**¿Listo para empezar?** 🚀

```bash
docker-compose up --build
```
