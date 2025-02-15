import type { AppRouter } from "shared/src/appRouter";
import { createTRPCReact } from "@trpc/react-query";

export const trpc = createTRPCReact<AppRouter>({
  // optionally, you can provide custom options here
});
