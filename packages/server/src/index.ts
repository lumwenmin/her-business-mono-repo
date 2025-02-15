import * as dotenv from "dotenv";
dotenv.config();
const fastify = require("fastify")();

fastify.register(require("@fastify/mysql"), {
  connectionString: process.env.DATABASE_URL,
});

fastify.listen({ port: 4000 }, (error: Error) => {
  if (error) throw error;
  console.log(`server listening on ${fastify.server.address().port}`);
});

fastify.get("/", () => {
  return {
    hello: "world",
  };
});
