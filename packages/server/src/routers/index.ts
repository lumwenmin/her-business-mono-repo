import { t } from "../trpc";
import { userRouter } from "./user";

export const appRouter = t.router({
  user: userRouter, // Namespaced under "user"
});

// Export type definition of API
export type AppRouter = typeof appRouter;
