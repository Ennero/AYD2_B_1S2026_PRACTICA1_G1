# Server (API)

API en Node.js + Express + TypeScript + Prisma + Postgres (Docker).

## Requisitos

- Node.js (recomendado 18+)
- Docker + Docker Compose

## Variables de entorno

Crea/edita el archivo `.env` en esta carpeta (`server/`). Ejemplo mínimo:

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

# Supabase
SUPABASE_URL=https://TU_PROYECTO.supabase.co
SUPABASE_ANON_KEY=TU_ANON_KEY
# Recomendado en backend para evitar RLS:
# SUPABASE_SERVICE_ROLE_KEY=TU_SERVICE_ROLE_KEY

# Bucket para imágenes de usuario
SUPABASE_BUCKET_USERS=AYD2_B_1S2026_PRACTICA1_G1
```

Notas:
- Si vas a subir imágenes a Supabase Storage desde el backend, lo más simple es usar `SUPABASE_SERVICE_ROLE_KEY`.
- Si solo usas `SUPABASE_ANON_KEY`, tenés que configurar policies (RLS) en Supabase para permitir `insert/update` en `storage.objects`.

## Levantar Postgres (Docker)

```bash
docker compose up -d
```

Para reiniciar limpio (borra datos):

```bash
docker compose down -v
```

## Instalar dependencias

```bash
npm install
```

## Prisma (migraciones + client)

> Importante: este proyecto usa **Prisma Migrate** para crear el schema.

```bash
npx prisma migrate dev
npx prisma generate
```

## Ejecutar en desarrollo

```bash
npm run dev
```

Servidor en:
- `http://localhost:3000`

## Endpoints de Auth (prueba rápida)

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me` (requiere `Authorization: Bearer <token>`)

Ejemplo body para register (incluye subida de imagen a Supabase en base64):

```json
{
  "email": "test_supabase_1@example.com",
  "password": "123456",
  "name": "Test",
  "last_name": "User",
  "phone": "123456789",
  "gender": 1,
  "img_mime": "image/png",
  "img_base64": "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII="
}
```

## Problemas comunes

- **"The table public.USER does not exist"**: faltan migraciones → corre `npx prisma migrate dev`.
- **"new row violates row-level security policy"** (Supabase): usa `SUPABASE_SERVICE_ROLE_KEY` o crea policies para `storage.objects`.
- **"Bucket not found"** al abrir la URL: el bucket no es público o el nombre no coincide. Verifica `SUPABASE_BUCKET_USERS` y la configuración del bucket en Supabase.
