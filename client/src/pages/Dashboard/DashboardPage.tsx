import React from "react";
import { useNavigate } from "react-router-dom";
import { useApolloClient } from "@apollo/client";

import styles from "./Dashboard.module.css";
import useSession from "../../hooks/useSession";
import { Button } from "../../components";
import Tracks from "./Tracks";
import FavouriteTracks from "./FavouriteTracks";

function Dashboard() {
    const client = useApolloClient();
    const session = useSession();
    const navigate = useNavigate();

    function logout() {
        session.end();
        // Remove cached resources, ie tracks
        client.clearStore();
        navigate("/login");
    }

    return (
        <>
            <h1>TRACKS</h1>
            <div className={styles.tracksContainer}>
                <Tracks />
                <FavouriteTracks />
            </div>
            <Button onClick={logout}>Logout</Button>
        </>
    );
}

export default Dashboard;
