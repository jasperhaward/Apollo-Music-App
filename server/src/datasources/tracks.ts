import { DataSource, DataSourceConfig } from "apollo-datasource";
import type { Pool } from "pg";
import type { ProducedContext } from "..";

interface Track {
    id: number;
    name: string;
    author: string;
    length: number;
}

interface TracksAPIConfig {
    pool: Pool;
}

class TracksAPI extends DataSource {
    pool: Pool;
    context: ProducedContext;

    constructor({ pool }: TracksAPIConfig) {
        super();
        this.pool = pool;
    }

    initialize(config: DataSourceConfig<ProducedContext>) {
        this.context = config.context;
    }

    async getTracks() {
        let query = "SELECT * FROM track";

        const result = await this.pool.query<Track>(query);

        return result.rows;
    }

    async getFavouriteTracks() {
        let query = `
            SELECT track.*
            FROM track 
            INNER JOIN account_track_mapping
            ON (
                account_track_mapping.account_id=$1 
                AND account_track_mapping.track_id=track.id
            )
        `;
        let values = [this.context.account.id];

        const result = await this.pool.query<Track>(query, values);

        return result.rows;
    }
}

export type { Track };
export default TracksAPI;
