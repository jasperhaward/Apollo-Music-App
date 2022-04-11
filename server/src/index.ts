import { ApolloServer } from "apollo-server";
import type { ContextFunction } from "apollo-server-core";

import pool from "./database";
import typeDefs from "./schema";
import resolvers from "./resolvers";
import token from "./token";

import TracksAPI from "./datasources/tracks";
import AccountsAPI, { Account } from "./datasources/accounts";

// Data Sources

interface DataSources extends Record<string, any> {
    tracks: TracksAPI;
    accounts: AccountsAPI;
}

const dataSources = (): DataSources => ({
    tracks: new TracksAPI({ pool }),
    accounts: new AccountsAPI({ pool }),
});

// Context

interface ProducedContext {
    account: Account | null;
}

interface ResolversContext extends ProducedContext {
    dataSources: DataSources;
}

const context: ContextFunction<any, ProducedContext> = async ({ req }) => {
    const authorization = req.headers?.authorization || "";
    const username = token.parse(authorization);

    // This is bad and an annoying work around. Ideally it would be nice to access
    // the dataSources within this function or use a session implementation where
    // we can negate DB calls entirely.
    let query = "SELECT * FROM account WHERE username=$1";
    let values = [username];

    const result = await pool.query<Account>(query, values);

    return {
        account: result.rows[0],
    };
};

// Server

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    dataSources,
});

server.listen().then(() => {
    console.log(`Server is listening on port 4000.`);
});

export type { DataSources, ProducedContext, ResolversContext };
