import { gql } from "apollo-server";

const typeDefs = gql`
    type User {
        id: ID!
        username: String!
        token: String
    }

    type Track {
        id: ID!
        name: String!
        author: String!
        length: Float!
    }

    type Query {
        tracks: [Track]!
        favouriteTracks: [Track]!
    }

    type Mutation {
        login(username: String!, password: String!): User
    }
`;

export default typeDefs;
