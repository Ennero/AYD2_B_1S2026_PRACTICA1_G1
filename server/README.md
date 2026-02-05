# Server (API) – HomeFinder Pro

Guía rápida para ejecutar el proyecto desde cero (PostgreSQL + Prisma + Node.js).

## Requisitos

- Node.js + npm
- Docker + Docker Compose

## 1) Instalar dependencias

```bash
npm install
```

## 2) Configurar variables de entorno

Crea un archivo `.env` en esta carpeta (server) usando como base `.env.example`:

```bash
cp .env.example .env
```

> Importante: el `docker-compose.yml` expone Postgres en `localhost:5433`.

## 3) Levantar PostgreSQL con Docker

```bash
docker compose --env-file .env up -d
```

Si quieres empezar totalmente limpio, detén Docker y borra los datos locales:

```bash
docker compose down
rm -rf postgres
```

## 4) Crear la estructura de BD con Prisma

Para una primera ejecución (recomendado):

```bash
npm run prisma:reset
```

Esto crea las tablas y regenera el cliente.

> Nota: `prisma:reset` borra datos (DROP/RESET). Úsalo solo si estás iniciando desde cero.

## 5) Ejecutar el servidor

Modo desarrollo:

```bash
npm run dev
```

El modo `dev` usa `tsx` (mejor compatibilidad ESM con Prisma). Si fuerzas `ts-node-dev`, usa `npm run dev:tsnd`.

Build + ejecución:

```bash
npm start
```

## Comandos útiles

- Generar Prisma Client: `npm run prisma:generate`
- Aplicar migraciones (dev): `npm run prisma:migrate`
- Prisma Studio: `npm run prisma:studio`
