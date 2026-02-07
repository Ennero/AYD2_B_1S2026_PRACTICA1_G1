# Instrucciones para ejecutar la seed de la base de datos

## Resumen de la Seed

La seed creada incluye:
- **1 Administrador**: admin@homefinder.com (contraseña: Admin123!)
- **6 Agentes inmobiliarios**: con correos @homefinder.com (contraseña: Agent123!)
- **20 Clientes**: con correos @gmail.com (contraseña: Client123!)
- **35+ Propiedades**: de diferentes tipos (Casa, Apartamento, Terreno, Local Comercial)
- **30+ Favoritos**: relaciones entre clientes y propiedades favoritas
- **80+ Registros de visitas**: historial de propiedades vistas por clientes
- **40+ Invitaciones**: con diferentes estados (Pendiente, Aceptado, Rechazado, Confirmado)

## Datos importantes

### Credenciales de acceso:
- **Admin**: admin@homefinder.com / Admin123!
- **Agentes**: maria.lopez@homefinder.com, juan.perez@homefinder.com, etc. / Agent123!
- **Clientes**: sofia.gomez@gmail.com, pedro.sanchez@gmail.com, etc. / Client123!

### Tipos de propiedades (PropertyType):
- HOUSE (Casa)
- APARTMENT (Apartamento)
- LAND (Terreno)
- RETAIL SPACE (Local Comercial)

### Estados de propiedades (PropertyState):
- AVAILABLE (Disponible)
- NOT AVAILABLE (No disponible)
- SOLD (Vendido)

### Estados de invitaciones (InvitationState):
- PENDING (Pendiente)
- ACCEPTED (Aceptado)
- REJECTED (Rechazado)
- ACKNOWLEDGE (Confirmado)

## Pasos para ejecutar la seed

### 1. Iniciar Docker Desktop
Asegúrate de que Docker Desktop esté corriendo en tu sistema Windows.

### 2. Levantar el contenedor de PostgreSQL
```bash
docker-compose up -d
```

### 3. Generar el cliente de Prisma
```bash
npm run db:generate
```

### 4. Ejecutar las migraciones (si es necesario)
```bash
npm run db:migrate
```

### 5. Ejecutar la seed
```bash
npm run db:seed
```

### O ejecutar todo de una vez:
```bash
npm run db:setup
```

## Verificar la seed

Una vez ejecutada la seed, puedes verificar los datos usando:

1. **Prisma Studio**:
```bash
npx prisma studio
```

2. **Cliente de PostgreSQL**:
```bash
docker exec -it server-postgres-db-1 psql -U postgres -d ptdb
```

Luego ejecuta queries SQL:
```sql
SELECT COUNT(*) FROM "USER" WHERE type='CLIENT';
SELECT COUNT(*) FROM property;
SELECT COUNT(*) FROM invitation;
```

## Notas importantes

- Las fechas de creación están distribuidas entre el 1 de enero y el 6 de febrero de 2026
- Las URLs de imágenes son de servicios reales (Unsplash, Pravatar) que retornan imágenes válidas
- Los datos son coherentes: las invitaciones solo se crean para propiedades disponibles
- Los precios están en formato realista con dos decimales
- Las zonas van del 1 al 35 representando diferentes áreas
- Todas las contraseñas están hasheadas con bcrypt

## Troubleshooting

### Error: Cannot find module '@prisma/adapter-pg'
Solución: Ejecuta `npm install` para instalar todas las dependencias.

### Error: Docker no está corriendo
Solución: Inicia Docker Desktop antes de ejecutar docker-compose.

### Error: Database connection failed
Solución: Verifica que el contenedor de PostgreSQL esté corriendo con `docker ps` y que las credenciales en `.env` sean correctas.

### Limpiar y volver a ejecutar
Si necesitas limpiar la base de datos y volver a ejecutar la seed:
```bash
docker-compose down -v
docker-compose up -d
npm run db:setup
```
