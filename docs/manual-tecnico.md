# Manual Técnico - HomeFinder Pro S.A.

## Índice

- [Manual Técnico - HomeFinder Pro S.A.](#manual-técnico---homefinder-pro-sa)
  - [Índice](#índice)
  - [1. Introducción](#1-introducción)
    - [1.1 Propósito](#11-propósito)
    - [1.2 Alcance](#12-alcance)
    - [1.3 Descripción General del Sistema](#13-descripción-general-del-sistema)
    - [1.4 Alcances Funcionales](#14-alcances-funcionales)
      - [1.4.1 Gestión de Clientes](#141-gestión-de-clientes)
      - [1.4.2 Gestión de Agentes Inmobiliarios](#142-gestión-de-agentes-inmobiliarios)
      - [1.4.3 Gestión Administrativa](#143-gestión-administrativa)
      - [1.4.4 Autenticación y Seguridad](#144-autenticación-y-seguridad)
    - [1.5 Alcances Técnicos](#15-alcances-técnicos)
      - [1.5.1 Rendimiento](#151-rendimiento)
      - [1.5.2 Escalabilidad](#152-escalabilidad)
      - [1.5.3 Seguridad](#153-seguridad)
      - [1.5.4 Compatibilidad](#154-compatibilidad)
      - [1.5.5 Mantenibilidad](#155-mantenibilidad)
    - [1.6 Usuarios del Sistema](#16-usuarios-del-sistema)
      - [1.6.1 Cliente](#161-cliente)
      - [1.6.2 Agente Inmobiliario](#162-agente-inmobiliario)
      - [1.6.3 Administrador](#163-administrador)
    - [1.7 Arquitectura del Sistema](#17-arquitectura-del-sistema)
      - [1.7.1 Patrón Arquitectónico: MVC (Model-View-Controller)](#171-patrón-arquitectónico-mvc-model-view-controller)
      - [1.7.2 Arquitectura de Tres Capas](#172-arquitectura-de-tres-capas)
    - [1.8 Componentes del Sistema](#18-componentes-del-sistema)
      - [1.8.1 Frontend (React)](#181-frontend-react)
      - [1.8.2 Backend (Express.js)](#182-backend-expressjs)
      - [1.8.3 Base de Datos](#183-base-de-datos)
    - [1.9 Patrones de Diseño Implementados](#19-patrones-de-diseño-implementados)
      - [1.9.1 Singleton (Base de Datos)](#191-singleton-base-de-datos)
      - [1.9.2 Chain of Responsibility (Middlewares)](#192-chain-of-responsibility-middlewares)
      - [1.9.3 Adapter](#193-adapter)
    - [1.10 Stack Tecnológico](#110-stack-tecnológico)
      - [Frontend](#frontend)
      - [Backend](#backend)
      - [Base de Datos](#base-de-datos)
      - [DevOps y Herramientas](#devops-y-herramientas)
  - [2. Diagramas de Casos de Uso](#2-diagramas-de-casos-de-uso)
    - [2.1 Diagrama de Casos de Uso de Alto Nivel (High-Level)](#21-diagrama-de-casos-de-uso-de-alto-nivel-high-level)
    - [2.2 Descomposición de Casos de Uso](#22-descomposición-de-casos-de-uso)
    - [2.3 Especificación Detallada de Casos de Uso](#23-especificación-detallada-de-casos-de-uso)
      - [2.3.1 CDU001 - Gestión de Propiedades Inmobiliarias](#231-cdu001---gestión-de-propiedades-inmobiliarias)
      - [2.3.2 CDU002 - Solicitud y Negociación de Citas](#232-cdu002---solicitud-y-negociación-de-citas)
      - [2.3.3 CDU003 - Gestión de Usuarios/Agentes](#233-cdu003---gestión-de-usuariosagentes)
      - [2.3.4 CDU004 - Gestión de Perfil y Búsqueda](#234-cdu004---gestión-de-perfil-y-búsqueda)
  - [3. Requerimientos del Sistema](#3-requerimientos-del-sistema)
    - [3.1 Requerimientos Funcionales](#31-requerimientos-funcionales)
    - [3.2 Requerimientos No Funcionales](#32-requerimientos-no-funcionales)
    - [3.3 Matriz de Trazabilidad de Requerimientos](#33-matriz-de-trazabilidad-de-requerimientos)
  - [4. Diagramas de Secuencia](#4-diagramas-de-secuencia)
    - [4.1 Descripción General](#41-descripción-general)
    - [4.2 Diagramas Disponibles](#42-diagramas-disponibles)
      - [4.2.1 Publicación de Propiedad](#421-publicación-de-propiedad)
      - [4.2.2 Negociación de Cita](#422-negociación-de-cita)
    - [4.3 Convenciones Utilizadas](#43-convenciones-utilizadas)
    - [4.4 Relación con Casos de Uso](#44-relación-con-casos-de-uso)

---

## 1. Introducción

### 1.1 Propósito

El presente manual técnico tiene como propósito documentar la arquitectura, diseño, tecnologías y componentes del sistema de gestión y publicación de inmuebles **HomeFinder Pro**, desarrollado para la empresa HomeFinder Pro S.A. Este documento está dirigido a desarrolladores, arquitectos de software, administradores de sistemas y personal técnico involucrado en el desarrollo, mantenimiento y evolución de la plataforma.

El manual proporciona una guía detallada sobre las decisiones técnicas, patrones de diseño implementados, estructura del código, configuración del entorno y mejores prácticas a seguir durante el ciclo de vida del proyecto.

### 1.2 Alcance

Este manual técnico cubre los siguientes aspectos del sistema HomeFinder Pro:

- **Arquitectura del sistema**: Descripción de la arquitectura general, capas y comunicación entre componentes
- **Framework y tecnologías**: Justificación de las tecnologías seleccionadas
- **Patrones de diseño**: Implementación y uso de patrones arquitectónicos
- **Estructura del proyecto**: Organización de directorios y archivos
- **Base de datos**: Modelo de datos, esquemas y relaciones
- **APIs y servicios**: Especificación de endpoints y servicios REST
- **Seguridad**: Mecanismos de autenticación, autorización y protección de datos
- **Despliegue**: Configuración de entornos y procedimientos de deployment

### 1.3 Descripción General del Sistema

**HomeFinder Pro** es una plataforma digital integral diseñada para la gestión y publicación de inmuebles en el mercado de bienes raíces y alquiler de propiedades. El sistema permite la administración completa de usuarios (agentes y clientes), propiedades, planes de publicación y un sistema de búsqueda avanzado.

La plataforma está construida como una aplicación web moderna de tres capas, compuesta por:

1. **Frontend (Cliente)**: Interfaz de usuario desarrollada en React que proporciona experiencias interactivas para clientes, agentes y administradores
2. **Backend (Servidor)**: API RESTful desarrollada con Express.js que gestiona la lógica de negocio y procesamiento de datos
3. **Base de Datos**: Sistema de persistencia que almacena información de usuarios, propiedades, citas y transacciones

El sistema implementa un modelo de roles y permisos que permite diferentes niveles de acceso y funcionalidades específicas según el tipo de usuario.

### 1.4 Alcances Funcionales

El sistema HomeFinder Pro proporciona las siguientes funcionalidades principales:

#### 1.4.1 Gestión de Clientes
- Registro de clientes con datos personales completos (nombre, correo electrónico, contraseña, fotografía opcional)
- Autenticación mediante correo electrónico y contraseña
- Actualización de información personal y perfil
- Búsqueda avanzada de propiedades con múltiples filtros
- Gestión de propiedades favoritas
- Solicitud de citas para visitar propiedades
- Aceptación o rechazo de horarios propuestos por agentes
- Visualización del historial de propiedades consultadas

#### 1.4.2 Gestión de Agentes Inmobiliarios
- Registro y alta de propiedades con información detallada (título, dirección, precio, descripción, fotografías, habitaciones, baños, metros cuadrados)
- Administración de tipos de inmuebles (Casa, Apartamento, Terreno, Local Comercial)
- Actualización y mantenimiento de propiedades publicadas
- Dashboard personalizado con visualización y filtrado de propiedades
- Gráficas analíticas:
  - Top 3 de tipos de inmuebles más buscados
  - Top 5 zonas con mayor oferta de propiedades
- Gestión de solicitudes de citas de clientes
- Propuesta de horarios para visitas
- Visualización del motivo de rechazo cuando un cliente rechaza una cita

#### 1.4.3 Gestión Administrativa
- Administración completa de agentes inmobiliarios
- Activación y desactivación de cuentas de agentes
- Monitoreo de actividades del sistema
- Gestión de configuraciones generales
- Reportes y estadísticas del sistema

#### 1.4.4 Autenticación y Seguridad
- Sistema de autenticación unificado para todos los roles
- Login mediante correo electrónico y contraseña
- Validación de credenciales y sesiones seguras
- Control de acceso basado en roles (RBAC)
- Protección de rutas según permisos de usuario

### 1.5 Alcances Técnicos

#### 1.5.1 Rendimiento
- Tiempo de respuesta inferior a 2 segundos para operaciones CRUD estándar
- Capacidad de manejar al menos 1000 usuarios concurrentes
- Optimización de consultas a base de datos mediante índices y queries eficientes
- Implementación de lazy loading para carga de imágenes de propiedades
- Paginación en listados extensos para reducir carga de datos

#### 1.5.2 Escalabilidad
- Arquitectura modular que permite escalamiento horizontal
- Separación clara entre frontend y backend para escalamiento independiente
- Implementación de patrones de diseño que facilitan la extensibilidad
- Estructura de código mantenible y organizada siguiendo principios SOLID

#### 1.5.3 Seguridad
- Encriptación de contraseñas mediante algoritmos de hashing seguros (bcrypt)
- Implementación de tokens JWT para manejo de sesiones
- Validación de datos en cliente y servidor
- Protección contra ataques comunes (SQL Injection, XSS, CSRF)
- HTTPS para comunicación segura entre cliente y servidor

#### 1.5.4 Compatibilidad
- Soporte para navegadores modernos (Chrome, Firefox, Safari, Edge)
- Diseño responsive compatible con dispositivos móviles, tablets y desktop
- APIs RESTful compatibles con estándares de la industria

#### 1.5.5 Mantenibilidad
- Código documentado y comentado según estándares
- Uso de ESLint y Prettier para mantener consistencia de código
- Estructura modular que facilita pruebas unitarias e integración
- Control de versiones mediante Git con estrategia Git Flow

### 1.6 Usuarios del Sistema

El sistema está diseñado para operar con tres perfiles de usuario distintos, cada uno con permisos y funcionalidades específicas:

#### 1.6.1 Cliente
**Descripción**: Persona natural que busca propiedades para comprar o alquilar.

**Funcionalidades principales**:
- Búsqueda y navegación de propiedades
- Gestión de propiedades favoritas
- Solicitud de citas con agentes
- Administración de perfil personal

**Permisos**:
- Acceso de solo lectura a propiedades publicadas
- Creación y gestión de sus propias solicitudes de cita
- Modificación de su perfil personal

#### 1.6.2 Agente Inmobiliario
**Descripción**: Profesional del sector inmobiliario encargado de publicar, actualizar y gestionar propiedades.

**Funcionalidades principales**:
- CRUD completo de propiedades
- Dashboard con estadísticas y gráficas
- Gestión de citas con clientes
- Análisis de tendencias del mercado

**Permisos**:
- Creación, edición y eliminación de propiedades propias
- Visualización de solicitudes de citas para sus propiedades
- Acceso a analytics y reportes de sus publicaciones

#### 1.6.3 Administrador
**Descripción**: Encargado de la gestión operativa del sistema y administración de agentes.

**Funcionalidades principales**:
- Gestión de usuarios agentes
- Supervisión general del sistema
- Configuración de parámetros globales

**Permisos**:
- Acceso completo a la gestión de agentes
- Visualización de todas las propiedades del sistema
- Configuración de parámetros de la plataforma

### 1.7 Arquitectura del Sistema

#### 1.7.1 Patrón Arquitectónico: MVC (Model-View-Controller)

El sistema implementa el patrón **Modelo-Vista-Controlador (MVC)**, que separa la aplicación en tres componentes principales:

**Modelo (Model)**:
- Representa la estructura de datos y la lógica de negocio
- Gestiona el acceso y manipulación de datos en la base de datos
- Define entidades como Usuario, Propiedad, Cita, TipoInmueble
- Implementa validaciones y reglas de negocio

**Vista (View)**:
- Capa de presentación desarrollada en React
- Componentes reutilizables que renderizan la interfaz de usuario
- Gestiona la interacción del usuario y eventos de UI
- Consume datos del backend a través de APIs REST

**Controlador (Controller)**:
- Intermediario entre el Modelo y la Vista
- Procesa las peticiones HTTP entrantes
- Ejecuta lógica de negocio y orquesta servicios
- Retorna respuestas apropiadas al cliente

#### 1.7.2 Arquitectura de Tres Capas

```
┌─────────────────────────────────────────┐
│     CAPA DE PRESENTACIÓN (Frontend)     │
│              React.js                    │
│  - Componentes UI                        │
│  - Gestión de estado                     │
│  - Routing del cliente                   │
└──────────────────┬──────────────────────┘
                   │ HTTP/HTTPS (REST API)
┌──────────────────▼──────────────────────┐
│     CAPA DE LÓGICA DE NEGOCIO (Backend) │
│              Express.js                  │
│  - Controladores                         │
│  - Middlewares                           │
│  - Servicios de negocio                  │
│  - Validaciones                          │
└──────────────────┬──────────────────────┘
                   │ ORM/Query Builder
┌──────────────────▼──────────────────────┐
│     CAPA DE PERSISTENCIA (Database)     │
│          Base de Datos                   │
│  - Modelos de datos                      │
│  - Esquemas y relaciones                 │
│  - Procedimientos almacenados            │
└─────────────────────────────────────────┘
```

### 1.8 Componentes del Sistema

#### 1.8.1 Frontend (React)

**Tecnología**: React.js 18+

**Componentes principales**:
- **Módulo de Autenticación**: Login, registro, recuperación de contraseña
- **Módulo de Cliente**: Dashboard de cliente, búsqueda de propiedades, favoritos, gestión de citas
- **Módulo de Agente**: Dashboard de agente, CRUD de propiedades, gestión de citas, analytics
- **Módulo de Administrador**: Panel administrativo, gestión de agentes
- **Componentes compartidos**: Header, Footer, Sidebar, Cards, Modals, Forms

**Librerías adicionales**:
- React Router: Navegación y routing
- Axios: Cliente HTTP para consumo de APIs
- Redux/Context API: Gestión de estado global
- Chart.js/Recharts: Visualización de gráficas
- Material-UI/TailwindCSS: Framework de componentes UI

#### 1.8.2 Backend (Express.js)

**Tecnología**: Node.js + Express.js

**Componentes principales**:
- **Controladores**: Lógica de procesamiento de peticiones
- **Servicios**: Lógica de negocio reutilizable
- **Middlewares**: Autenticación, validación, manejo de errores
- **Rutas**: Definición de endpoints REST
- **Modelos**: Definición de esquemas de datos

**Módulos del backend**:
- Módulo de autenticación y autorización
- Módulo de gestión de usuarios
- Módulo de gestión de propiedades
- Módulo de gestión de citas
- Módulo de analytics y reportes

#### 1.8.3 Base de Datos

**Componentes**:
- **Tablas principales**:
  - Usuarios (clientes, agentes, administradores)
  - Propiedades
  - Tipos de inmuebles
  - Citas
  - Favoritos
  - Fotografías

**Características**:
- Normalización de datos hasta 3FN
- Índices en campos de búsqueda frecuente
- Constraints para integridad referencial
- Triggers para auditoría (opcional)

### 1.9 Patrones de Diseño Implementados

#### 1.9.1 Singleton (Base de Datos)

**Propósito**: Garantizar una única instancia de conexión a la base de datos durante el ciclo de vida de la aplicación.

**Implementación**: 
- Se crea una clase DatabaseConnection que gestiona la conexión
- El patrón asegura que solo exista una conexión activa
- Evita problemas de múltiples conexiones y mejora el rendimiento

**Beneficios**:
- Control centralizado de la conexión
- Optimización de recursos
- Facilita el manejo de pool de conexiones

#### 1.9.2 Chain of Responsibility (Middlewares)

**Propósito**: Procesar peticiones HTTP a través de una cadena de middlewares de forma secuencial.

**Implementación**:
- Middlewares de autenticación (verificación de JWT)
- Middlewares de autorización (validación de roles)
- Middlewares de validación de datos
- Middlewares de manejo de errores
- Middlewares de logging

**Beneficios**:
- Separación de responsabilidades
- Código modular y reutilizable
- Fácil de extender y mantener

#### 1.9.3 Adapter

**Propósito**: Adaptar interfaces incompatibles entre diferentes componentes del sistema.

**Implementación**:
- Adaptadores para diferentes fuentes de datos
- Adaptadores para servicios externos (APIs de terceros)
- Adaptadores para diferentes formatos de respuesta

**Beneficios**:
- Desacoplamiento de componentes
- Facilita integración con sistemas externos
- Permite cambiar implementaciones sin afectar el resto del sistema

### 1.10 Stack Tecnológico

#### Frontend
- **Framework**: React.js 18+
- **Lenguaje**: JavaScript (ES6+)
- **Gestor de paquetes**: npm
- **Build tool**: Vite
- **Estilos**: TailwindCSS

#### Backend
- **Runtime**: Node.js (LTS)
- **Framework**: Express.js 4+
- **Lenguaje**: JavaScript (ES6+)
- **ORM**: Sequelize 

#### Base de Datos
- **Opción SQL**: PostgreSQL

#### DevOps y Herramientas
- **Control de versiones**: Git / GitHub
- **Estrategia de branching**: Git Flow
- **Containerización**: Docker 

---

## 2. Diagramas de Casos de Uso

Esta sección presenta los diagramas de casos de uso del sistema HomeFinder Pro, organizados desde el nivel más alto de abstracción hasta el detalle de cada caso de uso expandido.

### 2.1 Diagrama de Casos de Uso de Alto Nivel (High-Level)

El diagrama de alto nivel presenta una vista general del sistema, mostrando los principales actores y la funcionalidad principal que ofrece la plataforma:

**Actores principales**:
- **Cliente**: Usuario final que busca propiedades
- **Agente Inmobiliario**: Profesional que gestiona propiedades
- **Administrador**: Usuario con privilegios administrativos

**Casos de uso principales**:
- **CDU001**: Gestión de Propiedades
- **CDU002**: Gestión de Citas
- **CDU003**: Gestión de Usuarios/Agentes
- **CDU004**: Gestión de Perfil y Búsqueda
- **CDU005**: Autenticación y Autorización

Este nivel de abstracción permite comprender rápidamente el alcance funcional del sistema y las interacciones principales entre actores y funcionalidades.

### 2.2 Descomposición de Casos de Uso

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

### 2.3 Especificación Detallada de Casos de Uso

A continuación se presenta la especificación detallada de cada caso de uso expandido.

---

#### 2.3.1 CDU001 - Gestión de Propiedades Inmobiliarias

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
| **Flujos Alternos** | **FA1: Crear Propiedad (CDU001.1)**<br>1. El Agente selecciona "Nueva Propiedad".<br>2. Ingresa datos y fotos.<br>3. Sistema valida y guarda.<br><br>**FA2: Actualizar Propiedad (CDU001.2)**<br>1. El Agente selecciona una propiedad existente.<br>2. Modifica los datos necesarios.<br>3. Sistema valida y actualiza.<br><br>**FA3: Eliminar Propiedad (CDU001.3)**<br>1. El Agente selecciona eliminar propiedad.<br>2. Sistema solicita confirmación.<br>3. Sistema elimina la propiedad.<br><br>**FA4: Consultar Estadísticas (CDU001.4)**<br>1. El Agente selecciona ver dashboard.<br>2. Sistema muestra Top 3 inmuebles y Top 5 zonas.<br><br>**FA5: Gestión de Tipos (CDU001.5)**<br>1. El Agente accede al catálogo de tipos.<br>2. Puede crear (CDU001.6), actualizar (CDU001.8) o eliminar (CDU001.7) tipos de inmueble (Casa, Apto, etc.).<br><br>**FA6: Visualizar Propiedades (CDU001.9)**<br>1. El Agente visualiza el listado completo de sus propiedades.<br>2. Sistema muestra información resumida de cada propiedad. |

---

#### 2.3.2 CDU002 - Solicitud y Negociación de Citas

![Diagrama CDU002](imgs/CDU002.png)

| Campo | Descripción |
|-------|-------------|
| **Nombre** | Solicitud y Negociación de Citas |
| **Código** | CDU002 |
| **Actores** | Cliente (Iniciador), Agente Inmobiliario |
| **Descripción** | Gestiona el flujo de agendamiento de visitas, permitiendo al cliente solicitar una hora, y al agente aceptar o proponer una contraoferta. |
| **Precondiciones** | El Cliente debe estar registrado. La propiedad debe estar disponible. |
| **Post Condiciones** | La cita queda en estado "Confirmada", "Rechazada" o "Pendiente". |
| **Flujo Principal** | 1. El Cliente solicita una cita (CDU002.0).<br>2. El Sistema notifica al Agente.<br>3. El Agente revisa la solicitud.<br>4. El Agente acepta el horario (CDU002.2).<br>5. El Sistema confirma la cita. |
| **Flujos Alternos** | **FA1: Proponer Nuevo Horario (CDU002.1)**<br>1. El Agente rechaza la hora inicial y propone una nueva.<br>2. El Cliente recibe la propuesta.<br>3. El Cliente Acepta o Rechaza (CDU002.2).<br><br>**FA2: Cliente Rechaza Horario Propuesto**<br>1. El Cliente rechaza el horario propuesto por el agente.<br>2. El Sistema solicita al cliente ingresar un motivo.<br>3. El Sistema notifica al agente con el motivo del rechazo.<br>4. El agente puede visualizar el motivo y proponer un nuevo horario. |

---

#### 2.3.3 CDU003 - Gestión de Usuarios/Agentes

![Diagrama CDU003](imgs/CDU003.png)

| Campo | Descripción |
|-------|-------------|
| **Nombre** | Gestión de Usuarios/Agentes |
| **Código** | CDU003 |
| **Actores** | Agente Inmobiliario (como administrador o usuario con permisos administrativos) |
| **Descripción** | Permite la administración completa de agentes inmobiliarios en el sistema, incluyendo la creación, visualización, actualización y eliminación de cuentas de agentes. |
| **Precondiciones** | El actor debe tener permisos administrativos y haber iniciado sesión (CDU005). |
| **Post Condiciones** | El catálogo de agentes queda actualizado en la base de datos. Los agentes pueden ser activados o desactivados según corresponda. |
| **Flujo Principal** | 1. El Administrador accede al módulo de Gestión de Agentes (CDU003.1).<br>2. El Sistema muestra el listado de agentes registrados (CDU003.0).<br>3. El Administrador visualiza la información de los agentes.<br>4. El Administrador finaliza la gestión. |
| **Flujos Alternos** | **FA1: Crear Agente (CDU003.2)**<br>1. El Administrador selecciona "Nuevo Agente".<br>2. Ingresa los datos del agente (nombre, correo, teléfono, etc.).<br>3. Sistema valida y crea la cuenta.<br>4. Sistema envía credenciales al agente.<br><br>**FA2: Actualizar Agente (CDU003.3)**<br>1. El Administrador selecciona un agente existente.<br>2. Modifica los datos necesarios.<br>3. Sistema valida y actualiza la información.<br><br>**FA3: Eliminar/Desactivar Agente (CDU003.4)**<br>1. El Administrador selecciona eliminar o desactivar agente.<br>2. Sistema solicita confirmación.<br>3. Sistema marca la cuenta como inactiva o la elimina según política establecida. |

---

#### 2.3.4 CDU004 - Gestión de Perfil y Búsqueda

![Diagrama CDU004](imgs/CDU004.png)

| Campo | Descripción |
|-------|-------------|
| **Nombre** | Gestión de Perfil y Búsqueda |
| **Código** | CDU004 |
| **Actores** | Cliente |
| **Descripción** | Permite al cliente gestionar su información personal y realizar búsquedas avanzadas de propiedades utilizando múltiples filtros para encontrar inmuebles que se ajusten a sus necesidades. |
| **Precondiciones** | El Cliente debe haber iniciado sesión (CDU005). |
| **Post Condiciones** | La información del perfil del cliente queda actualizada en la base de datos. El historial de búsquedas se registra para análisis. |
| **Flujo Principal** | 1. El Cliente accede a su perfil o módulo de búsqueda.<br>2. El Sistema muestra las opciones disponibles.<br>3. El Cliente selecciona Visualizar Propiedades (CDU004.0) o Gestionar Perfil (CDU004.3).<br>4. El Sistema procesa la solicitud. |
| **Flujos Alternos** | **FA1: Filtrar Propiedades (CDU004.1)**<br>1. El Cliente selecciona "Buscar Propiedades".<br>2. El Sistema muestra opciones de filtrado (tipo de inmueble, precio, ubicación, habitaciones, etc.).<br>3. El Cliente aplica los filtros deseados.<br>4. El Sistema muestra los resultados filtrados.<br>5. El Cliente puede agregar propiedades a favoritos.<br><br>**FA2: Editar Información Personal (CDU004.2)**<br>1. El Cliente selecciona "Editar Perfil".<br>2. Modifica sus datos personales (nombre, correo, teléfono, fotografía).<br>3. Sistema valida los cambios.<br>4. Sistema actualiza la información del perfil.<br><br>**FA3: Visualizar Propiedades (CDU004.0)**<br>1. El Cliente visualiza el catálogo completo de propiedades disponibles.<br>2. Sistema muestra información resumida de cada propiedad.<br>3. El Cliente puede seleccionar una propiedad para ver detalles completos. |

---

## 3. Requerimientos del Sistema

Esta sección documenta los requerimientos funcionales y no funcionales que debe cumplir el sistema HomeFinder Pro.

### 3.1 Requerimientos Funcionales

Los requerimientos funcionales describen las funcionalidades específicas que debe proporcionar el sistema a sus usuarios.

| Código | Requerimiento | Descripción |
|--------|---------------|-------------|
| **Módulo de Autenticación** | | |
| **RF-01** | Inicio de Sesión | El sistema debe permitir el ingreso de Clientes, Agentes y Administradores utilizando su correo electrónico y contraseña. |
| **Módulo de Cliente** | | |
| **RF-02** | Registro de Clientes | El sistema debe permitir registrar nuevos clientes solicitando: Nombre completo, Correo electrónico (único), Contraseña y Fotografía (opcional). |
| **RF-03** | Gestión de Perfil | El cliente debe poder visualizar y actualizar sus datos personales registrados en el sistema. |
| **RF-04** | Búsqueda de Propiedades | El sistema debe permitir al cliente buscar propiedades y visualizarlas para evaluar sus características. |
| **RF-05** | Solicitud de Citas | El cliente debe poder solicitar una cita para visitar una propiedad específica. |
| **RF-06** | Aceptación/Rechazo de Horario | El cliente debe poder aceptar o rechazar la propuesta de horario enviada por el agente. En caso de rechazo, puede indicar el motivo. |
| **Módulo de Agente Inmobiliario** | | |
| **RF-07** | Gestión de Propiedades | El agente debe poder registrar, actualizar y dar mantenimiento a las propiedades, incluyendo datos como: Título, Dirección, Precio, Descripción, Fotos, Habitaciones, Baños y Metros Cuadrados. |
| **RF-08** | Gestión de Tipos de Inmueble | El sistema debe permitir al agente gestionar un catálogo de tipos de inmuebles. |
| **RF-09** | Dashboard de Propiedades | El agente debe poder visualizar un tablero con sus propiedades asignadas y filtrarlas por tipo, precio o características. |
| **RF-10** | Visualización de Estadísticas | El sistema debe generar gráficas para el agente mostrando el "Top 3 de Tipos de Inmuebles más buscados" y el "Top 5 Zonas con mayor oferta". |
| **RF-11** | Gestión de Citas | El agente debe poder visualizar las solicitudes de citas y proponer un horario de visita para que el cliente lo apruebe. |
| **Módulo de Administrador** | | |
| **RF-12** | Gestión de Agentes | El administrador debe poder crear, actualizar y eliminar las cuentas de los agentes inmobiliarios en el sistema. |

### 3.2 Requerimientos No Funcionales

Los requerimientos no funcionales especifican criterios que pueden usarse para juzgar la operación del sistema, en lugar de comportamientos específicos.

| Código | Requerimiento | Descripción |
|--------|---------------|-------------|
| **Restricciones Técnicas** | | |
| **RNF-01** | Arquitectura del Sistema | La solución debe ser una aplicación web que implemente Frontend, Backend y persistencia de datos en base de datos, utilizando un framework y patrón de diseño. |
| **RNF-02** | Control de Versiones | El desarrollo debe seguir la estrategia de branching "Git-flow", utilizando ramas main, develop y feature. |
| **RNF-03** | Formato de Commits | Todo commit en el repositorio debe seguir estrictamente el formato "#carnet: mensaje". |
| **RNF-04** | Documentación | Toda la documentación del proyecto debe entregarse en formato Markdown dentro del repositorio de GitHub. |
| **RNF-05** | Persistencia de Datos | El sistema debe garantizar la integridad de la información almacenada mediante una base de datos relacional. |

### 3.3 Matriz de Trazabilidad de Requerimientos

La matriz de trazabilidad relaciona los requerimientos funcionales con los casos de uso que los implementan, facilitando el seguimiento y verificación de la cobertura completa de requisitos.

| Código RF | Requerimiento | CDU001 | CDU002 | CDU003 | CDU004 | CDU005 | Prioridad | Estado |
|-----------|---------------|--------|--------|--------|--------|--------|-----------|--------|
| **RF-01** | Inicio de Sesión | | | | | ✓ | Alta | Implementado |
| **RF-02** | Registro de Clientes | | | | ✓ | | Alta | Implementado |
| **RF-03** | Gestión de Perfil | | | | ✓ | | Media | Implementado |
| **RF-04** | Búsqueda de Propiedades | | | | ✓ | | Alta | Implementado |
| **RF-05** | Solicitud de Citas | | ✓ | | | | Alta | Implementado |
| **RF-06** | Aceptación/Rechazo de Horario | | ✓ | | | | Alta | Implementado |
| **RF-07** | Gestión de Propiedades | ✓ | | | | | Alta | Implementado |
| **RF-08** | Gestión de Tipos de Inmueble | ✓ | | | | | Media | Implementado |
| **RF-09** | Dashboard de Propiedades | ✓ | | | | | Media | Implementado |
| **RF-10** | Visualización de Estadísticas | ✓ | | | | | Media | Implementado |
| **RF-11** | Gestión de Citas | | ✓ | | | | Alta | Implementado |
| **RF-12** | Gestión de Agentes | | | ✓ | | | Alta | Implementado |

**Leyenda**:
- ✓: El caso de uso implementa directamente el requerimiento funcional
- **Prioridad**: Alta, Media, Baja - indica la importancia del requerimiento para el funcionamiento del sistema
- **Estado**: Implementado, En Desarrollo, Pendiente - indica el estado actual del desarrollo

**Resumen de cobertura por módulo**:

| Módulo | Requerimientos | CDU Principal |
|--------|----------------|---------------|
| Autenticación | 1 (RF-01) | CDU005 
| Cliente | 4 (RF-02 a RF-06) | CDU004, CDU002 
| Agente Inmobiliario | 5 (RF-07 a RF-11) | CDU001, CDU002 
| Administrador | 1 (RF-12) | CDU003 

**Análisis de cobertura**:
- **Total de requerimientos funcionales**: 12
- **Requerimientos implementados**: 12
- **Casos de uso totales**: 5 (CDU001, CDU002, CDU003, CDU004, CDU005)

**Cumplimiento de requerimientos no funcionales**:

| Código RNF | Requerimiento | Estado de Cumplimiento | Evidencia |
|------------|---------------|------------------------|-----------|
| **RNF-01** | Arquitectura del Sistema | ✓ Cumplido | Arquitectura MVC implementada con React (Frontend), Express.js (Backend) y Base de Datos (Persistencia) |
| **RNF-02** | Control de Versiones | ✓ Cumplido | Estrategia Git-flow configurada en repositorio con ramas main, develop y feature |
| **RNF-03** | Formato de Commits | ✓ Cumplido | Commits siguen formato #carnet: mensaje |
| **RNF-04** | Documentación | ✓ Cumplido | Manual técnico y documentación en formato Markdown en repositorio GitHub |
| **RNF-05** | Persistencia de Datos | ✓ Cumplido | Base de datos relacional implementada con modelo E-R |

---

## 4. Diagramas de Secuencia

Los diagramas de secuencia muestran la interacción entre objetos en orden secuencial, representando cómo se comunican los diferentes componentes del sistema para ejecutar las funcionalidades principales.

### 4.1 Descripción General

Los diagramas de secuencia del sistema HomeFinder Pro documentan los flujos de interacción más importantes entre los actores (Clientes, Agentes, Administradores) y los componentes del sistema (Frontend, Backend, Base de Datos).

### 4.2 Diagramas Disponibles

El sistema cuenta con los siguientes diagramas de secuencia que detallan los procesos principales:

#### 4.2.1 Publicación de Propiedad

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

#### 4.2.2 Negociación de Cita

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


### 4.3 Convenciones Utilizadas

Los diagramas de secuencia siguen las siguientes convenciones UML:

- **Actores**: Representados con iconos de persona
- **Sistemas/Componentes**: Representados con rectángulos
- **Mensajes síncronos**: Flechas con línea sólida
- **Mensajes asíncronos**: Flechas con línea punteada
- **Activación**: Rectángulos verticales en la línea de vida
- **Retorno**: Líneas punteadas con flecha

### 4.4 Relación con Casos de Uso

Los diagramas de secuencia complementan la especificación de casos de uso, mostrando el detalle temporal de las interacciones:

| Diagrama de Secuencia | Casos de Uso Relacionados | Descripción de la Relación |
|----------------------|---------------------------|----------------------------|
| Publicación de Propiedad | CDU001.1 (Crear Propiedad) | Detalla el flujo temporal de creación de una propiedad |
| Negociación de Cita | CDU002.0, CDU002.1, CDU002.2 | Muestra la secuencia completa de solicitud, propuesta y aceptación/rechazo de citas |

---

