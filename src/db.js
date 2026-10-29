import 'dotenv/config';
import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import pkg from '@prisma/client';

const { PrismaClient } = pkg;

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20, // Permite manejar las peticiones concurrentes sin saturar el pool
});
const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });