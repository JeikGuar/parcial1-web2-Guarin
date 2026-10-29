import { Router } from 'express';
import { body, param } from 'express-validator';
import { validar } from '../middlewares/validar.js';
import * as prestamoController from '../controllers/prestamo.controller.js';

const router = Router();

// P1 · POST /api/prestamos
router.post(
  '/',
  [
    body('socioId').isInt({ min: 1 }).withMessage('socioId debe ser un entero positivo'),
    body('libroId').isInt({ min: 1 }).withMessage('libroId debe ser un entero positivo'),
    validar,
  ],
  prestamoController.prestar
);

// P2 · PATCH /api/prestamos/:id/devolucion
router.patch(
  '/:id/devolucion',
  [
    param('id').isInt({ min: 1 }).withMessage('El ID debe ser un entero positivo'),
    validar,
  ],
  prestamoController.devolver
);

export default router;