import React, { useContext } from "react";
import PropTypes from "prop-types";
import style from "./Main.module.scss";
import AddForm from "../AddForm/AddForm";
import { FaRegCalendarPlus } from "react-icons/fa";
import MCalendar from "../MCalendar/MCalendar";
import { Routes, Route } from "react-router";
import WCalendar from "../WCalendar/WCalendar";
import DCalendar from "../DCalendar/DCalendar";
import Modal from "../Modal/Modal";
import LoginPage from "../Auth/LoginPage";
import RegisterPage from "../Auth/RegisterPage";

function Main(props) {
    const [modalOpen, setModalOpen] = React.useState(false);
    return (
        <main className={style.wrapper}>
            {modalOpen && <Modal open={setModalOpen} />}
            <button
                className={style.addButton}
                onClick={() => setModalOpen(true)}
            >
                <FaRegCalendarPlus />
            </button>
            <Routes>
                <Route path="/" index element={<div>main</div>} />
                <Route path="/month" element={<MCalendar />} />
                <Route path="/week" element={<WCalendar />} />
                <Route path="/day" element={<DCalendar />} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/register" element={<RegisterPage/>} />
            </Routes>
        </main>
    );
}

Main.propTypes = {};

export default Main;
