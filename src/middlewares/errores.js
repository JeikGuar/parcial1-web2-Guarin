export const manejadorErrores = (err, req, res, next) => {
  console.error(err); // Muestra el detalle del error en la terminal
  const status = err.statusCode || 500;
  const mensaje = err.message || 'Error interno del servidor';
  res.status(status).json({ error: mensaje });
};