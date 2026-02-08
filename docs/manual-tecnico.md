# Manual Técnico - HomeFinder Pro S.A.

## Índice

- [1. Introducción](#1-introducción)
- [2. Elección y Justificación del Framework](#2-elección-y-justificación-del-framework)
- [3. Elección y Justificación de Patrones de Diseño](#3-elección-y-justificación-de-patrones-de-diseño)
- [4. Componentes y Estructura del Sistema](#4-componentes-y-estructura-del-sistema)
- [5. Diagramas de Casos de Uso](#5-diagramas-de-casos-de-uso)
- [6. Requerimientos del Sistema](#6-requerimientos-del-sistema)
- [7. Matrices de Trazabilidad](#7-matrices-de-trazabilidad)
- [8. Diagramas de Secuencia](#8-diagramas-de-secuencia)

---

## 1. Introducción

### 1.1 Propósito

Documentar la arquitectura, diseño, implementación y despliegue de **HomeFinder Pro S.A.**, plataforma digital para la gestión y publicación de inmuebles.

### 1.2 Descripción General del Sistema

**HomeFinder Pro** es una plataforma web para el mercado de bienes raíces y alquiler de propiedades. Permite la administración de usuarios (agentes y clientes), propiedades, y un sistema de búsqueda avanzado. La plataforma se compone de:

1. **Frontend**: React + Vite + Tailwind CSS
2. **Backend**: API RESTful con Express.js y TypeScript, organizado en módulos independientes
3. **Base de Datos**: PostgreSQL 15.3 dockerizada, con Prisma ORM

El sistema implementa tres roles de usuario (Cliente, Agente, Administrador) con permisos específicos.

> **Grabación de reunión del equipo**: [Ver grabación en Google Drive](https://drive.google.com/file/d/12jqS7NmptNaC-R2ljdes3CAZS-amgMqk/view)

### 1.3 Alcances Funcionales

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

### 1.4 Stakeholders

| Stakeholder | Rol | Interés en el Sistema |
|-------------|-----|----------------------|
| **HomeFinder Pro S.A.** | Empresa propietaria | Disponer de una plataforma digital para la gestión y publicación de inmuebles |
| **Clientes** | Usuarios finales | Buscar, filtrar y contactar agentes para evaluar propiedades |
| **Agentes Inmobiliarios** | Profesionales inmobiliarios | Publicar propiedades, gestionar citas y visualizar estadísticas |
| **Administrador del Sistema** | Operador interno | Gestionar los agentes inmobiliarios activos en la plataforma |
| **Equipo de Desarrollo** | Desarrolladores | Construir, mantener y escalar la plataforma |

### 1.5 Usuarios del Sistema

| Actor | Tipo | Descripción | Funcionalidades principales |
|-------|------|-------------|----------------------------|
| **Cliente** | Externo | Persona que se registra en la plataforma para buscar, guardar en favoritos y contactar agentes para ver propiedades y realizar citas. | Registro con datos personales y fotografía, búsqueda y filtrado de propiedades, gestión de favoritos, solicitud de citas, aceptación/rechazo de horarios propuestos por el agente, actualización de datos personales. |
| **Agente Inmobiliario** | Externo | Profesional encargado de dar de alta, actualizar y dar mantenimiento a las propiedades publicadas en el sitio. | CRUD completo de propiedades (título, dirección, precio, descripción, fotos, habitaciones, baños, m²), gestión de tipos de inmueble, dashboard con gráficas (Top 3 tipos, Top 5 zonas), gestión de citas y propuesta de horarios. |
| **Administrador** | Interno | Encargado de la gestión operativa del sistema; su función principal es gestionar a los agentes inmobiliarios. | CRUD de agentes (crear, editar, eliminar), supervisión general del sistema, ingreso mediante credenciales (correo y contraseña). |

---

## 2. Elección y Justificación del Framework

Se seleccionaron frameworks y tecnologías que en conjunto cumplen con los requerimientos funcionales y no funcionales del sistema, priorizando productividad, mantenibilidad y ecosistema.

### 2.1 Frontend: React + Vite + Tailwind CSS

| Criterio | Justificación |
|----------|---------------|
| **¿Por qué React?** | Es la librería más adoptada para aplicaciones SPA (Single Page Application). Su modelo basado en componentes permite crear interfaces modulares y reutilizables (componentes como `PropertyCard`, `FilterPanel`, `Button`). El Virtual DOM garantiza rendimiento en listas dinámicas como los resultados de búsqueda de propiedades. |
| **¿Por qué Vite?** | Vite ofrece un arranque de servidor en milisegundos y Hot Module Replacement (HMR) instantáneo, lo que acelera el ciclo de desarrollo comparado con webpack/CRA. Además permite builds optimizados con Rollup para producción. |
| **¿Por qué Tailwind CSS?** | Tailwind es un framework CSS utility-first que elimina la necesidad de escribir CSS convencional. Permite estilizar directamente en JSX, reduce el código muerto mediante purging, y facilita la creación de interfaces responsivas con breakpoints integrados. |
| **¿Por qué React Router DOM?** | Proporciona routing declarativo SPA para las vistas del sistema (HomePage, LoginPage, RegisterPage, SearchPage), con navegación sin recarga de página. |

### 2.2 Backend: Express.js + TypeScript

| Criterio | Justificación |
|----------|---------------|
| **¿Por qué Express.js?** | Es el framework HTTP más usado en Node.js. Su enfoque minimalista y sin opiniones permite estructurar el backend como se necesite (en este caso, modular por dominio). El ecosistema de middleware es vasto: se usa `cors`, `express-validator`, middleware de autenticación JWT, etc. |
| **¿Por qué TypeScript?** | El tipado estático previene errores en tiempo de compilación, mejora el autocompletado/IntelliSense y facilita el refactoreo seguro. Combinado con Prisma, se obtienen queries completamente tipadas contra la base de datos, eliminando errores de runtime por campos inexistentes o tipos incorrectos. |

### 2.3 Base de Datos: PostgreSQL + Prisma ORM

| Criterio | Justificación |
|----------|---------------|
| **¿Por qué PostgreSQL?** | RDBMS robusto con soporte completo para transacciones ACID, integridad referencial con foreign keys, índices, y tipos de datos ricos (`NUMERIC`, `TIMESTAMP`, `VARCHAR`). Es necesario para un sistema con múltiples relaciones (usuarios → propiedades → favoritos → citas → imágenes). |
| **¿Por qué Prisma ORM?** | Prisma genera un cliente tipado a partir del schema, lo que permite queries type-safe en TypeScript. Sus migraciones versionadas (`prisma migrate`) mantienen el esquema sincronizado entre entornos. El adapter `@prisma/adapter-pg` con pool nativo de `pg` ofrece control fino sobre las conexiones. |

### 2.4 Infraestructura: Docker + Docker Compose

| Criterio | Justificación |
|----------|---------------|
| **¿Por qué Docker?** | Containerizar el backend y la base de datos garantiza que el entorno sea **idéntico** en la máquina de cualquier desarrollador y en producción. Elimina el problema de "funciona en mi máquina". |
| **¿Por qué Docker Compose?** | Permite orquestar los dos servicios (PostgreSQL + backend) con un solo `docker-compose up`. El healthcheck asegura que el backend no arranque hasta que PostgreSQL esté disponible. |

### 2.5 Resumen de Tecnologías

| Tecnología | Versión | Rol en el sistema |
|------------|---------|-------------------|
| React | 19.2 | UI: Componentes reactivos, SPA |
| Vite | — | Bundler con HMR instantáneo |
| Tailwind CSS | — | Estilos utility-first responsivos |
| Express.js | 5.2 | API REST, middleware HTTP |
| TypeScript | 5.9 | Tipado estático en backend |
| PostgreSQL | 15.3 | Base de datos relacional ACID |
| Prisma ORM | 7.3 | ORM type-safe, migraciones |
| Docker / Compose | — | Containerización y orquestación |
| bcryptjs | 3.0 | Hashing de contraseñas |
| jsonwebtoken | 9.0 | Autenticación JWT stateless |
| Supabase Storage | 2.95 | Almacenamiento de imágenes con CDN |

---

## 3. Elección y Justificación de Patrones de Diseño

Se implementaron patrones de diseño reconocidos tanto en el frontend como en el backend para resolver problemas concretos de diseño, mejorar la mantenibilidad y facilitar la extensión del sistema.

### 3.1 Patrones en el Frontend

#### 3.1.1 Container/Presentational

**Problema que resuelve**: En aplicaciones React, mezclar lógica de negocio/estado con código de renderizado produce componentes difíciles de probar y reutilizar.

**Solución implementada**: Se separan los componentes en dos capas:
- **Containers** (`containers/`): Manejan estado, efectos secundarios y llamadas a la API. Ejemplo: `LoginContainer.jsx` gestiona el estado de email/password, la llamada al endpoint `/api/auth/login` y el manejo de errores.
- **Presentational** (`components/`): Solo reciben props y renderizan UI. Ejemplo: `LoginForm.jsx` renderiza el formulario sin saber de dónde vienen los datos.

**Beneficio**: Los componentes presentacionales son reutilizables y testeables de forma aislada. La lógica de negocio se concentra en un solo lugar.

#### 3.1.2 Strategy (Patrón de Estrategia)

**Problema que resuelve**: El sistema necesita 8 filtros y 5 criterios de ordenamiento diferentes para las propiedades. Implementarlos con condicionales `if/else` o `switch` generaría un código monolítico e imposible de extender.

**Solución implementada**:
- `strategies/PropertyFilters.js`: Define 8 estrategias de filtrado intercambiables (texto, tipo, precio mín/máx, zona, habitaciones, baños, área). Cada estrategia implementa el método `execute(properties, filterValue)`.
- `strategies/PropertySorters.js`: Define 5 estrategias de ordenamiento (reciente, precio asc/desc, área, popularidad) con una clase base `SortStrategy` y una clase contexto `PropertySorter`.

**Beneficio**: Para agregar un nuevo filtro, solo se crea un nuevo objeto con `execute()`. No se modifica ningún código existente (principio Open/Closed).

#### 3.1.3 State

Gestión del estado mediante hooks de React (`useState`, `useEffect`, `useCallback`). `SearchContainer.jsx` gestiona centralizadamente el estado de propiedades, filtros activos, tipo de ordenamiento y resultados.

#### 3.1.4 Module (Barrel Exports)

Cada carpeta de componentes tiene un `index.js` que re-exporta sus componentes, simplificando las importaciones: `import { LoginForm, RegisterForm } from '../components/auth'`.

### 3.2 Patrones en el Backend

#### 3.2.1 Singleton

**Problema que resuelve**: Crear múltiples instancias de `PrismaClient` o del cliente de Supabase desperdicia recursos y puede causar errores de conexión.

**Solución implementada**:
- `db/db.ts`: La instancia de `PrismaClient` se almacena en `global.prisma` para reutilizarla entre recargas en caliente durante desarrollo.
- `lib/supabase.ts`: El cliente de Supabase se almacena en `global.supabase`.

**Beneficio**: Se garantiza una única instancia por recurso costoso, reutilizando conexiones.

#### 3.2.2 Adapter

**Problema que resuelve**: El servicio de almacenamiento de archivos (Supabase Storage) es un proveedor externo. Si se quisiera cambiar a AWS S3 o almacenamiento local, sin un adapter habría que modificar cada módulo que sube archivos.

**Solución implementada**:
- `adapters/storage/public-object-storage.ts`: Define la interfaz `PublicObjectStorage` con el método `uploadObject()`.
- `adapters/storage/supabase-public-object-storage.adapter.ts`: Implementa dicha interfaz usando el SDK de Supabase.
- Los servicios (como `auth/service.ts`) solo dependen de la interfaz, nunca de Supabase directamente.

**Beneficio**: Cambiar de proveedor de almacenamiento requiere solo crear un nuevo adapter. Cero cambios en la lógica de negocio.

---

## 4. Componentes y Estructura del Sistema

### 4.1 Arquitectura

El sistema sigue una **Arquitectura Modular por Capas (Layered Modular Architecture)**:

```
┌─────────────────────────────────────────────────┐
│                  Frontend (React)               │
│  Pages → Containers → Components → Strategies   │
├─────────────────────────────────────────────────┤
│              API REST (HTTP/JSON)               │
├─────────────────────────────────────────────────┤
│                Backend (Express)                │
│  Routes → Controllers → Services → DB/Adapters  │
├─────────────────────────────────────────────────┤
│            Base de Datos (PostgreSQL)           │
│               Prisma ORM (Schema)               │
└─────────────────────────────────────────────────┘
```

El backend se organiza en **módulos por dominio** (`auth`, `admin`, `agent`, `client`), donde cada módulo sigue internamente una separación en tres capas: **Route → Controller → Service**. Las dependencias externas se abstraen mediante interfaces (Adapter Pattern).

### 4.2 Frontend

| Capa | Directorio | Descripción |
|------|-----------|-------------|
| **Pages** | `src/pages/` | Vistas por ruta (HomePage, LoginPage, RegisterPage, SearchPage) |
| **Containers** | `src/containers/` | Lógica de estado y llamadas a la API |
| **Components** | `src/components/` | Componentes presentacionales reutilizables (auth, layout, search, ui) |
| **Strategies** | `src/strategies/` | Patrón Strategy para filtrado y ordenamiento |

### 4.3 Backend

| Capa | Directorio | Descripción |
|------|-----------|-------------|
| **Módulos** | `src/modules/` | Módulos por dominio (auth, admin, agent, client), cada uno con route → controller → service |
| **Middleware** | `src/middleware/` | Autenticación JWT y validación con express-validator |
| **Adapters** | `src/adapters/` | Adaptadores para servicios externos (Supabase Storage) |
| **Lib** | `src/lib/` | Seguridad (bcrypt, JWT), cliente Supabase |
| **Store** | `src/store/` | Enums del dominio (UserType, PropertyType, PropertyState, InvitationState) |
| **Utils** | `src/utils/` | Funciones utilitarias (respuestas HTTP, base64, env, strings) |
| **DB** | `src/db/` | Conexión a BD con Prisma + pool pg |

### 4.4 Estructura del Proyecto

#### 4.4.1 Estructura del Frontend

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

#### 4.4.2 Estructura del Backend

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

### 4.5 Base de Datos

#### 4.5.1 Modelo Relacional

![Modelo Relacional](imgs/Relational.png)

![Modelo Lógico](imgs/Logical.png)

#### 4.5.2 Descripción de Tablas

| Tabla | Descripción | Campos principales |
|-------|-------------|-------------------|
| **USER** | Almacena todos los usuarios del sistema (clientes, agentes, administradores) diferenciados por el campo `type`. | `id_user`, `email` (único), `password` (hash bcrypt), `gender`, `type` (ADMIN/AGENT/CLIENT), `name`, `last_name`, `url_img`, `phone`, `created_at` |
| **property** | Almacena las propiedades inmobiliarias publicadas por los agentes. | `id_property`, `title`, `type` (HOUSE/APARTMENT/LAND/RETAIL SPACE), `address`, `price`, `description`, `num_rooms`, `num_bathrooms`, `square_meters`, `state` (AVAILABLE/SOLD/NOT AVAILABLE), `zone`, `created_at`, `id_agent` (FK → USER) |
| **favorite** | Relación muchos-a-muchos entre clientes y propiedades favoritas. | `id_favorite`, `created_at`, `id_client` (FK → USER), `id_property` (FK → property) |
| **image** | Almacena las imágenes asociadas a cada propiedad. | `id_image`, `correlative`, `url_img`, `id_property` (FK → property) |
| **invitation** | Gestiona las solicitudes de cita entre clientes y propiedades (y por ende, agentes). | `id_invitation`, `status` (PENDING/ACCEPTED/REJECTED/ACKNOWLEDGE), `created_at`, `updated_at`, `is_accepted`, `justification`, `description`, `expected_date`, `id_client` (FK → USER), `id_property` (FK → property) |
| **record** | Registro de historial de visitas/interacciones de clientes con propiedades. | `id_record`, `created_at`, `id_client` (FK → USER), `id_property` (FK → property) |

### 4.6 APIs y Endpoints

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/register` | Registro de nuevo cliente con datos personales y fotografía opcional (base64) | No |
| `POST` | `/api/auth/login` | Inicio de sesión con email y contraseña, retorna JWT | No |
| `GET` | `/api/auth/me` | Obtener información del usuario autenticado | Sí (Bearer JWT) |

### 4.7 Seguridad

| Mecanismo | Descripción |
|-----------|-------------|
| **Autenticación JWT** | Tokens firmados con `jsonwebtoken`, expiración de 7 días, payload contiene `sub` (id), `email` y `type` (rol). Se envían como Bearer token en el header `Authorization`. |
| **Hashing de contraseñas** | bcrypt con 10 salt rounds. Las contraseñas nunca se almacenan en texto plano. |
| **Middleware de autenticación** | `authMiddleware` extrae y verifica el Bearer token en cada request protegido. Inyecta `req.user` con el payload decodificado. |
| **Validación de entrada** | `express-validator` valida todos los campos de entrada en las rutas (email válido, longitud de contraseña, formatos de datos). |
| **CORS** | Configuración restrictiva: solo permite orígenes autorizados (localhost en desarrollo, dominios de producción), con soporte para credentials. |
| **Variables de entorno** | Secrets (JWT_SECRET, DATABASE_URL, SUPABASE_KEY) se gestionan mediante archivos `.env` y nunca se incluyen en el repositorio. |

### 4.8 Despliegue

El despliegue se realiza mediante Docker Compose:

```yaml
# docker-compose.yml
services:
  postgres-db:    # PostgreSQL 15.3 con healthcheck
  backend:        # Node.js 24 Alpine, depende de postgres-db
```

**Pasos**: `docker-compose up --build` → el `docker-entrypoint.sh` ejecuta migraciones (`prisma migrate dev`), seed (`prisma db seed`) y arranca el servidor (`npm run dev`).

---

## 5. Diagramas de Casos de Uso

### 5.1 Actores del Sistema

| Actor | Tipo | Descripción | Casos de Uso Principales |
|-------|------|-------------|--------------------------|
| **Cliente** | Primario / Externo | Persona que se registra para buscar propiedades, guardar favoritos y solicitar citas con agentes inmobiliarios. Se registra con nombre completo, correo electrónico (único), contraseña y fotografía (opcional). | CDU002 (Solicitar cita, aceptar/rechazar horario), CDU004 (Buscar y filtrar propiedades, editar perfil, gestionar favoritos), CDU005 (Registro, inicio de sesión) |
| **Agente Inmobiliario** | Primario / Externo | Profesional del sector inmobiliario encargado de publicar, actualizar y dar mantenimiento a las propiedades en la plataforma. Gestiona citas con clientes y tiene acceso a estadísticas de rendimiento. | CDU001 (CRUD propiedades, gestionar tipos de inmueble, consultar dashboard/estadísticas), CDU002 (Proponer horarios, gestionar citas), CDU005 (Inicio de sesión) |
| **Administrador** | Primario / Interno | Usuario con privilegios administrativos cuya función principal es gestionar a los agentes inmobiliarios del sistema. Ingresa mediante credenciales (correo y contraseña). | CDU003 (CRUD de agentes inmobiliarios), CDU005 (Inicio de sesión) |
| **Sistema** | Secundario / Interno | La plataforma HomeFinder Pro que procesa solicitudes, valida datos, gestiona notificaciones y mantiene la integridad de la información. | Participa en todos los CDU como el componente que procesa y responde a las acciones de los actores primarios. |

### 5.2 Diagrama de Casos de Uso de Alto Nivel (High-Level)

![Diagrama de Alto Nivel](imgs/high-level-use-case.png)

- **CDU001**: Gestión de Propiedades Inmobiliarias
- **CDU002**: Solicitud y Negociación de Citas
- **CDU003**: Gestión de Usuarios/Agentes
- **CDU004**: Gestión de Perfil y Búsqueda
- **CDU005**: Autenticación y Autorización

### 5.3 Descomposición de Casos de Uso

![Descomposición de Casos de Uso](imgs/descomposition-use-case.png)

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

### 5.4 Especificación Detallada de Casos de Uso

A continuación se presenta la especificación detallada de cada caso de uso expandido.

---

#### 5.4.1 CDU001 - Gestión de Propiedades Inmobiliarias

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

#### 5.4.2 CDU002 - Solicitud y Negociación de Citas

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

#### 5.4.3 CDU003 - Gestión de Usuarios/Agentes

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

#### 5.4.4 CDU004 - Gestión de Perfil y Búsqueda

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

#### 5.4.5 CDU005 - Autenticación y Autorización

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

## 6. Requerimientos del Sistema

### 6.1 Requerimientos Funcionales

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

### 6.2 Requerimientos No Funcionales

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

## 7. Matrices de Trazabilidad

### 7.1 Matriz de Trazabilidad de Casos de Uso

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


### 7.2 Matriz de Trazabilidad de Requerimientos No Funcionales

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

## 8. Diagramas de Secuencia

### 8.1 Diagramas Disponibles

#### 8.1.1 Publicación de Propiedad

![publish-property.png](imgs/publish-property.png)

Muestra el flujo que realiza un agente al publicar una nueva propiedad: ingreso de datos, validación, carga de fotografías a Supabase Storage, almacenamiento en BD y confirmación. **CDU relacionado**: CDU001.1.

#### 8.1.2 Negociación de Cita

![negotiation-date.png](imgs/negotiation-date.png)

Representa el ciclo de solicitud y negociación de citas: el cliente solicita una cita, el agente puede aceptar o proponer un horario alternativo, y el cliente acepta o rechaza con justificación. **CDU relacionados**: CDU002.0, CDU002.1, CDU002.2.

------

