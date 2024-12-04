import React, { useEffect } from "react";
import PropTypes from "prop-types";
import style from "./Auth.module.scss";
import { useForm } from "react-hook-form";
import { useFetch } from "../../hooks/useFetch";
import { useDispatch } from "react-redux";
import { setToken } from "./AuthReducer";
import { useNavigate } from "react-router";

function LoginPage(props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { data, error, loading, refetch } = useFetch(
        "http://localhost:3000/login",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        },
        false
    );
    const onSubmit = (formData) => {
        refetch(JSON.stringify(formData));
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (data) {
            dispatch(setToken(data.token));
            navigate("/");
        }
    }, [data]);

    return (
        <div className={style.wrapper}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
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
