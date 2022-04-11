import React, { MouseEvent, ReactNode, ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
    type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
    disabled?: boolean;
    children?: ReactNode;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

function Button({ type, children, disabled, onClick }: ButtonProps) {
    return (
        <button
            className={styles.button}
            type={type}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default Button;
