import fastify from "fastify";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import { createContext } from "./context";
import { appRouter, type AppRouter } from "./routers";

const server = fastify({
  maxParamLength: 5000,
});

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

server.listen({ port: 4000 }, (err: Error | null, address?: string) => {
  if (err) throw err;
  console.log(`Server listening on ${address}`);
});
