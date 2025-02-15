import { t } from "../trpc";
import { z } from "zod";

export const userRouter = t.router({
  // Example procedure to get a user by ID using Prisma
  getUserById: t.procedure.input(z.string()).query(async ({ input, ctx }) => {
    return await ctx.prisma.user.findUnique({
      where: { id: input },
    });
  }),
  // Example procedure to create a user
  createUser: t.procedure
    .input(
      z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Must be a valid email"),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // Use the Prisma client from the context to create a new user record
      const newUser = await ctx.prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
        },
      });
      return newUser;
    }),
});
