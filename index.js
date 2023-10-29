import { ApolloServer } from '@apollo/server';
import { startStandAloneServer } from '@apollo/server/standalone';

// types
import { typeDefs } from './schema';

const port = 4000;

const server = new ApolloServer({
  typeDefs,
});

const { url } = await startStandAloneServer(server, {
  listen: { port: port },
});

console.log(`Server ready at port ${port}`);
