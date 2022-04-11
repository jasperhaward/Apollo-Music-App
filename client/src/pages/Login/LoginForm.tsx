import React from "react";
import { Formik } from "formik";

import styles from "./LoginForm.module.css";
import { Button } from "../../components";
import { LoginParameters } from "../../types/Login";

interface LoginFormProps {
    loading: boolean;
    errorMessage: string | undefined;
    onSubmit: (values: LoginParameters) => void;
}

function LoginForm({ loading, errorMessage, onSubmit }: LoginFormProps) {
    function validate(values: LoginParameters) {
        const errors: Partial<LoginParameters> = {};

        if (values.username === "") errors.username = "Required";
        if (values.password === "") errors.password = "Required";

        return errors;
    }

    return (
        <Formik
            initialValues={{ username: "", password: "" }}
            validate={validate}
            onSubmit={onSubmit}
        >
            {({ values, errors, touched, handleChange, handleSubmit }) => (
                <form className={styles.loginForm} onSubmit={handleSubmit}>
                    <input
                        placeholder="Username"
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                    />
                    {errors.username && touched.username && (
                        <span>{errors.username}</span>
                    )}
                    <input
                        placeholder="Password"
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                    />
                    {errors.password && touched.password && (
                        <span>{errors.password}</span>
                    )}
                    <Button type="submit" disabled={loading}>
                        Login
                    </Button>
                    {errorMessage && <span>{errorMessage}</span>}
                </form>
            )}
        </Formik>
    );
}

export default LoginForm;
