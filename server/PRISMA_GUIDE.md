# 📖 Guía de Prisma - HomeFinder Pro

## ¿Qué es Prisma?

**Prisma** es un ORM (Object-Relational Mapping) de próxima generación para Node.js y TypeScript. Es una capa de abstracción entre tu aplicación y la base de datos que permite interactuar con la base de datos usando objetos JavaScript/TypeScript en lugar de escribir SQL directamente.

## ¿Por qué usamos Prisma en este proyecto?

### 1. **Type Safety (Seguridad de Tipos)**
Prisma genera automáticamente tipos TypeScript basados en tu schema de base de datos. Esto significa que obtienes:
- ✅ Autocompletado inteligente en tu IDE
- ✅ Detección de errores en tiempo de compilación
- ✅ Refactorización segura
- ✅ Menos bugs en producción

```typescript
// ❌ Sin Prisma - prone a errores
const user = await db.query('SELECT * FROM user WHERE id = ?', [userId])
console.log(user.emial) // Error de tipeo, no detectado

// ✅ Con Prisma - type-safe
const user = await DB.uSER.findUnique({ where: { id_user: userId } })
console.log(user.email) // Autocompletado y validación de tipos
```

### 2. **Migraciones Versionadas**
Prisma gestiona automáticamente los cambios del schema de la base de datos:
- Crea scripts SQL automáticamente
- Mantiene un historial de cambios
- Permite rollbacks seguros
- Sincroniza el schema entre desarrollo y producción

### 3. **Developer Experience (Experiencia de Desarrollo)**
- Queries intuitivas y legibles
- Menos código boilerplate
- Prisma Studio para visualizar datos
- Documentación integrada

### 4. **Prevención de SQL Injection**
Todos los queries están parametrizados automáticamente, protegiéndote de ataques de inyección SQL.

## Componentes de Prisma en el Proyecto

### 1. Schema de Prisma (`prisma/schema.prisma`)

Es el archivo central que define:
- **Configuración de la base de datos**
- **Modelos de datos** (tablas)
- **Relaciones entre modelos**
- **Índices y constraints**

```prisma
// Configuración del generador
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}

// Configuración de la base de datos
datasource db {
  provider = "postgresql"
}

// Modelo de datos
model USER {
  id_user    Int       @id @default(autoincrement())
  email      String    @unique @db.VarChar(30)
  password   String    @db.VarChar(255)
  name       String    @db.VarChar(30)
  last_name  String    @db.VarChar(30)
  type       String    @db.VarChar(30)
  created_at DateTime  @db.Timestamp(6)
  
  // Relaciones
  property   property[]
  favorite   favorite[]
}

model property {
  id_property   Int      @id @default(autoincrement())
  title         String   @db.VarChar(50)
  price         Decimal  @db.Decimal(10, 2)
  id_agent      Int
  
  // Relación con USER
  USER          USER     @relation(fields: [id_agent], references: [id_user])
}
```

### 2. Migraciones (`prisma/migrations/`)

Cada vez que modificas el schema, Prisma genera una migración:

```bash
npx prisma migrate dev --name add_price_field
```

Esto crea una carpeta con:
- **migration.sql**: Script SQL con los cambios
- **Timestamp**: Para mantener el orden de ejecución

Ejemplo de migración:

```sql
-- CreateTable
CREATE TABLE "property" (
    "id_property" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    CONSTRAINT "property_pk" PRIMARY KEY ("id_property")
);

-- AddForeignKey
ALTER TABLE "property" ADD CONSTRAINT "property_user_fk" 
  FOREIGN KEY ("id_agent") REFERENCES "USER"("id_user");
```

### 3. Cliente de Prisma (`src/generated/prisma/`)

Prisma genera automáticamente un cliente TypeScript tipado:

```typescript
// src/db/db.ts
import { PrismaClient } from '../generated/prisma/client.ts'

const DB = new PrismaClient()
export default DB
```

