FROM node:24-alpine

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar el resto del código
COPY . .

# Generar el cliente de Prisma
RUN npx prisma generate

# Exponer el puerto
EXPOSE 3000

# El script de inicio se encargará de las migraciones y seed
CMD ["sh", "-c", "npm run db:migrate && npm run db:seed && npm run dev"]
