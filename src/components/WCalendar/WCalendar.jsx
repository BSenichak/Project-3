import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import style from "./WCalendar.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { changeWeek } from "../CalendarsReducer";

function WCalendar(props) {
    let events = useSelector((state) => state.calendars.events);

    let currentDate = new Date(useSelector((state) => state.calendars.week));
    let disptach = useDispatch();

    function getWeekInputFormat(date) {
        const year = date.getFullYear();
        const startOfYear = new Date(year, 0, 1);
        const diffInDays = Math.floor(
            (date - startOfYear) / (1000 * 60 * 60 * 24)
        );
        const weekNumber = Math.ceil(
            (diffInDays + startOfYear.getDay() + 1) / 7
        );
        const week = weekNumber.toString().padStart(2, "0");
        return `${year}-W${week}`;
    }

    function getDateFromWeekInput(weekInput) {
        const [year, week] = weekInput.split("-W").map(Number);
        const startOfYear = new Date(year, 0, 1);
        const firstMonday =
            startOfYear.getDay() === 0
                ? new Date(startOfYear.setDate(2))
                : new Date(startOfYear.setDate(8 - startOfYear.getDay()));
        const weekStart = new Date(firstMonday);
        weekStart.setDate(firstMonday.getDate() + (week - 1) * 7);
        return weekStart.getTime();
    }

    const getMinutes = (time) => {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
    };

    const getCalendarDates = (year, month) => {
        const startOfWeek = new Date(
            year,
            month,
            currentDate.getDate() - currentDate.getDay() + 2
        );
        const dates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(year, month, startOfWeek.getDate() + i);
            dates.push(date);
        }
        return dates;
    };
    const year = new Date(currentDate).getFullYear();
    const month = new Date(currentDate).getMonth();
    const dates = getCalendarDates(year, month);

    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <div className={style.header}>
                    <input
                        type="week"
                        value={getWeekInputFormat(currentDate)}
                        onChange={(e) => disptach(changeWeek( getDateFromWeekInput(e.target.value)))}
                    />
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Monday</th>
                            <th>Tuesday</th>
                            <th>Wednesday</th>
                            <th>Thursday</th>
                            <th>Friday</th>
                            <th>Saturday</th>
                            <th>Sunday</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {dates.map((date, index) => (
                                <td key={index}>
                                    <span className={style.number}>
                                        {date.getUTCDate()}
                                    </span>
                                    {events
                                        .filter(
                                            (event) =>
                                                event.date ==
                                                date.toISOString().split("T")[0]
                                        )
                                        .sort(
                                            (a, b) =>
                                                getMinutes(a.time) -
                                                getMinutes(b.time)
                                        )
                                        .map((event, i) => (
                                            <button
                                                key={i}
                                                className={style.event}
                                                style={{
                                                    borderLeftColor:
                                                        event.color,
                                                }}
                                            >
                                                {event.time} {event.title}
                                            </button>
                                        ))}
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

WCalendar.propTypes = {};

export default WCalendar;
