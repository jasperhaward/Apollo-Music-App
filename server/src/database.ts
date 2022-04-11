import { Pool } from "pg";
import { POSTGRES_USER, POSTGRES_PASSWORD } from "./credentials";

const pool = new Pool({
    host: "server.local",
    port: 5432,
    database: "tracks",
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
});

export default pool;
