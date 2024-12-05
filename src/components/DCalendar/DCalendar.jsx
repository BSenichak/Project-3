import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import style from "./DCalendar.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { changeDay, removeEvent } from "../CalendarsReducer";

function DCalendar(props) {
    let events = useSelector((state) => state.calendars.events);

    let currentDate = new Date(useSelector((state) => state.calendars.day))
    let disptach = useDispatch();

    const getMinutes = (time) => {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
    };

    return (
        <div className={style.wrapper}>
            <div className={style.header}>
                <input
                    type="date"
                    value={currentDate.toISOString().split("T")[0]}
                    onChange={(e) => disptach(changeDay(new Date(e.target.value).getTime()))}
                />
            </div>
            <div className={style.container}>
                {events
                    .filter(
                        (event) =>
                            new Date(event.date).toDateString() ===
                            new Date(currentDate).toDateString()
                    )
                    .sort((a, b) => getMinutes(a.time) - getMinutes(b.time))
                    .map((event, i) => (
                        <button
                            className={style.event}
                            key={i}
                            style={{ borderColor: event.color }}
                            onClick={() => disptach(removeEvent(event.id))}
                        >
                            <div className={style.title}>{event.title}</div>
                            <div className={style.date}>{event.date}</div>
                            <div className={style.time}>{event.time}</div>
                        </button>
                    ))}
            </div>
        </div>
    );
}

DCalendar.propTypes = {};

export default DCalendar;
