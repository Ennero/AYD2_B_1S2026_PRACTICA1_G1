# HomeFinder Pro S.A.

Plataforma web para la gestión y publicación de bienes raíces y alquiler de propiedades.

**Curso**: Análisis y Diseño de Sistemas 2 — Sección B — 1S 2026  
**Práctica 1 — Grupo 1**

---

## Descripción

**HomeFinder Pro** permite la administración de usuarios (agentes y clientes), propiedades inmobiliarias y un sistema de búsqueda avanzado con filtros múltiples. Soporta tres roles: **Cliente**, **Agente Inmobiliario** y **Administrador**.

## Tecnologías

| Capa | Tecnologías |
|------|-------------|
| **Frontend** | React 19.2, Vite, Tailwind CSS, React Router DOM |
| **Backend** | Express.js 5.2, TypeScript, Prisma ORM 7.3 |
| **Base de Datos** | PostgreSQL 15.3 (Docker) |
| **Almacenamiento** | Supabase Storage (imágenes) |
| **Infraestructura** | Docker, Docker Compose |

## Estructura del Repositorio

```
├── client/          # Frontend React + Vite + Tailwind
├── server/          # Backend Express + TypeScript + Prisma
├── docs/            # Documentación técnica, diagramas, imágenes
│   ├── manual-tecnico.md
│   ├── cdu/         # Casos de uso (PDF)
│   ├── db/          # Modelos de BD (PDF)
│   ├── imgs/        # Imágenes y diagramas
│   └── sequence-diagrams/
└── README.md
```

## Patrones de Diseño Implementados

| Patrón | Ubicación | Uso |
|--------|-----------|-----|
| **Strategy** | Frontend (`strategies/`) | Filtrado, ordenamiento de propiedades y estados de citas |
| **State** | Frontend (`context/`) | Gestión de estados de citas del agente |
| **Command** | Frontend (`services/`) | Operaciones CRUD con historial y desacoplamiento |
| **Singleton** | Backend (`db/`, `store/`, `lib/`) | Conexión BD, variables de entorno, cliente Supabase |
| **Adapter** | Backend (`adapters/storage/`) | Abstracción del proveedor de almacenamiento de archivos |

## Inicio Rápido

### Requisitos

- **Node.js** v18+
- **Docker Desktop** (Windows/Mac) o Docker Engine + Docker Compose (Linux)

### 1. Clonar el Repositorio

```bash
git clone <url-del-repositorio>
cd AYD2_B_1S2026_PRACTICA1_G1
```

### 2. Configurar Variables de Entorno

Crear el archivo `server/.env` con las variables necesarias (ver [server/README.md](server/README.md) para detalle).

### 3. Levantar el Backend (Docker)

```bash
cd server
docker-compose up --build
```

Esto levanta PostgreSQL + Backend con migraciones y datos iniciales automáticamente.  
API disponible en: **http://localhost:3000**

### 4. Levantar el Frontend

```bash
cd client
npm install
npm run dev
```

Frontend disponible en: **http://localhost:5173**

## Usuarios de Prueba

| Rol | Correo | Contraseña |
|-----|--------|------------|
| Admin | admin@homefinder.com | Admin123! |
| Agente | maria.lopez@homefinder.com | Agent123! |
| Cliente | pedro.sanchez@gmail.com | Client123! |

## Documentación

- [Manual Técnico](docs/manual-tecnico.md)
- [README del Servidor](server/README.md)
- [README del Cliente](client/README.md)
- [Resumen de Datos Seed](server/src/db/SEED_DATA_SUMMARY.md)
