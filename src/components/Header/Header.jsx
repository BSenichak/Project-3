import React from "react";
import PropTypes from "prop-types";
import style from "./Header.module.scss";
import { BsCalendar3, BsCalendar4Week } from "react-icons/bs";
import { IoTodayOutline } from "react-icons/io5";
import { IoMdCalendar } from "react-icons/io";
import { NavLink } from "react-router";

function Header(props) {
    return (
        <header className={style.wrapper}>
            <NavLink to="/" className={style.logoBar}>
                <BsCalendar3 className={style.icon} />
                <div className="title">RoboCalendar</div>
            </NavLink>
            <nav className={style.navBar}>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? style.active : style.link
                    }
                >
                    Main
                </NavLink>
                <NavLink
                    to="/month"
                    className={({ isActive }) =>
                        isActive ? style.active : style.link
                    }
                >
                    <BsCalendar3 />
                    <span>Month</span>
                </NavLink>
                <NavLink
                    to="/week"
                    className={({ isActive }) =>
                        isActive ? style.active : style.link
                    }
                >
                    <BsCalendar4Week />
                    <span>Week</span>
                </NavLink>
                <NavLink
                    to="/day"
                    className={({ isActive }) =>
                        isActive ? style.active : style.link
                    }
                >
                    <IoTodayOutline />
                    <span>Day</span>
                </NavLink>
            </nav>
        </header>
    );
}

Header.propTypes = {};

export default Header;
