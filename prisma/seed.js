import 'dotenv/config';
import { prisma } from '../src/db.js';

async function main() {
  await prisma.socio.createMany({
    data: [
      { id: 1, nombre: 'Laura Gómez', email: 'laura@ucaldas.edu.co' },
      { id: 2, nombre: 'Andrés Ríos', email: 'andres@ucaldas.edu.co' },
      { id: 3, nombre: 'Sofía Marín', email: 'sofia@ucaldas.edu.co' },
    ],
  });

  await prisma.libro.createMany({
    data: [
      { id: 1, titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', isbn: 'ISBN-001', ejemplaresTotales: 3, ejemplaresDisponibles: 3 },
      { id: 2, titulo: 'El amor en los tiempos del cólera', autor: 'Gabriel García Márquez', isbn: 'ISBN-002', ejemplaresTotales: 2, ejemplaresDisponibles: 1 },
      { id: 3, titulo: 'Clean Code', autor: 'Robert C. Martin', isbn: 'ISBN-003', ejemplaresTotales: 1, ejemplaresDisponibles: 0 },
      { id: 4, titulo: 'Node.js Design Patterns', autor: 'Mario Casciaro', isbn: 'ISBN-004', ejemplaresTotales: 2, ejemplaresDisponibles: 1 },
      { id: 5, titulo: 'La vorágine', autor: 'José Eustasio Rivera', isbn: 'ISBN-005', ejemplaresTotales: 1, ejemplaresDisponibles: 1 },
    ],
  });

  const hoy = new Date();
  const fechaLimite = new Date(hoy);
  fechaLimite.setDate(hoy.getDate() + 14);

  await prisma.prestamo.createMany({
    data: [
      { id: 1, socioId: 3, libroId: 2, estado: 'ACTIVO', fechaLimite },
      { id: 2, socioId: 3, libroId: 3, estado: 'ACTIVO', fechaLimite },
      { id: 3, socioId: 3, libroId: 4, estado: 'ACTIVO', fechaLimite },
    ],
  });

  console.log('Seed ejecutado correctamente.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });