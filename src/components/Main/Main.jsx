import React from "react";
import style from "./Main.module.scss";
import { FaRegCalendarPlus } from "react-icons/fa";
import MCalendar from "../MCalendar/MCalendar";
import { Routes, Route } from "react-router";
import WCalendar from "../WCalendar/WCalendar";
import DCalendar from "../DCalendar/DCalendar";
import Modal from "../Modal/Modal";
import LoginPage from "../Auth/LoginPage";
import RegisterPage from "../Auth/RegisterPage";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../CalendarsReducer";

function Main(props) {
    let dispatch = useDispatch();
    const modalState = useSelector((state) => state.calendars.modalState);
    const isAuthenticated = useSelector((state) => state.auth.token !== null);
    return (
        <main className={style.wrapper}>
            {modalState && <Modal />}
            {isAuthenticated && (
                <button
                    className={style.addButton}
                    onClick={() => dispatch(openModal())}
                >
                    <FaRegCalendarPlus />
                </button>
            )}
            <Routes>
                <Route path="/" index element={<div>main</div>} />
                <Route path="/month" element={<MCalendar />} />
                <Route path="/week" element={<WCalendar />} />
                <Route path="/day" element={<DCalendar />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
        </main>
    );
}

export default Main;
