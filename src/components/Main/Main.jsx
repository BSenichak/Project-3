import React, { useContext } from "react";
import PropTypes from "prop-types";
import style from "./Main.module.scss";
import AddForm from "../AddForm/AddForm";
import { FaRegCalendarPlus } from "react-icons/fa";
import MCalendar from "../MCalendar/MCalendar";

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
            <MCalendar />
        </main>
    );
}

Main.propTypes = {};

export default Main;

