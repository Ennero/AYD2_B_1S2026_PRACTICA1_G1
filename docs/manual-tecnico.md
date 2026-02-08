# Manual Técnico - HomeFinder Pro S.A.

## Índice

- [Manual Técnico - HomeFinder Pro S.A.](#manual-técnico---homefinder-pro-sa)
  - [Índice](#índice)
  - [1. Introducción](#1-introducción)
    - [1.1 Propósito](#11-propósito)
    - [1.2 Alcance](#12-alcance)
    - [1.3 Descripción General del Sistema](#13-descripción-general-del-sistema)
    - [1.4 Alcances Funcionales](#14-alcances-funcionales)
    - [1.5 Stakeholders](#15-stakeholders)
    - [1.6 Usuarios del Sistema](#16-usuarios-del-sistema)
    - [1.7 Arquitectura del Sistema](#17-arquitectura-del-sistema)
      - [1.7.1 Arquitectura Clean (Limpia)](#171-arquitectura-clean-limpia)
      - [1.7.2 Arquitectura de Tres Capas](#172-arquitectura-de-tres-capas)
    - [1.8 Componentes del Sistema](#18-componentes-del-sistema)
      - [1.8.1 Frontend (React + Vite)](#181-frontend-react--vite)
      - [1.8.2 Backend (Express.js + TypeScript)](#182-backend-expressjs--typescript)
      - [1.8.3 Base de Datos (PostgreSQL + Prisma)](#183-base-de-datos-postgresql--prisma)
      - [1.8.4 Infraestructura (Docker)](#184-infraestructura-docker)
    - [1.9 Patrones de Diseño Implementados](#19-patrones-de-diseño-implementados)
      - [1.9.1 Patrones en el Frontend](#191-patrones-en-el-frontend)
      - [1.9.2 Patrones en el Backend](#192-patrones-en-el-backend)
    - [1.10 Tecnologías y Justificación](#110-tecnologías-y-justificación)
    - [1.11 Estructura del Proyecto](#111-estructura-del-proyecto)
      - [1.11.1 Estructura del Frontend](#1111-estructura-del-frontend)
      - [1.11.2 Estructura del Backend](#1112-estructura-del-backend)
    - [1.12 Base de Datos](#112-base-de-datos)
      - [1.12.1 Modelo Relacional](#1121-modelo-relacional)
      - [1.12.2 Descripción de Tablas](#1122-descripción-de-tablas)
    - [1.13 APIs y Servicios REST](#113-apis-y-servicios-rest)
    - [1.14 Seguridad](#114-seguridad)
    - [1.15 Despliegue](#115-despliegue)
  - [2. Diagramas de Casos de Uso](#2-diagramas-de-casos-de-uso)
    - [2.1 Actores del Sistema](#21-actores-del-sistema)
    - [2.2 Diagrama de Casos de Uso de Alto Nivel (High-Level)](#22-diagrama-de-casos-de-uso-de-alto-nivel-high-level)
    - [2.3 Descomposición de Casos de Uso](#23-descomposición-de-casos-de-uso)
    - [2.4 Especificación Detallada de Casos de Uso](#24-especificación-detallada-de-casos-de-uso)
      - [2.4.1 CDU001 - Gestión de Propiedades Inmobiliarias](#241-cdu001---gestión-de-propiedades-inmobiliarias)
      - [2.4.2 CDU002 - Solicitud y Negociación de Citas](#242-cdu002---solicitud-y-negociación-de-citas)
      - [2.4.3 CDU003 - Gestión de Usuarios/Agentes](#243-cdu003---gestión-de-usuariosagentes)
      - [2.4.4 CDU004 - Gestión de Perfil y Búsqueda](#244-cdu004---gestión-de-perfil-y-búsqueda)
      - [2.4.5 CDU005 - Autenticación y Autorización](#245-cdu005---autenticación-y-autorización)
  - [3. Requerimientos del Sistema](#3-requerimientos-del-sistema)
    - [3.1 Requerimientos Funcionales](#31-requerimientos-funcionales)
    - [3.2 Requerimientos No Funcionales](#32-requerimientos-no-funcionales)
  - [4. Matrices de Trazabilidad](#4-matrices-de-trazabilidad)
    - [4.1 Matriz de Trazabilidad de Casos de Uso](#41-matriz-de-trazabilidad-de-casos-de-uso)
    - [4.2 Matriz de Trazabilidad de Requerimientos Funcionales](#42-matriz-de-trazabilidad-de-requerimientos-funcionales)
    - [4.3 Matriz de Trazabilidad de Requerimientos No Funcionales](#43-matriz-de-trazabilidad-de-requerimientos-no-funcionales)
  - [5. Diagramas de Secuencia](#5-diagramas-de-secuencia)
    - [5.1 Descripción General](#51-descripción-general)
    - [5.2 Diagramas Disponibles](#52-diagramas-disponibles)
      - [5.2.1 Publicación de Propiedad](#521-publicación-de-propiedad)
      - [5.2.2 Negociación de Cita](#522-negociación-de-cita)
    - [5.3 Convenciones Utilizadas](#53-convenciones-utilizadas)
    - [5.4 Relación con Casos de Uso](#54-relación-con-casos-de-uso)

---

## 1. Introducción

### 1.1 Propósito

El presente manual técnico tiene como propósito documentar de forma detallada la arquitectura, diseño, implementación y despliegue del sistema **HomeFinder Pro S.A.**, una plataforma digital para la gestión y publicación de inmuebles. Este documento está dirigido a desarrolladores, arquitectos de software y personal técnico involucrado en el mantenimiento, extensión o auditoría del sistema.

### 1.2 Alcance

Este manual técnico cubre los siguientes aspectos del sistema HomeFinder Pro:

- **Arquitectura del sistema**: Descripción de la arquitectura Clean, capas y comunicación entre componentes
- **Framework y tecnologías**: Justificación de las tecnologías seleccionadas (React, Express, PostgreSQL, Docker)
- **Patrones de diseño**: Implementación y uso de patrones como Strategy, Adapter, Singleton, Container/Presentational, entre otros
- **Estructura del proyecto**: Organización de directorios y archivos tanto en frontend como backend
- **Base de datos**: Modelo de datos, esquemas Prisma y relaciones entre entidades
- **APIs y servicios**: Especificación de endpoints REST
- **Seguridad**: Mecanismos de autenticación JWT, hashing con bcrypt y protección de rutas
- **Despliegue**: Dockerización del backend y base de datos con Docker Compose

### 1.3 Descripción General del Sistema

**HomeFinder Pro** es una plataforma digital integral diseñada para la gestión y publicación de inmuebles en el mercado de bienes raíces y alquiler de propiedades. El sistema permite la administración completa de usuarios (agentes y clientes), propiedades, planes de publicación y un sistema de búsqueda avanzado.

La plataforma está construida como una aplicación web moderna de tres capas, compuesta por:

1. **Frontend (Cliente)**: Interfaz de usuario desarrollada en React + Vite + Tailwind CSS que proporciona experiencias interactivas para clientes, agentes y administradores
2. **Backend (Servidor)**: API RESTful desarrollada con Express.js y TypeScript, siguiendo arquitectura Clean con módulos independientes
3. **Base de Datos**: PostgreSQL 15.3 dockerizada, con Prisma ORM para la gestión del esquema y migraciones

El sistema implementa un modelo de roles y permisos que permite diferentes niveles de acceso y funcionalidades específicas según el tipo de usuario (Cliente, Agente, Administrador).

### 1.4 Alcances Funcionales

El sistema HomeFinder Pro cubre las siguientes funcionalidades:

| Módulo | Funcionalidades |
|--------|----------------|
| **Autenticación** | Registro de clientes, inicio de sesión, JWT para todas las sesiones |
| **Gestión de Propiedades** | CRUD completo de inmuebles, carga de fotografías, categorización por tipo |
| **Búsqueda Avanzada** | Filtrado por tipo, precio, zona, habitaciones, baños, área; ordenamiento múltiple |
| **Citas** | Solicitud, propuesta de horarios, aceptación/rechazo con justificación |
| **Favoritos** | Guardado y gestión de propiedades favoritas por parte del cliente |
| **Dashboard del Agente** | Estadísticas Top 3 tipos de inmuebles más buscados, Top 5 zonas |
| **Gestión de Agentes** | CRUD de agentes por parte del administrador |
| **Perfiles** | Actualización de datos personales y fotografía de perfil |

### 1.5 Stakeholders

| Stakeholder | Rol | Interés en el Sistema |
|-------------|-----|----------------------|
| **HomeFinder Pro S.A.** | Empresa propietaria | Disponer de una plataforma digital que permita la gestión y publicación de inmuebles para expandir su presencia en el mercado inmobiliario |
| **Clientes** | Usuarios finales (compradores/arrendatarios) | Buscar, filtrar y contactar agentes para evaluar propiedades de forma ágil y segura |
| **Agentes Inmobiliarios** | Profesionales inmobiliarios | Publicar y administrar sus propiedades, gestionar citas y visualizar estadísticas de rendimiento |
| **Administrador del Sistema** | Operador interno | Gestionar los agentes inmobiliarios activos en la plataforma, garantizando la calidad y operatividad del servicio |
| **Equipo de Desarrollo** | Desarrolladores | Construir, mantener y escalar la plataforma utilizando buenas prácticas de ingeniería de software |

### 1.6 Usuarios del Sistema

El sistema está diseñado para operar con tres perfiles de usuario distintos, cada uno con permisos y funcionalidades específicas:

| Actor | Tipo | Descripción | Funcionalidades principales |
|-------|------|-------------|----------------------------|
| **Cliente** | Externo | Persona que se registra en la plataforma para buscar, guardar en favoritos y contactar agentes para ver propiedades y realizar citas. | Registro con datos personales y fotografía, búsqueda y filtrado de propiedades, gestión de favoritos, solicitud de citas, aceptación/rechazo de horarios propuestos por el agente, actualización de datos personales. |
| **Agente Inmobiliario** | Externo | Profesional encargado de dar de alta, actualizar y dar mantenimiento a las propiedades publicadas en el sitio. | CRUD completo de propiedades (título, dirección, precio, descripción, fotos, habitaciones, baños, m²), gestión de tipos de inmueble, dashboard con gráficas (Top 3 tipos, Top 5 zonas), gestión de citas y propuesta de horarios. |
| **Administrador** | Interno | Encargado de la gestión operativa del sistema; su función principal es gestionar a los agentes inmobiliarios. | CRUD de agentes (crear, editar, eliminar), supervisión general del sistema, ingreso mediante credenciales (correo y contraseña). |

### 1.7 Arquitectura del Sistema

#### 1.7.1 Arquitectura Clean (Limpia)

El sistema HomeFinder Pro implementa una **Arquitectura Clean** que separa las responsabilidades en capas bien definidas, promoviendo la independencia de frameworks, testabilidad y mantenibilidad:

```
┌─────────────────────────────────────────────────┐
│                  Frontend (React)                │
│  Pages → Containers → Components → Strategies   │
├─────────────────────────────────────────────────┤
│              API REST (HTTP/JSON)                │
├─────────────────────────────────────────────────┤
│                Backend (Express)                 │
│  Routes → Controllers → Services → DB/Adapters  │
├─────────────────────────────────────────────────┤
│            Base de Datos (PostgreSQL)            │
│               Prisma ORM (Schema)                │
└─────────────────────────────────────────────────┘
```

**Principios aplicados**:
- **Separación de responsabilidades**: Cada módulo tiene una tarea específica (routing, validación, lógica de negocio, persistencia)
- **Inversión de dependencias**: Las capas internas no dependen de detalles externos; se usan interfaces (Adapter Pattern) para servicios como almacenamiento de archivos
- **Independencia de frameworks**: La lógica de negocio (servicios) no depende directamente de Express; los controladores actúan como adaptadores

#### 1.7.2 Arquitectura de Tres Capas

La aplicación se organiza en tres capas principales:

| Capa | Tecnología | Responsabilidad |
|------|-----------|-----------------|
| **Presentación** | React + Vite + Tailwind CSS | Interfaz de usuario, interacción con el usuario, validaciones del lado del cliente |
| **Lógica de Negocio** | Express.js + TypeScript | Procesamiento de solicitudes, validaciones, reglas de negocio, autenticación |
| **Persistencia** | PostgreSQL + Prisma ORM | Almacenamiento de datos, consultas, migraciones, integridad referencial |

### 1.8 Componentes del Sistema

#### 1.8.1 Frontend (React + Vite)

El frontend está desarrollado con **React 19** y utiliza **Vite** como bundler para desarrollo rápido con HMR. Se estiliza con **Tailwind CSS** y sigue una arquitectura de componentes organizada en capas:

| Capa | Directorio | Descripción |
|------|-----------|-------------|
| **Pages** | `src/pages/` | Vistas completas que representan rutas de la aplicación (HomePage, LoginPage, RegisterPage, SearchPage) |
| **Containers** | `src/containers/` | Componentes con lógica de estado y efectos secundarios. Orquestan la comunicación con la API y pasan datos a los componentes presentacionales |
| **Components** | `src/components/` | Componentes presentacionales reutilizables organizados por dominio (auth, layout, search, ui) |
| **Strategies** | `src/strategies/` | Implementación del patrón Strategy para filtrado y ordenamiento de propiedades |

**Dependencias principales**: React 19, React Router DOM 7, Tailwind CSS, Lucide React (iconos), Framer Motion (animaciones), React Hot Toast (notificaciones), TSParticles (efectos visuales).

#### 1.8.2 Backend (Express.js + TypeScript)

El backend está desarrollado con **Express 5** y **TypeScript 5.9**, organizado en módulos independientes siguiendo Clean Architecture:

| Capa | Directorio | Descripción |
|------|-----------|-------------|
| **Módulos** | `src/modules/` | Módulos por dominio (auth, admin, agent, client), cada uno con route, controller y service |
| **Middleware** | `src/middleware/` | Middleware de autenticación JWT y validación de campos con express-validator |
| **Adapters** | `src/adapters/` | Adaptadores para servicios externos (Supabase Storage) que implementan interfaces definidas internamente |
| **Lib** | `src/lib/` | Utilidades core: seguridad (bcrypt, JWT), cliente Supabase |
| **Config** | `src/config/` | Configuraciones (CORS) |
| **Store** | `src/store/` | Enums y constantes del dominio (tipos de usuario, estados de propiedad, estados de invitación) |
| **Utils** | `src/utils/` | Funciones utilitarias (respuestas HTTP, base64, strings, variables de entorno) |
| **DB** | `src/db/` | Configuración de conexión a base de datos con Prisma y pool de PostgreSQL |

**Dependencias principales**: Express 5, Prisma 7 (con adapter-pg), bcryptjs, jsonwebtoken, express-validator, Supabase JS, dotenv.

#### 1.8.3 Base de Datos (PostgreSQL + Prisma)

La base de datos **PostgreSQL 15.3** se gestiona mediante **Prisma ORM** con las siguientes características:

- **Migraciones automáticas**: Control de versiones del esquema con `prisma migrate`
- **Generación de cliente tipado**: Prisma Client generado automáticamente para queries type-safe
- **Adapter pattern**: Se utiliza `@prisma/adapter-pg` con un pool nativo de `pg` para máximo control sobre la conexión
- **Seed de datos**: Script de seeding (`src/db/seed.ts`) para poblar la base de datos con datos de prueba

#### 1.8.4 Infraestructura (Docker)

El backend y la base de datos se despliegan mediante **Docker Compose** con dos servicios:

| Servicio | Imagen | Descripción |
|----------|--------|-------------|
| **postgres-db** | `postgres:15.3` | Base de datos PostgreSQL con volumen persistente, healthcheck configurado |
| **backend** | Build desde `Dockerfile` | Aplicación Node.js 24 Alpine, ejecuta migraciones, seed y servidor de desarrollo |

**Docker Compose** orquesta ambos servicios en una red bridge interna (`homefinder-network`), asegurando que el backend espere a que PostgreSQL esté saludable antes de arrancar.

### 1.9 Patrones de Diseño Implementados

#### 1.9.1 Patrones en el Frontend

| Patrón | Descripción | Implementación |
|--------|-------------|----------------|
| **Container/Presentational** | Separa la lógica de estado (containers) de la presentación visual (components). Los containers manejan estado, efectos y llamadas a la API; los components solo reciben props y renderizan UI. | `containers/auth/LoginContainer.jsx` maneja el estado de login y pasa datos a `components/auth/LoginForm.jsx` que solo renderiza el formulario. |
| **Strategy** | Define una familia de algoritmos intercambiables para filtrado y ordenamiento. Permite añadir nuevos filtros u ordenamientos sin modificar el código existente. | `strategies/PropertyFilters.js` define 8 estrategias de filtrado (texto, tipo, precio min/max, zona, habitaciones, baños, área). `strategies/PropertySorters.js` define 5 estrategias de ordenamiento (reciente, precio asc/desc, área, popularidad). |
| **State** | Gestión del estado de la aplicación usando hooks de React (useState, useEffect, useCallback) para manejar los ciclos de vida de los componentes. | `SearchContainer.jsx` gestiona estado de propiedades, filtros activos, tipo de ordenamiento y resultados filtrados. |
| **Command** | Encapsula acciones como objetos, permitiendo parametrizar clientes con diferentes solicitudes. | Acciones de filtrado y búsqueda se encapsulan como funciones que se pasan como callbacks a los componentes. |
| **Module** | Organización del código en módulos autocontenidos con barrel exports para simplificar importaciones. | Cada carpeta de componentes tiene un archivo `index.js` que re-exporta los componentes (barrel export). |

#### 1.9.2 Patrones en el Backend

| Patrón | Descripción | Implementación |
|--------|-------------|----------------|
| **Singleton** | Garantiza una única instancia de recursos costosos como la conexión a la base de datos y clientes de servicios externos. | `db/db.ts`: La instancia de `PrismaClient` se almacena en `global.prisma` para reutilizarla en desarrollo. `lib/supabase.ts`: El cliente de Supabase se almacena en `global.supabase`. |
| **Adapter** | Desacopla la lógica de negocio de implementaciones externas concretas. Si se cambia un proveedor (ej: de Supabase a S3), solo se modifica el adaptador, no los servicios que lo consumen. | `adapters/storage/public-object-storage.ts` define la interfaz `PublicObjectStorage`. `adapters/storage/supabase-public-object-storage.adapter.ts` implementa dicha interfaz usando Supabase. Los servicios solo dependen de la interfaz, nunca de Supabase directamente. |

### 1.10 Tecnologías y Justificación

| Tecnología | Versión | Justificación |
|------------|---------|---------------|
| **React** | 19.2 | Librería líder para construcción de interfaces de usuario reactivas con amplio ecosistema |
| **Vite** | — | Bundler ultra-rápido con HMR instantáneo, ideal para desarrollo ágil |
| **Tailwind CSS** | — | Framework CSS utility-first que acelera el desarrollo de UI sin salir del HTML/JSX |
| **Express.js** | 5.2 | Framework minimalista y flexible para APIs REST en Node.js |
| **TypeScript** | 5.9 | Tipado estático que reduce errores en tiempo de desarrollo y mejora la mantenibilidad |
| **PostgreSQL** | 15.3 | RDBMS robusto, confiable y con soporte completo para transacciones ACID |
| **Prisma ORM** | 7.3 | ORM moderno con generación de tipos, migraciones automáticas y queries type-safe |
| **Docker** | — | Contenedorización para garantizar entornos reproducibles y despliegue consistente |
| **Docker Compose** | — | Orquestación de servicios (backend + DB) en un solo comando |
| **bcryptjs** | 3.0 | Hashing seguro de contraseñas con salt rounds configurables |
| **jsonwebtoken** | 9.0 | Estándar industria para autenticación stateless basada en tokens JWT |
| **Supabase Storage** | 2.95 | Almacenamiento de objetos (imágenes) con CDN integrado |

### 1.11 Estructura del Proyecto

#### 1.11.1 Estructura del Frontend

```
client/
├── public/images/             # Recursos estáticos
├── src/
│   ├── assets/                # Assets internos
│   ├── components/            # Componentes presentacionales
│   │   ├── auth/              #   LoginForm, RegisterForm
│   │   ├── layout/            #   NavbarClient
│   │   ├── search/            #   FilterPanel, PropertyCard
│   │   └── ui/                #   Button, Input, InfoBox
│   ├── containers/            # Contenedores con lógica de estado
│   │   ├── auth/              #   LoginContainer, RegisterContainer
│   │   └── search/            #   SearchContainer
│   ├── pages/                 # Vistas/Rutas
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   └── SearchPage.jsx
│   ├── strategies/            # Patrón Strategy
│   │   ├── PropertyFilters.js #   8 estrategias de filtrado
│   │   └── PropertySorters.js #   5 estrategias de ordenamiento
│   ├── App.jsx                # Router principal
│   ├── App.css                # Estilos globales
│   ├── index.css              # Tailwind + animaciones
│   └── main.jsx               # Entry point
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

#### 1.11.2 Estructura del Backend

```
server/
├── prisma/
│   ├── schema.prisma          # Definición del esquema de BD
│   └── migrations/            # Historial de migraciones
├── src/
│   ├── adapters/storage/      # Adapter Pattern (Supabase Storage)
│   ├── config/                # Configuración CORS
│   ├── db/                    # Conexión BD, seed, SQL
│   ├── generated/prisma/      # Cliente Prisma auto-generado
│   ├── lib/                   # Seguridad (bcrypt, JWT), Supabase client
│   ├── middleware/            # Auth middleware, validación
│   ├── modules/               # Módulos por dominio
│   │   ├── auth/              #   route.ts, controller.ts, service.ts
│   │   ├── admin/             #   (en desarrollo)
│   │   ├── agent/             #   (en desarrollo)
│   │   └── client/            #   (en desarrollo)
│   ├── store/                 # Enums (UserType, PropertyType, etc.)
│   ├── types/                 # Tipos globales (Express.d.ts)
│   ├── utils/                 # Utilidades (response, base64, env, strings)
│   └── index.ts               # Entry point del servidor
├── docker-compose.yml         # Orquestación Docker
├── Dockerfile                 # Imagen del backend
├── docker-entrypoint.sh       # Script de arranque
├── package.json
└── tsconfig.json
```

### 1.12 Base de Datos

#### 1.12.1 Modelo Relacional

![Modelo Relacional](imgs/Relational.png)

![Modelo Lógico](imgs/Logical.png)

#### 1.12.2 Descripción de Tablas

| Tabla | Descripción | Campos principales |
|-------|-------------|-------------------|
| **USER** | Almacena todos los usuarios del sistema (clientes, agentes, administradores) diferenciados por el campo `type`. | `id_user`, `email` (único), `password` (hash bcrypt), `gender`, `type` (ADMIN/AGENT/CLIENT), `name`, `last_name`, `url_img`, `phone`, `created_at` |
| **property** | Almacena las propiedades inmobiliarias publicadas por los agentes. | `id_property`, `title`, `type` (HOUSE/APARTMENT/LAND/RETAIL SPACE), `address`, `price`, `description`, `num_rooms`, `num_bathrooms`, `square_meters`, `state` (AVAILABLE/SOLD/NOT AVAILABLE), `zone`, `created_at`, `id_agent` (FK → USER) |
| **favorite** | Relación muchos-a-muchos entre clientes y propiedades favoritas. | `id_favorite`, `created_at`, `id_client` (FK → USER), `id_property` (FK → property) |
| **image** | Almacena las imágenes asociadas a cada propiedad. | `id_image`, `correlative`, `url_img`, `id_property` (FK → property) |
| **invitation** | Gestiona las solicitudes de cita entre clientes y propiedades (y por ende, agentes). | `id_invitation`, `status` (PENDING/ACCEPTED/REJECTED/ACKNOWLEDGE), `created_at`, `updated_at`, `is_accepted`, `justification`, `description`, `expected_date`, `id_client` (FK → USER), `id_property` (FK → property) |
| **record** | Registro de historial de visitas/interacciones de clientes con propiedades. | `id_record`, `created_at`, `id_client` (FK → USER), `id_property` (FK → property) |

### 1.13 APIs y Servicios REST

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/register` | Registro de nuevo cliente con datos personales y fotografía opcional (base64) | No |
| `POST` | `/api/auth/login` | Inicio de sesión con email y contraseña, retorna JWT | No |
| `GET` | `/api/auth/me` | Obtener información del usuario autenticado | Sí (Bearer JWT) |

### 1.14 Seguridad

| Mecanismo | Descripción |
|-----------|-------------|
| **Autenticación JWT** | Tokens firmados con `jsonwebtoken`, expiración de 7 días, payload contiene `sub` (id), `email` y `type` (rol). Se envían como Bearer token en el header `Authorization`. |
| **Hashing de contraseñas** | bcrypt con 10 salt rounds. Las contraseñas nunca se almacenan en texto plano. |
| **Middleware de autenticación** | `authMiddleware` extrae y verifica el Bearer token en cada request protegido. Inyecta `req.user` con el payload decodificado. |
| **Validación de entrada** | `express-validator` valida todos los campos de entrada en las rutas (email válido, longitud de contraseña, formatos de datos). |
| **CORS** | Configuración restrictiva: solo permite orígenes autorizados (localhost en desarrollo, dominios de producción), con soporte para credentials. |
| **Variables de entorno** | Secrets (JWT_SECRET, DATABASE_URL, SUPABASE_KEY) se gestionan mediante archivos `.env` y nunca se incluyen en el repositorio. |

### 1.15 Despliegue

El despliegue se realiza mediante Docker Compose con la siguiente configuración:

```yaml
# docker-compose.yml
services:
  postgres-db:    # PostgreSQL 15.3 con healthcheck
  backend:        # Node.js 24 Alpine, depende de postgres-db
```

**Pasos de despliegue**:
1. Configurar archivo `.env` con variables de entorno
2. Ejecutar `docker-compose up --build`
3. El `docker-entrypoint.sh` ejecuta:
   - `prisma migrate dev` (migraciones)
   - `prisma db seed` (datos iniciales)
   - `npm run dev` (servidor de desarrollo)

**Estrategia de branching**: GitFlow con ramas `main` y `develop`. Features se crean desde `develop` y se fusionan de vuelta. Formato de commits: `#carnet: mensaje`.

---

## 2. Diagramas de Casos de Uso

Esta sección presenta los diagramas de casos de uso del sistema HomeFinder Pro, organizados desde el nivel más alto de abstracción hasta el detalle de cada caso de uso expandido.

### 2.1 Actores del Sistema

| Actor | Tipo | Descripción | Casos de Uso Principales |
|-------|------|-------------|--------------------------|
| **Cliente** | Primario / Externo | Persona que se registra para buscar propiedades, guardar favoritos y solicitar citas con agentes inmobiliarios. Se registra con nombre completo, correo electrónico (único), contraseña y fotografía (opcional). | CDU002 (Solicitar cita, aceptar/rechazar horario), CDU004 (Buscar y filtrar propiedades, editar perfil, gestionar favoritos), CDU005 (Registro, inicio de sesión) |
| **Agente Inmobiliario** | Primario / Externo | Profesional del sector inmobiliario encargado de publicar, actualizar y dar mantenimiento a las propiedades en la plataforma. Gestiona citas con clientes y tiene acceso a estadísticas de rendimiento. | CDU001 (CRUD propiedades, gestionar tipos de inmueble, consultar dashboard/estadísticas), CDU002 (Proponer horarios, gestionar citas), CDU005 (Inicio de sesión) |
| **Administrador** | Primario / Interno | Usuario con privilegios administrativos cuya función principal es gestionar a los agentes inmobiliarios del sistema. Ingresa mediante credenciales (correo y contraseña). | CDU003 (CRUD de agentes inmobiliarios), CDU005 (Inicio de sesión) |
| **Sistema** | Secundario / Interno | La plataforma HomeFinder Pro que procesa solicitudes, valida datos, gestiona notificaciones y mantiene la integridad de la información. | Participa en todos los CDU como el componente que procesa y responde a las acciones de los actores primarios. |

### 2.2 Diagrama de Casos de Uso de Alto Nivel (High-Level)

![Diagrama de Alto Nivel](imgs/high-level-use-case.png)

El diagrama de alto nivel presenta una vista general del sistema, mostrando los principales actores y la funcionalidad principal que ofrece la plataforma:

**Casos de uso principales**:
- **CDU001**: Gestión de Propiedades Inmobiliarias
- **CDU002**: Solicitud y Negociación de Citas
- **CDU003**: Gestión de Usuarios/Agentes
- **CDU004**: Gestión de Perfil y Búsqueda
- **CDU005**: Autenticación y Autorización

Este nivel de abstracción permite comprender rápidamente el alcance funcional del sistema y las interacciones principales entre actores y funcionalidades.

### 2.3 Descomposición de Casos de Uso

![Descomposición de Casos de Uso](imgs/descomposition-use-case.png)

Cada caso de uso principal se descompone en sub-casos de uso más específicos que detallan las operaciones concretas que pueden realizar los actores. A continuación se presenta la estructura jerárquica:

**CDU001 - Gestión de Propiedades**:
- CDU001.0: Gestionar Propiedades
- CDU001.1: Crear Propiedad
- CDU001.2: Actualizar Propiedad
- CDU001.3: Eliminar Propiedad
- CDU001.4: Consultar Estadísticas
- CDU001.5: Gestionar Tipo de Inmuebles
- CDU001.6: Crear Tipo de Inmueble
- CDU001.7: Eliminar Tipo de Inmueble
- CDU001.8: Actualizar Tipo de Inmueble
- CDU001.9: Visualizar Propiedades

**CDU002 - Gestión de Citas**:
- CDU002.0: Solicitar Cita
- CDU002.1: Proponer Horarios de Cita
- CDU002.2: Aceptar/Rechazar Horario

**CDU003 - Gestión de Usuarios/Agentes**:
- CDU003.0: Visualizar Agentes
- CDU003.1: Gestionar Agentes
- CDU003.2: Crear Agente
- CDU003.3: Actualizar Agente
- CDU003.4: Eliminar Agente

**CDU004 - Gestión de Perfil y Búsqueda**:
- CDU004.0: Visualizar Propiedades
- CDU004.1: Filtrar Propiedades
- CDU004.2: Editar Información Personal
- CDU004.3: Gestionar Perfil

**CDU005 - Autenticación y Autorización**:
- CDU005.0: Registrar Cliente
- CDU005.1: Iniciar Sesión
- CDU005.2: Cerrar Sesión

### 2.4 Especificación Detallada de Casos de Uso

A continuación se presenta la especificación detallada de cada caso de uso expandido.

---

#### 2.4.1 CDU001 - Gestión de Propiedades Inmobiliarias

![Diagrama CDU001](imgs/CDU001.png)

| Campo | Descripción |
|-------|-------------|
| **Nombre** | Gestión de Propiedades Inmobiliarias |
| **Código** | CDU001 |
| **Actores** | Agente Inmobiliario |
| **Descripción** | Permite al agente administrar el ciclo de vida de las propiedades (creación, edición, eliminación) y consultar el rendimiento de las mismas mediante estadísticas. |
| **Precondiciones** | El Agente debe haber iniciado sesión (CDU005). |
| **Post Condiciones** | El catálogo de propiedades queda actualizado en la base de datos. |
| **Flujo Principal** | 1. El Agente selecciona "Gestionar Propiedades" (CDU001.0).<br>2. El Sistema muestra el listado de inmuebles asignados.<br>3. El Agente visualiza la información general.<br>4. El Agente finaliza la gestión. |
| **Flujos Alternos** | **FA1: Crear Propiedad (CDU001.1)**<br>1. El Agente selecciona "Nueva Propiedad".<br>2. Ingresa datos (título, dirección, precio, descripción, tipo, habitaciones, baños, m², zona) y fotos.<br>3. Sistema valida campos obligatorios y formatos.<br>4. Sistema almacena la propiedad e imágenes.<br><br>**FA2: Actualizar Propiedad (CDU001.2)**<br>1. El Agente selecciona una propiedad existente.<br>2. Modifica los datos necesarios.<br>3. Sistema valida y actualiza.<br><br>**FA3: Eliminar Propiedad (CDU001.3)**<br>1. El Agente selecciona eliminar propiedad.<br>2. Sistema solicita confirmación.<br>3. Sistema elimina la propiedad y sus imágenes/favoritos/citas asociadas (cascade).<br><br>**FA4: Consultar Estadísticas (CDU001.4)**<br>1. El Agente selecciona ver dashboard.<br>2. Sistema muestra Top 3 tipos de inmuebles más buscados y Top 5 zonas con mayor oferta.<br><br>**FA5: Gestión de Tipos (CDU001.5)**<br>1. El Agente accede al catálogo de tipos.<br>2. Puede crear (CDU001.6), actualizar (CDU001.8) o eliminar (CDU001.7) tipos de inmueble (Casa, Apartamento, Terreno, Local Comercial).<br><br>**FA6: Visualizar Propiedades (CDU001.9)**<br>1. El Agente visualiza el listado completo de sus propiedades con filtros por tipo, precio y características.<br>2. Sistema muestra información resumida de cada propiedad. |
| **Reglas de Negocio** | RN1: Solo el agente propietario puede editar o eliminar una propiedad.<br>RN2: Toda propiedad debe tener al menos título, dirección, precio, tipo y descripción.<br>RN3: Los tipos de inmueble válidos son: Casa, Apartamento, Terreno y Local Comercial.<br>RN4: El precio debe ser un valor numérico positivo con máximo 2 decimales.<br>RN5: Al eliminar una propiedad se eliminan en cascada sus imágenes, favoritos, citas y registros asociados.<br>RN6: Las estadísticas del dashboard se calculan en base a los registros de búsqueda (tabla `record`). |
| **Reglas de Calidad** | RC1: La creación/actualización de propiedad debe completarse en menos de 3 segundos (excluyendo carga de imágenes).<br>RC2: El dashboard de estadísticas debe cargar en menos de 2 segundos.<br>RC3: Las imágenes de propiedades deben almacenarse en un servicio externo (Supabase Storage) con URL pública accesible.<br>RC4: Los campos deben validarse tanto en frontend como en backend para garantizar integridad. |

---

#### 2.4.2 CDU002 - Solicitud y Negociación de Citas

![Diagrama CDU002](imgs/CDU002.png)

| Campo | Descripción |
|-------|-------------|
| **Nombre** | Solicitud y Negociación de Citas |
| **Código** | CDU002 |
| **Actores** | Cliente (Iniciador), Agente Inmobiliario |
| **Descripción** | Gestiona el flujo de agendamiento de visitas, permitiendo al cliente solicitar una hora, y al agente aceptar o proponer una contraoferta. |
| **Precondiciones** | El Cliente debe estar registrado e haber iniciado sesión. La propiedad debe estar en estado "AVAILABLE". |
| **Post Condiciones** | La cita queda en estado "ACCEPTED", "REJECTED" o "PENDING" en la tabla `invitation`. |
| **Flujo Principal** | 1. El Cliente solicita una cita para una propiedad (CDU002.0).<br>2. El Sistema crea una invitación con estado "PENDING".<br>3. El Agente propietario de la propiedad revisa la solicitud.<br>4. El Agente acepta el horario propuesto (CDU002.2).<br>5. El Sistema actualiza el estado a "ACCEPTED". |
| **Flujos Alternos** | **FA1: Proponer Nuevo Horario (CDU002.1)**<br>1. El Agente no acepta la hora inicial y propone una nueva fecha/hora (`expected_date`).<br>2. El Cliente recibe la propuesta con la descripción del agente.<br>3. El Cliente Acepta o Rechaza (CDU002.2).<br><br>**FA2: Cliente Rechaza Horario Propuesto**<br>1. El Cliente rechaza el horario propuesto por el agente.<br>2. El Sistema solicita al cliente ingresar un motivo (`justification`).<br>3. El Sistema actualiza el estado a "REJECTED" y almacena la justificación.<br>4. El Agente puede visualizar el motivo y proponer un nuevo horario. |
| **Reglas de Negocio** | RN1: Solo se pueden solicitar citas para propiedades en estado "AVAILABLE".<br>RN2: El estado de una invitación sigue el ciclo: PENDING → ACCEPTED/REJECTED/ACKNOWLEDGE.<br>RN3: Al rechazar una cita (tanto cliente como agente) se debe proporcionar una justificación obligatoria (máximo 300 caracteres).<br>RN4: El agente puede proponer un horario alternativo mediante el campo `expected_date`.<br>RN5: Un cliente puede tener múltiples solicitudes de cita para diferentes propiedades. |
| **Reglas de Calidad** | RC1: Las solicitudes de cita deben procesarse y ser visibles para el agente en menos de 2 segundos.<br>RC2: El cambio de estado de una cita debe reflejarse inmediatamente en la interfaz de ambos actores.<br>RC3: El campo de justificación debe permitir texto descriptivo de hasta 300 caracteres. |

---

#### 2.4.3 CDU003 - Gestión de Usuarios/Agentes

![Diagrama CDU003](imgs/CDU003.png)

| Campo | Descripción |
|-------|-------------|
| **Nombre** | Gestión de Usuarios/Agentes |
| **Código** | CDU003 |
| **Actores** | Administrador |
| **Descripción** | Permite al Administrador la gestión completa de agentes inmobiliarios en el sistema, incluyendo la creación, visualización, actualización y eliminación de cuentas de agentes. |
| **Precondiciones** | El Administrador debe haber iniciado sesión (CDU005) y su tipo de usuario debe ser "ADMIN". |
| **Post Condiciones** | El catálogo de agentes queda actualizado en la base de datos. Los agentes creados pueden acceder al sistema con sus credenciales. |
| **Flujo Principal** | 1. El Administrador accede al módulo de Gestión de Agentes (CDU003.1).<br>2. El Sistema muestra el listado de agentes registrados (CDU003.0).<br>3. El Administrador visualiza la información de los agentes.<br>4. El Administrador finaliza la gestión. |
| **Flujos Alternos** | **FA1: Crear Agente (CDU003.2)**<br>1. El Administrador selecciona "Nuevo Agente".<br>2. Ingresa los datos del agente (nombre, apellido, correo, teléfono, género, contraseña, fotografía opcional).<br>3. Sistema valida que el correo no exista.<br>4. Sistema crea la cuenta con tipo "AGENT" y hash de contraseña.<br><br>**FA2: Actualizar Agente (CDU003.3)**<br>1. El Administrador selecciona un agente existente.<br>2. Modifica los datos necesarios.<br>3. Sistema valida y actualiza la información.<br><br>**FA3: Eliminar/Desactivar Agente (CDU003.4)**<br>1. El Administrador selecciona eliminar agente.<br>2. Sistema solicita confirmación.<br>3. Sistema elimina la cuenta del agente y sus propiedades asociadas (cascade). |
| **Reglas de Negocio** | RN1: Solo los usuarios con tipo "ADMIN" pueden acceder a la gestión de agentes.<br>RN2: El correo electrónico del agente debe ser único en el sistema.<br>RN3: La contraseña del agente debe cumplir con los requisitos mínimos de seguridad (mínimo 6 caracteres).<br>RN4: Al eliminar un agente se eliminan en cascada todas sus propiedades, imágenes, favoritos y citas asociadas.<br>RN5: Un agente recién creado puede iniciar sesión inmediatamente con las credenciales asignadas. |
| **Reglas de Calidad** | RC1: El listado de agentes debe cargarse en menos de 2 segundos.<br>RC2: La creación de un agente debe completarse en menos de 3 segundos.<br>RC3: Se debe solicitar confirmación antes de eliminar un agente para prevenir eliminaciones accidentales. |

---

#### 2.4.4 CDU004 - Gestión de Perfil y Búsqueda

![Diagrama CDU004](imgs/CDU004.png)

| Campo | Descripción |
|-------|-------------|
| **Nombre** | Gestión de Perfil y Búsqueda |
| **Código** | CDU004 |
| **Actores** | Cliente |
| **Descripción** | Permite al cliente gestionar su información personal y realizar búsquedas avanzadas de propiedades utilizando múltiples filtros y criterios de ordenamiento para encontrar inmuebles que se ajusten a sus necesidades. |
| **Precondiciones** | El Cliente debe haber iniciado sesión (CDU005). |
| **Post Condiciones** | La información del perfil del cliente queda actualizada. El historial de búsquedas se registra en la tabla `record`. |
| **Flujo Principal** | 1. El Cliente accede a su perfil o módulo de búsqueda.<br>2. El Sistema muestra las opciones disponibles.<br>3. El Cliente selecciona Visualizar Propiedades (CDU004.0) o Gestionar Perfil (CDU004.3).<br>4. El Sistema procesa la solicitud. |
| **Flujos Alternos** | **FA1: Filtrar Propiedades (CDU004.1)**<br>1. El Cliente selecciona "Buscar Propiedades".<br>2. El Sistema muestra el panel de filtros con opciones: tipo de inmueble, rango de precio (mín-máx), zona, número de habitaciones, número de baños, rango de área (mín-máx).<br>3. El Cliente aplica uno o más filtros utilizando el patrón Strategy.<br>4. El Sistema aplica las estrategias de filtrado secuencialmente y muestra los resultados.<br>5. El Cliente puede ordenar resultados (reciente, precio asc/desc, área, popularidad).<br>6. El Cliente puede agregar propiedades a favoritos.<br><br>**FA2: Editar Información Personal (CDU004.2)**<br>1. El Cliente selecciona "Editar Perfil".<br>2. Modifica sus datos personales (nombre, apellido, correo, teléfono, fotografía).<br>3. Sistema valida los cambios (correo único, formatos correctos).<br>4. Sistema actualiza la información del perfil.<br><br>**FA3: Visualizar Propiedades (CDU004.0)**<br>1. El Cliente visualiza el catálogo completo de propiedades disponibles.<br>2. Sistema muestra información resumida (título, precio, tipo, zona, imagen principal).<br>3. El Cliente puede seleccionar una propiedad para ver detalles completos. |
| **Reglas de Negocio** | RN1: Los filtros se aplican de forma acumulativa (AND lógico entre filtros activos).<br>RN2: La búsqueda por texto busca coincidencias en título, descripción, dirección y zona.<br>RN3: Solo se muestran propiedades en estado "AVAILABLE".<br>RN4: Cada vista de propiedad se registra en la tabla `record` para alimentar las estadísticas del dashboard del agente.<br>RN5: Un cliente puede agregar/quitar propiedades de favoritos sin límite.<br>RN6: El correo electrónico es el identificador único del usuario y no puede duplicarse al actualizar el perfil. |
| **Reglas de Calidad** | RC1: Los resultados de búsqueda deben mostrarse en menos de 2 segundos.<br>RC2: Los filtros deben aplicarse en el cliente con la estrategia correspondiente sin necesidad de recargar la página.<br>RC3: La actualización de perfil debe confirmar los cambios al usuario con una notificación visual (toast).<br>RC4: La interfaz de búsqueda debe ser responsiva y funcionar correctamente en dispositivos móviles. |

---

#### 2.4.5 CDU005 - Autenticación y Autorización

![Diagrama CDU005](imgs/CDU005.png)

| Campo | Descripción |
|-------|-------------|
| **Nombre** | Autenticación y Autorización |
| **Código** | CDU005 |
| **Actores** | Cliente, Agente Inmobiliario, Administrador |
| **Descripción** | Gestiona el registro de nuevos clientes y el inicio/cierre de sesión de todos los usuarios del sistema, asegurando que cada usuario acceda únicamente a las funcionalidades correspondientes a su rol. |
| **Precondiciones** | Para registro: el correo electrónico no debe estar registrado. Para login: el usuario debe tener una cuenta existente. |
| **Post Condiciones** | Registro: se crea una nueva cuenta de tipo "CLIENT" y se emite un JWT. Login: se emite un JWT válido por 7 días. Logout: se invalida la sesión del cliente. |
| **Flujo Principal** | 1. El usuario accede a la página de inicio de sesión.<br>2. Ingresa su correo electrónico y contraseña.<br>3. El Sistema valida las credenciales contra la base de datos (comparación bcrypt).<br>4. El Sistema genera un token JWT con el payload (sub, email, type).<br>5. El Sistema retorna el token y los datos del usuario (sin contraseña).<br>6. El Sistema redirige al usuario a la vista correspondiente según su rol. |
| **Flujos Alternos** | **FA1: Registrar Cliente (CDU005.0)**<br>1. El usuario selecciona "Crear cuenta".<br>2. Ingresa: nombre, apellido, correo electrónico, contraseña (mín. 6 caracteres), teléfono (8-9 dígitos), género.<br>3. Opcionalmente adjunta una fotografía de perfil (base64 o URL).<br>4. Sistema valida que el correo no esté registrado.<br>5. Sistema hashea la contraseña con bcrypt (10 rounds) y crea la cuenta con tipo "CLIENT".<br>6. Si se adjuntó foto, se sube a Supabase Storage y se almacena la URL pública.<br>7. Sistema emite JWT y retorna los datos del usuario.<br><br>**FA2: Credenciales Inválidas**<br>1. El usuario ingresa email/contraseña incorrectos.<br>2. Sistema responde con error 401 "Invalid credentials".<br>3. Se muestra mensaje de error en la interfaz.<br><br>**FA3: Correo ya Registrado**<br>1. Durante el registro, el correo ya existe en la base de datos.<br>2. Sistema responde con error 400 "Email already registered".<br>3. Se muestra mensaje indicando que el correo ya está en uso. |
| **Reglas de Negocio** | RN1: El correo electrónico debe ser único en todo el sistema (validado con constraint UNIQUE en BD).<br>RN2: Las contraseñas se almacenan hasheadas con bcrypt (10 salt rounds), nunca en texto plano.<br>RN3: El registro público solo crea cuentas de tipo "CLIENT"; los agentes son creados por el administrador (CDU003).<br>RN4: El token JWT tiene una vigencia de 7 días y contiene: id de usuario (sub), email y tipo de usuario (type).<br>RN5: Todos los endpoints protegidos requieren un Bearer token válido en el header Authorization. |
| **Reglas de Calidad** | RC1: El proceso de registro/login debe completarse en menos de 2 segundos.<br>RC2: Los mensajes de error deben ser claros y específicos (campo inválido, correo duplicado, credenciales incorrectas).<br>RC3: El formulario de registro debe validar campos en tiempo real antes de enviar al servidor.<br>RC4: La contraseña no debe ser visible por defecto; se ofrece un toggle para mostrar/ocultar. |

---

## 3. Requerimientos del Sistema

### 3.1 Requerimientos Funcionales

| ID | Requerimiento | Descripción | Prioridad | CDU Relacionado |
|----|--------------|-------------|-----------|-----------------|
| RF001 | Registro de clientes | El sistema debe permitir el registro de nuevos clientes con: nombre completo, correo electrónico (único), contraseña y fotografía (opcional). | Alta | CDU005.0 |
| RF002 | Inicio de sesión | El sistema debe permitir que todos los usuarios (Cliente, Agente, Administrador) inicien sesión con correo electrónico y contraseña. | Alta | CDU005.1 |
| RF003 | Autenticación JWT | El sistema debe emitir un token JWT al iniciar sesión o registrarse, que se utiliza para autenticar las solicitudes posteriores. | Alta | CDU005 |
| RF004 | Cierre de sesión | El sistema debe permitir al usuario cerrar sesión, invalidando su sesión actual en el cliente. | Media | CDU005.2 |
| RF005 | Crear propiedad | El sistema debe permitir al agente inmobiliario crear propiedades con: título, dirección, precio, descripción, fotos, número de habitaciones, baños, metros cuadrados, tipo y zona. | Alta | CDU001.1 |
| RF006 | Actualizar propiedad | El sistema debe permitir al agente actualizar los datos de sus propiedades existentes. | Alta | CDU001.2 |
| RF007 | Eliminar propiedad | El sistema debe permitir al agente eliminar propiedades, con confirmación previa y eliminación en cascada de datos asociados. | Alta | CDU001.3 |
| RF008 | Consultar estadísticas | El sistema debe mostrar al agente un dashboard con: Top 3 de tipos de inmuebles más buscados y Top 5 de zonas con mayor oferta de propiedades. | Media | CDU001.4 |
| RF009 | Gestionar tipos de inmueble | El sistema debe permitir al agente crear, actualizar y eliminar tipos de inmueble (Casa, Apartamento, Terreno, Local Comercial). | Media | CDU001.5, CDU001.6, CDU001.7, CDU001.8 |
| RF010 | Visualizar propiedades (Agente) | El sistema debe permitir al agente visualizar el listado de sus propiedades con posibilidad de filtrar por tipo, precio y características. | Alta | CDU001.9 |
| RF011 | Solicitar cita | El sistema debe permitir al cliente solicitar una cita para evaluar una propiedad. | Alta | CDU002.0 |
| RF012 | Proponer horario de cita | El sistema debe permitir al agente proponer un horario alternativo para una solicitud de cita. | Alta | CDU002.1 |
| RF013 | Aceptar/Rechazar horario | El sistema debe permitir tanto al cliente como al agente aceptar o rechazar un horario de cita, con justificación obligatoria en caso de rechazo. | Alta | CDU002.2 |
| RF014 | Visualizar agentes | El sistema debe permitir al administrador ver el listado de todos los agentes registrados. | Alta | CDU003.0 |
| RF015 | Crear agente | El sistema debe permitir al administrador crear nuevas cuentas de agente inmobiliario con sus datos personales. | Alta | CDU003.2 |
| RF016 | Actualizar agente | El sistema debe permitir al administrador actualizar los datos de un agente existente. | Media | CDU003.3 |
| RF017 | Eliminar agente | El sistema debe permitir al administrador eliminar un agente del sistema, con eliminación en cascada de sus propiedades. | Media | CDU003.4 |
| RF018 | Buscar propiedades | El sistema debe permitir al cliente buscar propiedades por texto libre (título, descripción, dirección). | Alta | CDU004.0, CDU004.1 |
| RF019 | Filtrar propiedades | El sistema debe permitir filtrar propiedades por: tipo de inmueble, rango de precio, zona, número de habitaciones, número de baños y rango de área. | Alta | CDU004.1 |
| RF020 | Ordenar resultados | El sistema debe permitir ordenar los resultados de búsqueda por: más recientes, precio ascendente/descendente, mayor área y popularidad. | Media | CDU004.1 |
| RF021 | Gestionar favoritos | El sistema debe permitir al cliente agregar y quitar propiedades de su lista de favoritos. | Media | CDU004.0 |
| RF022 | Editar perfil | El sistema debe permitir al cliente actualizar sus datos personales (nombre, correo, teléfono, fotografía). | Media | CDU004.2 |
| RF023 | Carga de imágenes | El sistema debe permitir subir fotografías de propiedades y perfiles en formato base64 o URL, almacenándolas en Supabase Storage. | Alta | CDU001.1, CDU005.0 |
| RF024 | Registro de visitas | El sistema debe registrar cada visita/interacción de un cliente con una propiedad para alimentar las estadísticas del agente. | Baja | CDU004.0 |

### 3.2 Requerimientos No Funcionales

| ID | Requerimiento | Categoría | Descripción | Métrica / Criterio de Aceptación |
|----|--------------|-----------|-------------|----------------------------------|
| RNF001 | Tiempo de respuesta | Rendimiento | Las operaciones de lectura (listados, búsquedas) deben completarse en un tiempo aceptable. | ≤ 2 segundos para resultados de búsqueda y listados |
| RNF002 | Tiempo de procesamiento | Rendimiento | Las operaciones de escritura (registro, creación de propiedades) deben procesarse rápidamente. | ≤ 3 segundos para operaciones de creación/actualización |
| RNF003 | Seguridad de contraseñas | Seguridad | Las contraseñas deben almacenarse de forma segura utilizando algoritmos de hashing con salt. | bcrypt con 10 salt rounds; nunca en texto plano |
| RNF004 | Autenticación stateless | Seguridad | El sistema debe utilizar autenticación basada en tokens para no depender de estado en el servidor. | JWT con firma, expiración de 7 días |
| RNF005 | Validación de entrada | Seguridad | Toda entrada del usuario debe validarse tanto en frontend como en backend para prevenir inyecciones y datos malformados. | express-validator en backend; validaciones en React en frontend |
| RNF006 | Protección CORS | Seguridad | El sistema debe restringir los orígenes permitidos para solicitudes cross-origin. | Solo orígenes autorizados (localhost en desarrollo, dominios específicos en producción) |
| RNF007 | Containerización | Escalabilidad | El backend y la base de datos deben ejecutarse en contenedores Docker para garantizar portabilidad y reproducibilidad. | Docker Compose con 2 servicios (backend + PostgreSQL) |
| RNF008 | Responsividad | Usabilidad | La interfaz de usuario debe adaptarse correctamente a diferentes tamaños de pantalla. | Tailwind CSS con breakpoints responsivos; funcional en móvil y escritorio |
| RNF009 | Retroalimentación visual | Usabilidad | El sistema debe proporcionar retroalimentación visual clara ante las acciones del usuario (éxito, error, carga). | Toast notifications, estados de loading en botones, mensajes de error específicos |
| RNF010 | Integridad referencial | Confiabilidad | La base de datos debe mantener integridad referencial con eliminación en cascada donde corresponda. | Foreign keys con ON DELETE CASCADE configuradas en Prisma |
| RNF011 | Migraciones de base de datos | Mantenibilidad | Los cambios en el esquema de la base de datos deben gestionarse mediante migraciones versionadas. | Prisma Migrate con historial de migraciones |
| RNF012 | Modularidad del código | Mantenibilidad | El código debe organizarse en módulos independientes con responsabilidades bien definidas. | Módulos por dominio (auth, admin, agent, client) con separación route/controller/service |
| RNF013 | Patrones de diseño | Mantenibilidad | El sistema debe implementar patrones de diseño reconocidos para facilitar la extensibilidad y mantenimiento. | Strategy, Adapter, Singleton, Container/Presentational, Module |
| RNF014 | Almacenamiento externo | Escalabilidad | Las imágenes y archivos deben almacenarse en un servicio externo de objetos, no en el servidor de aplicación. | Supabase Storage con URLs públicas |
| RNF015 | Tipado estático | Mantenibilidad | El backend debe utilizar tipado estático para reducir errores en tiempo de desarrollo. | TypeScript con tipos generados por Prisma para queries type-safe |

---

## 4. Matrices de Trazabilidad

### 4.1 Matriz de Trazabilidad de Casos de Uso

Esta matriz relaciona cada caso de uso con los actores involucrados, los requerimientos funcionales que implementa y los módulos del sistema que lo soportan.

| Caso de Uso | Actor(es) | Requerimientos Funcionales | Módulo Backend | Componentes Frontend |
|-------------|-----------|---------------------------|----------------|---------------------|
| CDU001.0 - Gestionar Propiedades | Agente | RF010 | `modules/agent/` | Dashboard del Agente |
| CDU001.1 - Crear Propiedad | Agente | RF005, RF023 | `modules/agent/` | Formulario de Propiedad |
| CDU001.2 - Actualizar Propiedad | Agente | RF006 | `modules/agent/` | Formulario de Propiedad |
| CDU001.3 - Eliminar Propiedad | Agente | RF007 | `modules/agent/` | Dashboard del Agente |
| CDU001.4 - Consultar Estadísticas | Agente | RF008 | `modules/agent/` | Dashboard con Gráficas |
| CDU001.5-8 - Gestionar Tipos | Agente | RF009 | `modules/agent/` | Catálogo de Tipos |
| CDU001.9 - Visualizar Propiedades | Agente | RF010 | `modules/agent/` | Listado de Propiedades |
| CDU002.0 - Solicitar Cita | Cliente | RF011 | `modules/client/` | Detalle de Propiedad |
| CDU002.1 - Proponer Horario | Agente | RF012 | `modules/agent/` | Gestión de Citas |
| CDU002.2 - Aceptar/Rechazar | Cliente, Agente | RF013 | `modules/client/`, `modules/agent/` | Vista de Citas |
| CDU003.0 - Visualizar Agentes | Administrador | RF014 | `modules/admin/` | Panel de Administración |
| CDU003.2 - Crear Agente | Administrador | RF015 | `modules/admin/` | Formulario de Agente |
| CDU003.3 - Actualizar Agente | Administrador | RF016 | `modules/admin/` | Formulario de Agente |
| CDU003.4 - Eliminar Agente | Administrador | RF017 | `modules/admin/` | Panel de Administración |
| CDU004.0 - Visualizar Propiedades | Cliente | RF018, RF021, RF024 | `modules/client/` | `SearchContainer`, `PropertyCard` |
| CDU004.1 - Filtrar Propiedades | Cliente | RF019, RF020 | `modules/client/` | `FilterPanel`, `SearchContainer` |
| CDU004.2 - Editar Perfil | Cliente | RF022 | `modules/client/` | Formulario de Perfil |
| CDU005.0 - Registrar Cliente | Cliente | RF001, RF003, RF023 | `modules/auth/` | `RegisterContainer`, `RegisterForm` |
| CDU005.1 - Iniciar Sesión | Cliente, Agente, Admin | RF002, RF003 | `modules/auth/` | `LoginContainer`, `LoginForm` |
| CDU005.2 - Cerrar Sesión | Cliente, Agente, Admin | RF004 | — (cliente) | `NavbarClient` |

### 4.2 Matriz de Trazabilidad de Requerimientos Funcionales

Esta matriz vincula cada requerimiento funcional con sus casos de uso correspondientes, su estado de implementación y los componentes técnicos involucrados.

| ID | Requerimiento | CDU | Componente Técnico | Estado |
|----|--------------|-----|-------------------|--------|
| RF001 | Registro de clientes | CDU005.0 | `auth/service.ts` → `registerUser()`, `RegisterContainer.jsx`, `RegisterForm.jsx` | ✅ Implementado |
| RF002 | Inicio de sesión | CDU005.1 | `auth/service.ts` → `loginUser()`, `LoginContainer.jsx`, `LoginForm.jsx` | ✅ Implementado |
| RF003 | Autenticación JWT | CDU005 | `lib/security.ts` → `signAuthToken()`, `verifyAuthToken()`, `middleware/auth.ts` | ✅ Implementado |
| RF004 | Cierre de sesión | CDU005.2 | `NavbarClient.jsx` → `onLogout()` (limpieza de token en cliente) | ⚠️ Parcial |
| RF005 | Crear propiedad | CDU001.1 | `modules/agent/` (en desarrollo) | 🔲 Pendiente |
| RF006 | Actualizar propiedad | CDU001.2 | `modules/agent/` (en desarrollo) | 🔲 Pendiente |
| RF007 | Eliminar propiedad | CDU001.3 | `modules/agent/` (en desarrollo) | 🔲 Pendiente |
| RF008 | Consultar estadísticas | CDU001.4 | `modules/agent/` (en desarrollo) | 🔲 Pendiente |
| RF009 | Gestionar tipos de inmueble | CDU001.5-8 | `modules/agent/` (en desarrollo) | 🔲 Pendiente |
| RF010 | Visualizar propiedades (Agente) | CDU001.9 | `modules/agent/` (en desarrollo) | 🔲 Pendiente |
| RF011 | Solicitar cita | CDU002.0 | `modules/client/` (en desarrollo) | 🔲 Pendiente |
| RF012 | Proponer horario | CDU002.1 | `modules/agent/` (en desarrollo) | 🔲 Pendiente |
| RF013 | Aceptar/Rechazar horario | CDU002.2 | `modules/client/`, `modules/agent/` (en desarrollo) | 🔲 Pendiente |
| RF014 | Visualizar agentes | CDU003.0 | `modules/admin/` (en desarrollo) | 🔲 Pendiente |
| RF015 | Crear agente | CDU003.2 | `modules/admin/` (en desarrollo) | 🔲 Pendiente |
| RF016 | Actualizar agente | CDU003.3 | `modules/admin/` (en desarrollo) | 🔲 Pendiente |
| RF017 | Eliminar agente | CDU003.4 | `modules/admin/` (en desarrollo) | 🔲 Pendiente |
| RF018 | Buscar propiedades | CDU004.0-1 | `SearchContainer.jsx`, `strategies/PropertyFilters.js` (frontend con datos mock) | ⚠️ Parcial |
| RF019 | Filtrar propiedades | CDU004.1 | `FilterPanel.jsx`, `PropertyFilters.js` (8 estrategias implementadas en frontend) | ⚠️ Parcial |
| RF020 | Ordenar resultados | CDU004.1 | `PropertySorters.js` (5 estrategias implementadas en frontend) | ⚠️ Parcial |
| RF021 | Gestionar favoritos | CDU004.0 | `PropertyCard.jsx` → `onToggleFavorite()` (frontend con estado local) | ⚠️ Parcial |
| RF022 | Editar perfil | CDU004.2 | `modules/client/` (en desarrollo) | 🔲 Pendiente |
| RF023 | Carga de imágenes | CDU001.1, CDU005.0 | `adapters/storage/`, `utils/supabase-storage.ts`, `utils/base64.ts` | ✅ Implementado |
| RF024 | Registro de visitas | CDU004.0 | Tabla `record` en BD (en desarrollo la API) | 🔲 Pendiente |

### 4.3 Matriz de Trazabilidad de Requerimientos No Funcionales

Esta matriz relaciona cada requerimiento no funcional con los componentes técnicos que lo implementan y los casos de uso que se ven impactados.

| ID | Requerimiento | Categoría | Componentes que lo implementan | CDU impactados |
|----|--------------|-----------|-------------------------------|----------------|
| RNF001 | Tiempo de respuesta ≤ 2s | Rendimiento | Pool de conexiones pg, índices en BD, queries optimizadas con Prisma `select` | CDU004.0, CDU004.1, CDU003.0 |
| RNF002 | Tiempo de procesamiento ≤ 3s | Rendimiento | Procesamiento asíncrono, bcrypt con 10 rounds | CDU005.0, CDU001.1, CDU003.2 |
| RNF003 | Seguridad de contraseñas | Seguridad | `lib/security.ts` → `hashPassword()`, `verifyPassword()` (bcrypt) | CDU005.0, CDU005.1 |
| RNF004 | Autenticación stateless | Seguridad | `lib/security.ts` → `signAuthToken()`, `middleware/auth.ts` | Todos los CDU protegidos |
| RNF005 | Validación de entrada | Seguridad | `express-validator` en rutas, validaciones en React forms | Todos los CDU con formularios |
| RNF006 | Protección CORS | Seguridad | `config/cors.config.ts` | Todos los CDU (comunicación frontend-backend) |
| RNF007 | Containerización | Escalabilidad | `docker-compose.yml`, `Dockerfile`, `docker-entrypoint.sh` | Todos (infraestructura) |
| RNF008 | Responsividad | Usabilidad | Tailwind CSS responsive utilities, componentes responsivos | CDU004.0, CDU004.1, CDU005.0, CDU005.1 |
| RNF009 | Retroalimentación visual | Usabilidad | `react-hot-toast`, estados `loading` en Button.jsx, mensajes de error | CDU005.0, CDU005.1, CDU004.1 |
| RNF010 | Integridad referencial | Confiabilidad | `schema.prisma` → `onDelete: Cascade`, foreign keys | CDU001.3, CDU003.4 |
| RNF011 | Migraciones de BD | Mantenibilidad | `prisma/migrations/`, `prisma migrate dev` | Todos (esquema de BD) |
| RNF012 | Modularidad del código | Mantenibilidad | Estructura `modules/{auth,admin,agent,client}/`, barrel exports en frontend | Todos |
| RNF013 | Patrones de diseño | Mantenibilidad | Strategy (filtros/sort), Adapter (storage), Singleton (DB), Container/Presentational | CDU004.1, CDU001.1, Todos |
| RNF014 | Almacenamiento externo | Escalabilidad | `adapters/storage/`, Supabase Storage | CDU001.1, CDU005.0 |
| RNF015 | Tipado estático | Mantenibilidad | TypeScript, Prisma Client generado, tipos en `types/express.d.ts` | Todos (backend) |

---

## 5. Diagramas de Secuencia

Los diagramas de secuencia muestran la interacción entre objetos en orden secuencial, representando cómo se comunican los diferentes componentes del sistema para ejecutar las funcionalidades principales.

### 5.1 Descripción General

Los diagramas de secuencia del sistema HomeFinder Pro documentan los flujos de interacción más importantes entre los actores (Clientes, Agentes, Administradores) y los componentes del sistema (Frontend, Backend, Base de Datos).

### 5.2 Diagramas Disponibles

El sistema cuenta con los siguientes diagramas de secuencia que detallan los procesos principales:

#### 5.2.1 Publicación de Propiedad

![publish-property.png](imgs/publish-property.png)

**Descripción**: Muestra el flujo completo que realiza un agente inmobiliario al publicar una nueva propiedad en el sistema, incluyendo la validación de datos, carga de fotografías y almacenamiento en la base de datos.

**Actores involucrados**:
- Agente Inmobiliario
- Sistema Frontend
- Sistema Backend
- Base de Datos

**Flujo principal**:
1. El agente ingresa los datos de la propiedad
2. El sistema valida la información
3. Se cargan las fotografías
4. Se almacena la propiedad en la base de datos
5. Se confirma la publicación al agente

#### 5.2.2 Negociación de Cita

![negotiation-date.png](imgs/negotiation-date.png)

**Descripción**: Representa el proceso de solicitud y negociación de citas entre clientes y agentes para visitar propiedades, incluyendo la propuesta de horarios y el manejo de aceptaciones o rechazos.

**Actores involucrados**:
- Cliente
- Agente Inmobiliario
- Sistema Frontend
- Sistema Backend
- Base de Datos

**Flujo principal**:
1. El cliente solicita una cita para visitar una propiedad
2. El sistema notifica al agente
3. El agente puede aceptar o proponer un horario alternativo
4. El cliente recibe la propuesta
5. El cliente acepta o rechaza el horario propuesto
6. Si rechaza, debe proporcionar un motivo
7. El sistema actualiza el estado de la cita


### 5.3 Convenciones Utilizadas

Los diagramas de secuencia siguen las siguientes convenciones UML:

- **Actores**: Representados con iconos de persona
- **Sistemas/Componentes**: Representados con rectángulos
- **Mensajes síncronos**: Flechas con línea sólida
- **Mensajes asíncronos**: Flechas con línea punteada
- **Activación**: Rectángulos verticales en la línea de vida
- **Retorno**: Líneas punteadas con flecha

### 5.4 Relación con Casos de Uso

Los diagramas de secuencia complementan la especificación de casos de uso, mostrando el detalle temporal de las interacciones:

| Diagrama de Secuencia | Casos de Uso Relacionados | Descripción de la Relación |
|----------------------|---------------------------|----------------------------|
| Publicación de Propiedad | CDU001.1 (Crear Propiedad) | Detalla el flujo temporal de creación de una propiedad |
| Negociación de Cita | CDU002.0, CDU002.1, CDU002.2 | Muestra la secuencia completa de solicitud, propuesta y aceptación/rechazo de citas |

---

