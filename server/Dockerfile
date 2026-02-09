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

# El comando se configura en docker-compose.yml
CMD ["npm", "run", "dev"]
