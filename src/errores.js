export class AppError extends Error {
  constructor(mensaje, statusCode) {
    super(mensaje);
    this.statusCode = statusCode;
  }
}

export const noEncontrado = (mensaje = 'Recurso no encontrado') => new AppError(mensaje, 404);
export const conflicto = (mensaje = 'Conflicto de recurso') => new AppError(mensaje, 409);