### 4. Adapter para PostgreSQL (`@prisma/adapter-pg`)

En este proyecto usamos el **PrismaPg adapter** para conectar con PostgreSQL usando el driver `pg`:

```typescript
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)

const DB = new PrismaClient({ adapter })
```

**Ventajas del adapter:**
- Mejor rendimiento con pool de conexiones
- Compatible con conexiones serverless
- Más control sobre la configuración de PostgreSQL

## Operaciones CRUD con Prisma

### Create (Crear)

```typescript
// Crear un solo registro
const newUser = await DB.uSER.create({
  data: {
    email: 'user@example.com',
    password: hashedPassword,
    name: 'John',
    last_name: 'Doe',
    type: UserType.Client,
    gender: 1,
    phone: '12345678',
    created_at: new Date()
  }
})

// Crear múltiples registros
await DB.property.createMany({
  data: [
    { title: 'Casa 1', price: 100000, id_agent: 1 },
    { title: 'Casa 2', price: 200000, id_agent: 1 }
  ]
})
```

### Read (Leer)

```typescript
// Buscar un registro único
const user = await DB.uSER.findUnique({
  where: { id_user: 1 }
})

// Buscar múltiples registros con filtros
const properties = await DB.property.findMany({
  where: {
    price: { gte: 100000, lte: 500000 },
    state: PropertyState.Available,
    type: PropertyType.House
  },
  include: {
    image: true,  // Incluir imágenes relacionadas
    USER: {       // Incluir datos del agente
      select: { name: true, email: true }
    }
  },
  orderBy: { created_at: 'desc' },
  take: 10,  // Límite
  skip: 0    // Offset para paginación
})

// Buscar el primero que coincida
const firstAvailable = await DB.property.findFirst({
  where: { state: PropertyState.Available }
})

// Contar registros
const totalProperties = await DB.property.count({
  where: { state: PropertyState.Available }
})
```

### Update (Actualizar)

```typescript
// Actualizar un registro
const updatedUser = await DB.uSER.update({
  where: { id_user: 1 },
  data: { name: 'Updated Name' }
})

// Actualizar múltiples registros
await DB.property.updateMany({
  where: { state: PropertyState.NotAvailable },
  data: { state: PropertyState.Available }
})
```

### Delete (Eliminar)

```typescript
// Eliminar un registro
await DB.uSER.delete({
  where: { id_user: 1 }
})

// Eliminar múltiples registros
await DB.favorite.deleteMany({
  where: { id_client: 1 }
})

// Eliminar todos los registros de una tabla
await DB.record.deleteMany()
```

## Relaciones en Prisma

### One-to-Many (Uno a Muchos)

Un agente puede tener muchas propiedades:

```prisma
model USER {
  id_user  Int        @id
  property property[]  // Array de propiedades
}

model property {
  id_property Int  @id
  id_agent    Int
  USER        USER @relation(fields: [id_agent], references: [id_user])
}
```

Usar la relación:

```typescript
// Obtener agente con sus propiedades
const agent = await DB.uSER.findUnique({
  where: { id_user: 1 },
  include: { property: true }
})

console.log(agent.property) // Array de propiedades del agente
```

### Many-to-Many (Muchos a Muchos)

Clientes pueden tener muchas propiedades favoritas, y propiedades pueden ser favoritas de muchos clientes:

```prisma
model favorite {
  id_favorite Int      @id
  id_client   Int
  id_property Int
  USER        USER     @relation(fields: [id_client], references: [id_user])
  property    property @relation(fields: [id_property], references: [id_property])
}
```

Usar la relación:

```typescript
// Obtener cliente con sus favoritos
const client = await DB.uSER.findUnique({
  where: { id_user: 1 },
  include: {
    favorite: {
      include: { property: true }  // Nested include
    }
  }
})
```

## Queries Avanzadas

### Filtros Complejos

