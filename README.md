# Parcial 1 - Web 2

## Comandos para correr el proyecto
1. Levantar la base de datos: `docker run --name biblioteca-db -e POSTGRES_USER=biblio -e POSTGRES_PASSWORD=secreto123 -e POSTGRES_DB=biblioteca -p 5433:5432 -d postgres:16`
2. Instalar dependencias: `npm install`
3. Correr migraciones y seed: `npx prisma migrate reset` / `npx prisma db seed`
4. Iniciar el servidor: `node src/server.js`