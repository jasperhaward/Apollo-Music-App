import { UserInputError, AuthenticationError } from "apollo-server";

import token from "./token";
import type { ResolversContext } from ".";
import type { Track } from "./datasources/tracks";
import type { User } from "./types";

// Query Resolvers

interface QueryResolvers {
    tracks: (
        parent: undefined,
        args: undefined,
        context: ResolversContext
    ) => Promise<Track[]>;
    favouriteTracks: (
        parent: undefined,
        args: undefined,
        context: ResolversContext
    ) => Promise<Track[]>;
}

const queryResolvers: QueryResolvers = {
    tracks: async (_, __, context) => {
        // Should pop this into middleware instead of duplicating it across all Queries
        if (!context.account) {
            throw new AuthenticationError("User is not authenticated.");
        }

        return await context.dataSources.tracks.getTracks();
    },
    favouriteTracks: async (_, __, context) => {
        if (!context.account) {
            throw new AuthenticationError("User is not authenticated.");
        }

        return await context.dataSources.tracks.getFavouriteTracks();
    },
};

// Mutation Resolvers

interface MutationResolvers {
    login: (
        parent: undefined,
        args: { username: string; password: string },
        context: ResolversContext
    ) => Promise<User>;
}

const mutationResolvers: MutationResolvers = {
    login: async (_, args, context) => {
        const user = await context.dataSources.accounts.getAccountByUsername(
            args.username
        );

        if (!user || user.password !== args.password) {
            throw new UserInputError("Invalid login details.");
        }

        return {
            id: user.id,
            username: user.username,
            token: token.create(user.username),
        };
    },
};

export default {
    Query: queryResolvers,
    Mutation: mutationResolvers,
};
