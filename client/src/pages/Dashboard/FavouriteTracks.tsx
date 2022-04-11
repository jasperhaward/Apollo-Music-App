import React from "react";
import { gql, useQuery } from "@apollo/client";

import * as FavouriteTracksTypes from "../../types/FavouriteTracks";
import TracksList from "./TracksList";

const FAVOURITE_TRACKS = gql`
    query GetFavouriteTracks {
        favouriteTracks {
            id
            name
            author
            length
        }
    }
`;

function FavouriteTracks() {
    const { loading, error, data } =
        useQuery<FavouriteTracksTypes.FavouriteTracks>(FAVOURITE_TRACKS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;

    const tracks = data ? data.favouriteTracks : [];

    return (
        <div>
            <h2>FAVOURITES</h2>
            <TracksList tracks={tracks} />
        </div>
    );
}

export default FavouriteTracks;
