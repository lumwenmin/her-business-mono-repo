import { PrismaClient } from "@prisma/client";
import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";

// Initialize Prisma Client (you might want to reuse a single instance)
const prisma = new PrismaClient();

export async function createContext({ req, res }: CreateFastifyContextOptions) {
  // You can extract headers or auth tokens here if needed
  const user = { name: req.headers.username ?? "anonymous" };

  return { req, res, prisma, user };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
