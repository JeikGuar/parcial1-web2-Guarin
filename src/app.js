import express from 'express';
import libroRoutes from './routes/libro.routes.js';
import { manejadorErrores } from './middlewares/errores.js';

const app = express();

app.use(express.json());

app.use('/api/libros', libroRoutes);

// Manejo de rutas inexistentes (404 en JSON para cumplir con Criterio de Calidad)
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use(manejadorErrores);

export default app;