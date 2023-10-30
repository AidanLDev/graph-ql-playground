import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { games, reviews, authors } from './_db.js';
// types
import { typeDefs } from './schema.js';

const port = 4000;

const resolvers = {
  Query: {
    games() {
      return games;
    },
    reviews() {
      return reviews;
    },
    authors() {
      return authors;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: port },
});

console.log(`Server ready at port ${url}`);
