// Ideally want to generate server-side type definitions from the GraphQL endpoint schema,
// however thanks for NPM dependency issues it took too long to get working

export interface Login {
    login: {
        username: string;
        token: string;
    };
}

export interface LoginParameters {
    username: string;
    password: string;
}
