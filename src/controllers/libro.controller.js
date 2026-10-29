import * as libroService from '../services/libro.service.js';

export const listarLibros = async (req, res, next) => {
  try {
    const { buscar, disponibles, pagina, porPagina } = req.query;
    const resultado = await libroService.obtenerLibros({
      buscar,
      disponibles,
      pagina: pagina ? parseInt(pagina, 10) : 1,
      porPagina: porPagina ? parseInt(porPagina, 10) : 10,
    });
    res.json(resultado);
  } catch (error) {
    next(error);
  }
};

export const obtenerLibro = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const libro = await libroService.obtenerLibroPorId(id);
    res.json(libro);
  } catch (error) {
    next(error);
  }
};

export const crearLibro = async (req, res, next) => {
  try {
    const { titulo, autor, isbn, ejemplares } = req.body;
    const nuevoLibro = await libroService.crearLibro({
      titulo,
      autor,
      isbn,
      ejemplares: parseInt(ejemplares, 10),
    });
    res.status(201).json(nuevoLibro);
  } catch (error) {
    next(error);
  }
};