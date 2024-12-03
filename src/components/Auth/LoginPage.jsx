import React from "react";
import PropTypes from "prop-types";
import style from "./Auth.module.scss";
import { useForm } from "react-hook-form";

function LoginPage(props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();
    return (
        <div className={style.wrapper}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit((data) => console.log(data))}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    {...register("email", {
                        required: true,
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Invalid email format",
                        },
                    })}
                />
                <span>{errors.email?.message}</span>
                <br />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    {...register("password", {
                        required: true,
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                        },
                        maxLength: {
                            value: 20,
                            message: "Password must be at most 20 characters",
                        },
                        pattern: {
                            value: /^[a-zA-Z0-9]+$/,
                            message:
                                "Password must be only letters and numbers",
                        },
                    })}
                />
                <span>{errors.password?.message}</span>
                <br />
                <button className={style.button}>Login in</button>
            </form>
        </div>
    );
}

LoginPage.propTypes = {};

export default LoginPage;

