import fastify from "fastify";
import cors from "@fastify/cors";
import * as dotenv from "dotenv";
dotenv.config();

// Import your tRPC components
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import { createContext } from "./context";
import { appRouter } from "./routers";

// Create a single Fastify instance
const server = fastify({
  maxParamLength: 5000,
});

// Register the CORS plugin to handle preflight (OPTIONS) requests
server.register(cors, {
  origin: true, // Allow all origins; adjust as needed for your security requirements
  methods: ["GET", "POST", "OPTIONS"], // Ensure OPTIONS is included
});

// Register the MySQL plugin
server.register(require("@fastify/mysql"), {
  connectionString: process.env.DATABASE_URL,
});

// Register a simple REST route (optional)
server.get("/", async () => {
  return { hello: "world" };
});

// Register the tRPC plugin
server.register(fastifyTRPCPlugin, {
  prefix: "/trpc",
  trpcOptions: {
    router: appRouter,
    createContext,
    onError({ path, error }: { path?: string; error: Error }) {
      const resolvedPath = path ?? "unknown";
      console.error(`Error in tRPC handler on path '${resolvedPath}':`, error);
    },
  },
});

// Start the server
server.listen({ port: 4000 }, (err: Error | null, address?: string) => {
  if (err) throw err;
  console.log(`Server listening on ${address}`);
});
