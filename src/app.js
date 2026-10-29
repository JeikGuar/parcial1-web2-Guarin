import express from 'express';
import libroRoutes from './routes/libro.routes.js';
import prestamoRoutes from './routes/prestamo.routes.js';
import socioRoutes from './routes/socio.routes.js';
import { manejadorErrores } from './middlewares/errores.js';

const app = express();

app.use(express.json());

app.use('/api/libros', libroRoutes);
app.use('/api/prestamos', prestamoRoutes);
app.use('/api/socios', socioRoutes);

// Manejo de rutas no existentes (404 en JSON)
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use(manejadorErrores);

export default app;