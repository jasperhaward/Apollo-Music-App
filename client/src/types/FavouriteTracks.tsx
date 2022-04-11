// Ideally want to generate server-side type definitions from the GraphQL endpoint schema,
// however thanks for NPM dependency issues it took too long to get working

export interface Track {
    id: number;
    name: string;
    author: string;
    length: number;
}

export interface FavouriteTracks {
    favouriteTracks: Track[];
}
