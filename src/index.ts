import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import { buildSchema, Query, Resolver } from "type-graphql";
import { createConnection } from "typeorm";

import { RegisterResolver } from "./models/user/Register";

@Resolver()
class HelloResolver {
  @Query(() => String)
  async hello() {
    return "Hello from graphql";
  }
}

const main = async () => {
  await createConnection();
  const schema = await buildSchema({
    resolvers: [HelloResolver, RegisterResolver]
  });
  const apolloServer = new ApolloServer({ schema });

  const app = Express();

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("server started at http://localhost:4000/graphql");
  });
};

main();
