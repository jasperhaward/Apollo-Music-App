import type { Account } from "./datasources/accounts";

export interface User extends Omit<Account, "password"> {
    token: string;
}