```typescript
// AND, OR, NOT
const properties = await DB.property.findMany({
  where: {
    OR: [
      { price: { lte: 500000 } },
      { zone: { in: [1, 10, 14] } }
    ],
    AND: [
      { state: PropertyState.Available },
      { num_rooms: { gte: 3 } }
    ],
    NOT: {
      type: PropertyType.Land
    }
  }
})
```

### Aggregaciones

```typescript
// Contar, sumar, promediar
const stats = await DB.property.aggregate({
  where: { state: PropertyState.Available },
  _count: { id_property: true },
  _avg: { price: true },
  _max: { price: true },
  _min: { price: true }
})

console.log(stats._avg.price) // Precio promedio
```

### Group By

```typescript
// Agrupar por zona
const byZone = await DB.property.groupBy({
  by: ['zone'],
  _count: { id_property: true },
  orderBy: { _count: { id_property: 'desc' } }
})

// Top 5 zonas con más propiedades
const top5Zones = byZone.slice(0, 5)
```

## Transacciones

Para operaciones que deben ejecutarse juntas:

```typescript
// Transacción simple
await DB.$transaction([
  DB.property.create({ data: propertyData }),
  DB.image.createMany({ data: imagesData })
])

// Transacción interactiva
await DB.$transaction(async (prisma) => {
  const user = await prisma.uSER.create({ data: userData })
  await prisma.property.create({
    data: { ...propertyData, id_agent: user.id_user }
  })
})
```

## Raw SQL (cuando lo necesites)

```typescript
// Query SQL directo
const result = await DB.$queryRaw`
  SELECT zone, COUNT(*) as total
  FROM property
  WHERE state = ${PropertyState.Available}
  GROUP BY zone
  ORDER BY total DESC
  LIMIT 5
`

// Execute SQL (INSERT, UPDATE, DELETE)
await DB.$executeRaw`
  UPDATE property 
  SET price = price * 1.10 
  WHERE zone = ${1}
`
```

## Prisma Studio - GUI para Datos

Prisma incluye una interfaz gráfica para visualizar y editar datos:

```bash
npx prisma studio
```

Esto abre http://localhost:5555 donde puedes:
- ✅ Ver todas las tablas y datos
- ✅ Filtrar y buscar registros
- ✅ Editar datos directamente
- ✅ Ver relaciones visuales

## Workflow de Desarrollo

### 1. Modificar el Schema

Edita `prisma/schema.prisma`:

```prisma
model property {
  // ... campos existentes
  featured Boolean @default(false)  // Nuevo campo
}
```

### 2. Crear Migración

```bash
npx prisma migrate dev --name add_featured_field
```

Esto:
- Genera el SQL
- Aplica la migración a la BD
- Regenera el cliente Prisma

### 3. Usar el Nuevo Campo

```typescript
const featured = await DB.property.findMany({
  where: { featured: true }
})
```

## Mejores Prácticas

### ✅ DO (Hacer)

- Siempre usa migraciones para cambios de schema
- Incluye solo los datos que necesitas con `select` e `include`
- Usa transacciones para operaciones relacionadas
- Aprovecha el tipado automático
- Usa Prisma Studio para debugging

### ❌ DON'T (No Hacer)

- No modifiques la BD manualmente (usa migraciones)
- No uses `select: *` cuando solo necesitas algunos campos
- No olvides manejar errores (try/catch)
- No expongas Prisma Client directamente en endpoints API
- No ignores las validaciones de tipos

## Recursos y Documentación

- **Documentación oficial**: https://www.prisma.io/docs
- **Prisma Schema Reference**: https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference
- **Prisma Client API**: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference

## Conclusión

Prisma es el corazón de la capa de datos en HomeFinder Pro. Nos permite:
- 🚀 Desarrollar más rápido con menos errores
- 🔒 Mantener la integridad de datos
- 📚 Tener código más legible y mantenible
- 🔄 Gestionar cambios de schema de forma segura

¡Aprovecha todas estas características para construir una API robusta y escalable! 💪
