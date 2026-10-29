export const manejadorErrores = (err, req, res, next) => {
  // Manejo de errores de concurrencia de Prisma
  if (err.code === 'P2034') {
    return res.status(409).json({ error: 'No hay ejemplares disponibles' });
  }

  const status = err.statusCode || 500;
  const mensaje = err.message || 'Error interno del servidor';
  res.status(status).json({ error: mensaje });
};