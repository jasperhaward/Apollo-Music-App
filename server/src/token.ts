const token = {
    create: (username: string) => Buffer.from(username).toString("base64"),
    parse: (token: string) => Buffer.from(token, "base64").toString("ascii"),
};

export default token;
