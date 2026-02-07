#!/bin/sh
set -e

echo "🔄 Waiting for PostgreSQL to be ready..."
until node -e "const pg = require('pg'); const client = new pg.Client(process.env.DATABASE_URL); client.connect().then(() => { console.log('✅ PostgreSQL is ready'); client.end(); }).catch(() => { console.log('⏳ Waiting...'); process.exit(1); })"; do
  sleep 2
done

echo "🔧 Running Prisma migrations..."
npx prisma migrate deploy

echo "🌱 Running database seed..."
npm run db:seed || echo "⚠️  Seed already populated or failed"

echo "🚀 Starting application..."
exec npm run dev
