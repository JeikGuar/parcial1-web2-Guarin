import { Router } from 'express';
import { query, param, body } from 'express-validator';
import { validar } from '../middlewares/validar.js';
import * as libroController from '../controllers/libro.controller.js';

const router = Router();

// L1 · GET /api/libros
router.get(
  '/',
  [
    query('disponibles').optional().isIn(['true', 'false']).withMessage('Debe ser true o false'),
    query('pagina').optional().isInt({ min: 1 }).withMessage('Debe ser un entero mayor o igual a 1'),
    query('porPagina').optional().isInt({ min: 1, max: 20 }).withMessage('Debe ser un entero de 1 a 20'),
    validar,
  ],
  libroController.listarLibros
);

// L2 · GET /api/libros/:id
router.get(
  '/:id',
  [
    param('id').isInt({ min: 1 }).withMessage('El ID debe ser un entero positivo'),
    validar,
  ],
  libroController.obtenerLibro
);

// L3 · POST /api/libros
router.post(
  '/',
  [
    body('titulo').notEmpty().withMessage('El título es obligatorio'),
    body('autor').notEmpty().withMessage('El autor es obligatorio'),
    body('isbn').notEmpty().withMessage('El ISBN es obligatorio'),
    body('ejemplares').isInt({ min: 1, max: 50 }).withMessage('Debe ser un entero de 1 a 50'),
    validar,
  ],
  libroController.crearLibro
);

export default router;