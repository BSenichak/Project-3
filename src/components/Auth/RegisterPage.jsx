import React, { useEffect } from "react";
import PropTypes from "prop-types";
import style from "./Auth.module.scss";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { clearError, registerUser } from "./AuthReducer";

function RegisterPage(props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error, token } = useSelector((state) => state.auth);
    useEffect(() => {
        if (error) {
            alert(error);
            dispatch(clearError());
        }
        if (token) {
            navigate("/");
        }
    }, [error, token]);
    let onSubmit = (data) => {
        dispatch(registerUser(data));
    };

    return (
        <div className={style.wrapper}>
            <h1>Register</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="login">Login</label>
                <input
                    type="text"
                    id="login"
                    {...register("login", {
                        required: true,
                        minLength: {
                            value: 3,
                            message: "Login must be at least 3 characters",
                        },
                        maxLength: {
                            value: 20,
                            message: "Login must be at most 20 characters",
                        },
                        pattern: {
                            value: /^[a-zA-Z0-9]+$/,
                            message: "Login must be only letters and numbers",
                        },
                    })}
                />
                <span>{errors.login?.message}</span>
                <br />
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
                <label htmlFor="confirmPassword">Confirm password</label>
                <input
                    type="password"
                    id="confirmPassword"
                    {...register("confirmPassword", {
                        required: true,
                        validate: (value) => {
                            if (value !== watch("password")) {
                                return "Passwords do not match";
                            }
                        },
                    })}
                />
                <span>{errors.confirmPassword?.message}</span>
                <br />
                <button className={style.button}>Register</button>
            </form>
        </div>
    );
}

RegisterPage.propTypes = {};

export default RegisterPage;
