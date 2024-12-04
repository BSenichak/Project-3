import React, { useContext } from "react";
import PropTypes from "prop-types";
import style from "./Modal.module.scss";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addEvent, closeModal } from "../CalendarsReducer";

function Modal(props) {
    let {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    let dispatch = useDispatch();
    let submit = (data) => {
        dispatch(addEvent(data));
        props.open(false);
        reset();
    };

    return (
        <div
            className={style.wrapper}
            onClick={(e) =>
                e.target === e.currentTarget && dispatch(closeModal())
            }
        >
            <form className={style.inner} onSubmit={handleSubmit(submit)}>
                <button
                    className={style.closeButton}
                    onClick={() => dispatch(closeModal())}
                >
                    X
                </button>
                <h1 className={style.title}>Add new event</h1>
                <div className={style.item}>
                    <label htmlFor="title" className={style.label}>
                        Title
                    </label>
                    <input
                        type="text"
                        className={style.input}
                        {...register("title", {
                            required: true,
                            minLength: 1,
                            maxLength: 40,
                            pattern: {
                                value: /^[a-zA-Z0-9\s]*$/,
                                message: "Only letters and numbers",
                            },
                        })}
                    />
                    {errors.title && (
                        <span className={style.error}>
                            {errors.title.message}
                        </span>
                    )}
                </div>
                <div className={style.item}>
                    <label htmlFor="date" className={style.label}>
                        Date
                    </label>
                    <input
                        type="date"
                        className={style.input}
                        {...register("date", {
                            required: { value: true, message: "Date is empty" },
                        })}
                    />
                    {errors.date && (
                        <span className={style.error}>
                            {errors.date.message}
                        </span>
                    )}
                </div>
                <div className={style.item}>
                    <label htmlFor="time" className={style.label}>
                        Time
                    </label>
                    <input
                        type="time"
                        className={style.input}
                        {...register("time", {
                            required: { value: true, message: "Time is empty" },
                        })}
                    />
                    {errors.time && (
                        <span className={style.error}>
                            {errors.time.message}
                        </span>
                    )}
                </div>
                <div className={style.item}>
                    <label htmlFor="color" className={style.label}>
                        Color
                    </label>
                    <input
                        type="color"
                        className={style.input}
                        {...register("color", { value: "#000000" })}
                    />
                </div>
                <button
                    className={style.button}
                    disabled={errors.title || errors.date || errors.time}
                >
                    Add
                </button>
            </form>
        </div>
    );
}

Modal.propTypes = {};

export default Modal;
