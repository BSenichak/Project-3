import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import style from "./MCalendar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { changeMonth, removeEvent } from "../CalendarsReducer";

function MCalendar(props) {
    let events = useSelector((state) => state.calendars.events);
    // const [currentDate, setCurrentDate] = useState(new Date());
    let currentDate = new Date(useSelector((state) => state.calendars.month));
    let disptach = useDispatch();

    const getCalendarDates = (year, month) => {
        const startOfMonth = new Date(year, month, 0);
        const endOfMonth = new Date(year, month + 1, 0);
        const startDay = startOfMonth.getDay() - 1 || 7;
        const totalDays = endOfMonth.getDate() + 1;
        const dates = [];
        for (let i = 1 - startDay; i <= totalDays; i++) {
            const date = new Date(year, month, i);
            dates.push(date);
        }
        return dates;
    };
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const dates = getCalendarDates(year, month);

    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <div className={style.header}>
                    <input
                        type="month"
                        value={currentDate
                            .toISOString()
                            .split("T")[0]
                            .slice(0, 7)}
                        onChange={(e) => disptach(changeMonth(e.target.value))}
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
                        {Array.from(
                            { length: Math.ceil(dates.length / 7) },
                            (_, weekIndex) => (
                                <tr key={weekIndex}>
                                    {dates
                                        .slice(weekIndex * 7, weekIndex * 7 + 7)
                                        .map((date, index) => (
                                            <td key={index}>
                                                <span className={style.number}>
                                                    {date.getUTCDate()}
                                                </span>
                                                {events
                                                    .filter(
                                                        (event) =>
                                                            event.date ==
                                                            date
                                                                .toISOString()
                                                                .split("T")[0]
                                                    )
                                                    .map((event, i) => (
                                                        <button
                                                            key={i}
                                                            className={
                                                                style.event
                                                            }
                                                            style={{
                                                                borderLeftColor:
                                                                    event.color,
                                                            }}
                                                            onClick={() => disptach(removeEvent(event.id))}
                                                        >
                                                            {event.title}
                                                        </button>
                                                    ))}
                                            </td>
                                        ))}
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

MCalendar.propTypes = {};

export default MCalendar;
