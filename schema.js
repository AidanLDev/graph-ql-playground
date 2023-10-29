export const typeDefs = `#graphql
  type Game {
    id: ID!
    title: String!
    platform: [String!]!
  }
  type Review {
    id: ID!
    rating: Int!
    content: String!
  }
  type Author {
    id: ID!
    name: String!
    verified: Boolean!
  }
  # Every graph needs a Query, entry points to graph and specify return types of those entry points
  type Query {
    reviews: [Review]
    games: [Game]
    authors: [Author]
  }
`;

// int, float, string, boolean, ID
