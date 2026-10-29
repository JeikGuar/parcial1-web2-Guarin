import { prisma } from '../db.js';
import { noEncontrado, conflicto } from '../errores.js';

export const obtenerLibros = async ({ buscar, disponibles, pagina = 1, porPagina = 10 }) => {
  const where = {};

  if (buscar) {
    where.OR = [
      { titulo: { contains: buscar, mode: 'insensitive' } },
      { autor: { contains: buscar, mode: 'insensitive' } },
    ];
  }

  if (disponibles === 'true' || disponibles === true) {
    where.ejemplaresDisponibles = { gt: 0 };
  }

  const offset = (pagina - 1) * porPagina;

  const [datos, total] = await Promise.all([
    prisma.libro.findMany({
      where,
      orderBy: { titulo: 'asc' },
      skip: offset,
      take: porPagina,
    }),
    prisma.libro.count({ where }),
  ]);

  const totalPaginas = Math.ceil(total / porPagina) || 1;

  return {
    datos,
    paginacion: {
      pagina,
      porPagina,
      total,
      totalPaginas,
    },
  };
};

export const obtenerLibroPorId = async (id) => {
  const libro = await prisma.libro.findUnique({
    where: { id },
  });

  if (!libro) {
    throw noEncontrado('Libro no encontrado');
  }

  return libro;
};

export const crearLibro = async ({ titulo, autor, isbn, ejemplares }) => {
  const existeIsbn = await prisma.libro.findUnique({
    where: { isbn },
  });

  if (existeIsbn) {
    throw conflicto('El ISBN ya se encuentra registrado');
  }

  return await prisma.libro.create({
    data: {
      titulo,
      autor,
      isbn,
      ejemplaresTotales: ejemplares,
      ejemplaresDisponibles: ejemplares,
    },
  });
};