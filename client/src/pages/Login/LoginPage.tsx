import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

import * as LoginTypes from "../../types/Login";
import useSession from "../../hooks/useSession";
import LoginForm from "./LoginForm";

const LOGIN = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            username
            token
        }
    }
`;

function Login() {
    const session = useSession();
    const navigate = useNavigate();

    const [login, { loading, error }] = useMutation<
        LoginTypes.Login,
        LoginTypes.LoginParameters
    >(LOGIN, { onCompleted });

    useEffect(() => {
        const { token } = session.get();
        if (token) navigate("/");
    }, []);

    function onSubmit(values: LoginTypes.LoginParameters) {
        login({ variables: values });
    }

    function onCompleted({ login: sessionParams }: LoginTypes.Login) {
        if (sessionParams) {
            session.set(sessionParams);
            navigate("/");
        }
    }

    return (
        <>
            <h1>LOGIN</h1>
            <LoginForm
                loading={loading}
                errorMessage={error?.message}
                onSubmit={onSubmit}
            />
        </>
    );
}

export default Login;
