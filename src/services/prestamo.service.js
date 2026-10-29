import { prisma } from '../db.js';
import { noEncontrado, conflicto } from '../errores.js';

export const crearPrestamo = async ({ socioId, libroId }) => {
  try {
    return await prisma.$transaction(async (tx) => {
      // 1. Validar socio
      const socio = await tx.socio.findUnique({ where: { id: socioId } });
      if (!socio) throw noEncontrado('Socio no encontrado');

      // 2. Validar libro
      const libro = await tx.libro.findUnique({ where: { id: libroId } });
      if (!libro) throw noEncontrado('Libro no encontrado');

      // 3. Validar máximo 3 préstamos ACTIVOS
      const prestamosActivos = await tx.prestamo.count({
        where: { socioId, estado: 'ACTIVO' },
      });
      if (prestamosActivos >= 3) {
        throw conflicto('El socio ya tiene 3 préstamos activos');
      }

      // 4. Descontar ejemplar de forma atómica para evitar condición de carrera
      const libroActualizado = await tx.libro.updateMany({
        where: { id: libroId, ejemplaresDisponibles: { gt: 0 } },
        data: { ejemplaresDisponibles: { decrement: 1 } },
      });

      if (libroActualizado.count === 0) {
        throw conflicto('No hay ejemplares disponibles');
      }

      // 5. Crear préstamo con fecha limite a 14 días
      const hoy = new Date();
      const fechaLimite = new Date(hoy);
      fechaLimite.setDate(hoy.getDate() + 14);

      const prestamo = await tx.prestamo.create({
        data: {
          socioId,
          libroId,
          fechaLimite,
        },
        include: {
          libro: {
            select: { id: true, titulo: true },
          },
        },
      });

      return prestamo;
    });
  } catch (error) {
    // Si es un error controlado (ej. 404 Socio no encontrado, 409 Sofía tiene 3), re-lanzar
    if (error.statusCode) {
      throw error;
    }
    // Si es un error de concurrencia/transacción de la base de datos, mapear a 409
    throw conflicto('No hay ejemplares disponibles');
  }
};

export const devolverPrestamo = async (id) => {
  return await prisma.$transaction(async (tx) => {
    const prestamo = await tx.prestamo.findUnique({ where: { id } });
    if (!prestamo) throw noEncontrado('Préstamo no encontrado');
    if (prestamo.estado === 'DEVUELTO') throw conflicto('El préstamo ya está devuelto');

    await tx.libro.update({
      where: { id: prestamo.libroId },
      data: { ejemplaresDisponibles: { increment: 1 } },
    });

    const prestamoActualizado = await tx.prestamo.update({
      where: { id },
      data: {
        estado: 'DEVUELTO',
        fechaDevolucion: new Date(),
      },
    });

    return prestamoActualizado;
  });
};

export const obtenerHistorialSocio = async (socioId, estado) => {
  const socio = await prisma.socio.findUnique({ where: { id: socioId } });
  if (!socio) throw noEncontrado('Socio no encontrado');

  const where = { socioId };
  if (estado) {
    where.estado = estado;
  }

  return await prisma.prestamo.findMany({
    where,
    orderBy: { fechaPrestamo: 'desc' },
    include: {
      libro: {
        select: { id: true, titulo: true, autor: true },
      },
    },
  });
};