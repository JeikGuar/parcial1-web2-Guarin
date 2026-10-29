const API = 'http://localhost:4000/api';
const libroId = 5;

const peticiones = Array.from({ length: 10 }, (_, i) =>
  fetch(`${API}/prestamos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ socioId: (i % 2) + 1, libroId }),
  }).then((r) => r.status)
);

const codigos = await Promise.all(peticiones);

// LÍNEA DE DEPURACIÓN:
console.log('Códigos recibidos:', codigos);

const libro = await (await fetch(`${API}/libros/${libroId}`)).json();
const aceptados = codigos.filter((c) => c === 201).length;
const rechazados = codigos.filter((c) => c === 409).length;

console.log(`Aceptados: ${aceptados} · Rechazados: ${rechazados}`);
console.log(`Disponibles: ${libro.ejemplaresDisponibles}`);