interface Session {
    username: string;
    token: string;
}

// With more time I'd move this into its own reactive variable
// as in https://www.apollographql.com/docs/tutorial/local-state#initialize-reactive-variables
// and utilise local/client Queries as opposed to this hook

function useSession() {
    const set = ({ token, username }: Session) => {
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
    };

    const get = () => ({
        token: localStorage.getItem("token"),
        username: localStorage.getItem("username"),
    });

    const end = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
    };

    return { set, get, end };
}

export type { Session };
export default useSession;
