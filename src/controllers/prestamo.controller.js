import * as prestamoService from '../services/prestamo.service.js';

export const prestar = async (req, res, next) => {
  try {
    const { socioId, libroId } = req.body;
    const nuevoPrestamo = await prestamoService.crearPrestamo({
      socioId: parseInt(socioId, 10),
      libroId: parseInt(libroId, 10),
    });
    res.status(201).json(nuevoPrestamo);
  } catch (error) {
    next(error);
  }
};

export const devolver = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const prestamoDevuelto = await prestamoService.devolverPrestamo(id);
    res.json(prestamoDevuelto);
  } catch (error) {
    next(error);
  }
};

export const obtenerHistorial = async (req, res, next) => {
  try {
    const socioId = parseInt(req.params.id, 10);
    const { estado } = req.query;
    const historial = await prestamoService.obtenerHistorialSocio(socioId, estado);
    res.json(historial);
  } catch (error) {
    next(error);
  }
};