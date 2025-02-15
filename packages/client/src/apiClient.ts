import { httpBatchLink } from "@trpc/client";
import { trpc } from "./trpc";

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "http://localhost:4000/trpc", // your tRPC endpoint
    }),
  ],
});
