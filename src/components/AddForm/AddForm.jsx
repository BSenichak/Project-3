import React, { useState, useEffect, useRef, useContext } from "react";
import PropTypes from "prop-types";
import style from "./AddForm.module.scss";
import { ContextStore } from "../../store/ContextStore";

function AddForm(props) {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [color, setColor] = useState("#000000");

    const [correct, setCorrect] = useState(false);

    const titleRef = useRef(null);
    const dateRef = useRef(null);
    const timeRef = useRef(null);

    let { addEvent } = useContext(ContextStore);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (correct) {
            addEvent({ title, date, time, color });
            props.open(false);
        }
    };

    useEffect(() => {
        titleRef.current.style.display = "none";
        dateRef.current.style.display = "none";
        timeRef.current.style.display = "none";
        if (title.length < 1) {
            titleRef.current.style.display = "block";
        } else if (date.length < 1) {
            dateRef.current.style.display = "block";
        } else if (time.length < 1) {
            timeRef.current.style.display = "block";
        } else {
            setCorrect(true);
        }
    }, [title, date, time]);

    return (
        <div
            className={style.wrapper}
            onClick={(e) => e.target === e.currentTarget && props.open(false)}
        >
            <div className={style.inner}>
                <button
                    className={style.closeButton}
                    onClick={() => props.open(false)}
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
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <span className={style.error} ref={titleRef}>
                        Title is empty
                    </span>
                </div>
                <div className={style.item}>
                    <label htmlFor="date" className={style.label}>
                        Date
                    </label>
                    <input
                        type="date"
                        className={style.input}
                        name="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <span className={style.error} ref={dateRef}>
                        Date is empty
                    </span>
                </div>
                <div className={style.item}>
                    <label htmlFor="time" className={style.label}>
                        Time
                    </label>
                    <input
                        type="time"
                        className={style.input}
                        name="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                    <span className={style.error} ref={timeRef}>
                        Time is empty
                    </span>
                </div>
                <div className={style.item}>
                    <label htmlFor="color" className={style.label}>
                        Color
                    </label>
                    <input
                        type="color"
                        className={style.input}
                        name="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    />
                </div>
                <button
                    className={style.button}
                    disabled={!correct}
                    onClick={handleSubmit}
                >
                    Add
                </button>
            </div>
        </div>
    );
}

AddForm.propTypes = {};

export default AddForm;
