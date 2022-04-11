import { DataSource } from "apollo-datasource";
import type { Pool } from "pg";

interface Account {
    id: number;
    username: string;
    password: string;
}

interface AccountsAPIConfig {
    pool: Pool;
}

class AccountsAPI extends DataSource {
    pool: Pool;

    constructor({ pool }: AccountsAPIConfig) {
        super();
        this.pool = pool;
    }

    async getAccountByUsername(username: string) {
        let query = "SELECT * FROM account WHERE username=$1";
        let values = [username];

        const result = await this.pool.query<Account>(query, values);

        return result.rows[0];
    }
}

export type { Account };
export default AccountsAPI;
