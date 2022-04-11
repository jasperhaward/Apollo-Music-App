import React from "react";
import { Track } from "../../types/Tracks";

interface TracksListProps {
    tracks: Track[];
}

const TracksList = ({ tracks }: TracksListProps) => (
    <ul>
        {tracks.map((track) => (
            <li key={track.id}>
                <h3>Name: {track.name}</h3>
                <div>Author: {track.author}</div>
                <div>Length: {track.length} minutes</div>
            </li>
        ))}
    </ul>
);

export default TracksList;
