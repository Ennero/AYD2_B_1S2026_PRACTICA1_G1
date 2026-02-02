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

