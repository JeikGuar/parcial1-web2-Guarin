import { Router } from 'express';
import { param, query } from 'express-validator';
import { validar } from '../middlewares/validar.js';
import * as prestamoController from '../controllers/prestamo.controller.js';

const router = Router();

// P3 · GET /api/socios/:id/prestamos
router.get(
  '/:id/prestamos',
  [
    param('id').isInt({ min: 1 }).withMessage('El ID debe ser un entero positivo'),
    query('estado').optional().isIn(['ACTIVO', 'DEVUELTO']).withMessage('Estado inválido'),
    validar,
  ],
  prestamoController.obtenerHistorial
);

export default router;