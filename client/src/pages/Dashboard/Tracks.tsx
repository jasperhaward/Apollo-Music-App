import React from "react";
import { gql, useQuery } from "@apollo/client";

import * as TrackTypes from "../../types/Tracks";
import TracksList from "./TracksList";

const TRACKS = gql`
    query GetTracks {
        tracks {
            id
            name
            author
            length
        }
    }
`;

function Tracks() {
    const { loading, error, data } = useQuery<TrackTypes.Tracks>(TRACKS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;

    const tracks = data ? data.tracks : [];

    return (
        <div>
            <h2>ALL TRACKS</h2>
            <TracksList tracks={tracks} />
        </div>
    );
}

export default Tracks;
