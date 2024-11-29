import React, { useContext } from "react";
import PropTypes from "prop-types";
import style from "./Main.module.scss";
import AddForm from "../AddForm/AddForm";
import { FaRegCalendarPlus } from "react-icons/fa";
import MCalendar from "../MCalendar/MCalendar";
import { Routes, Route } from "react-router";

function Main(props) {
    const [modalOpen, setModalOpen] = React.useState(false);
    return (
        <main className={style.wrapper}>
            {modalOpen && <AddForm open={setModalOpen} />}
            <button
                className={style.addButton}
                onClick={() => setModalOpen(true)}
            >
                <FaRegCalendarPlus />
            </button>
            <Routes>
                <Route path="/" index element={<div>main</div>} />
                <Route path="/month" element={<MCalendar />} />
                <Route path="/week" element={<div>week</div>} />
                <Route path="/day" element={<div>day</div>} />
            </Routes>
        </main>
    );
}

Main.propTypes = {};

export default Main;
