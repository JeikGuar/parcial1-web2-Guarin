# Parcial 1 · Programación Web 2 - API de Préstamos de Biblioteca

API REST construida con Express 5, Prisma 7 y PostgreSQL 16 para la gestión de préstamos de la biblioteca universitaria.

## Requisitos Previos

* Node.js v22.18 o superior
* Docker Desktop

---

## Instrucciones para levantar el proyecto

### 1. Clonar e instalar dependencias

```bash
git clone https://github.com/JeikGuar/parcial1-web2-Guarin.git
cd parcial1-web2-Guarin
npm install
```

### 2. Configurar el archivo `.env`

Crea un archivo `.env` en la raíz con el siguiente contenido (basado en `.env.example`):

```env
PORT=4000
DATABASE_URL="postgresql://biblio:secreto123@localhost:5433/biblioteca"
```

### 3. Levantar la base de datos PostgreSQL en Docker

Ejecuta el contenedor de PostgreSQL en el puerto 5433:

```bash
docker run --name biblioteca-db -e POSTGRES_USER=biblio -e POSTGRES_PASSWORD=secreto123 -e POSTGRES_DB=biblioteca -p 5433:5432 -d postgres:16
```
*(Si el contenedor ya está creado en tu equipo, solo usa `docker start biblioteca-db`)*.

### 4. Ejecutar migraciones, generar cliente y sembrar datos

```bash
npx prisma migrate dev
npx prisma generate
npx prisma db seed
```

### 5. Iniciar el servidor

```bash
node src/server.js
```

El servidor estará activo en `http://localhost:4000`.

---

## Prueba de Concurrencia (Anexo)

Para verificar la resistencia a condiciones de carrera en peticiones simultáneas sobre el último ejemplar disponible:

1. Restablece la base de datos y ejecuta el seed:
   ```bash
   npx prisma migrate reset --force
   npx prisma db seed
   ```
2. Con el servidor encendido (`node src/server.js`), ejecuta en otra terminal:
   ```bash
   node carrera-biblioteca.mjs
   ```

*Resultado esperado: 1 aceptado (201), 9 rechazados (409) y 0 ejemplares disponibles*.

---

## Endpoints de la API

* **`GET /api/libros`**: Listar libros con filtros (`buscar`, `disponibles`), paginación (`pagina`, `porPagina`) y orden por título.
* **`GET /api/libros/:id`**: Consultar un libro por ID.
* **`POST /api/libros`**: Registrar un nuevo libro.
* **`POST /api/prestamos`**: Prestar un libro a un socio.
* **`PATCH /api/prestamos/:id/devolucion`**: Devolver un libro prestado.
* **`GET /api/socios/:id/prestamos`**: Consultar historial de un socio (`?estado=ACTIVO` o `DEVUELTO`).