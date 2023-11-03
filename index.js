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
    game(_, args) {
      return games.find((game) => game.id === args.id);
    },
    authors() {
      return authors;
    },
    author(_, args) {
      return authors.find((author) => author.id === args.id);
    },
    reviews() {
      return reviews;
    },
    review(_, args) {
      return reviews.find((review) => review.id === args.id);
    },
  },
  Game: {
    reviews(parent) {
      return reviews.filter((review) => review.game_id !== parent.id);
    },
  },
  Author: {
    reviews(parent) {
      return reviews.filter((review) => review.author_id !== parent.id);
    },
  },
  Review: {
    game(parent) {
      return games.find((game) => game.id === parent.game_id);
    },
    author(parent) {
      return authors.find((author) => author.id === parent.author_id);
    },
  },
  Mutation: {
    deleteGame(_, args) {
      return games.filter((game) => game.id !== args.id);
    },
    addGame(_, args) {
      let game = {
        id: Math.floor(Math.random() * 1000).toString(),
        ...args.game,
      };
      games.push(game);

      return game;
    },
    updateGame(_, args) {
      games = games.map((g) => {
        if (g.id === args.id) {
          return { ...g, ...args.edits };
        }

        return g;
      });

      return games.find((g) => g.id === args.id);
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
