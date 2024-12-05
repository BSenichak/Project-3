import React from "react";
import PropTypes from "prop-types";
import style from "./Header.module.scss";
import { BsCalendar3, BsCalendar4Week } from "react-icons/bs";
import { IoTodayOutline } from "react-icons/io5";
import { NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { removeToken } from "../Auth/AuthReducer";

function Header(props) {
    let isAuthenticated = useSelector((state) => state.auth.token !== null);
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let logout = () => {
        dispatch(removeToken());
        navigate("/login");
    };
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

                {!isAuthenticated ? (
                    <>
                        <NavLink
                            to="/login"
                            className={({ isActive }) =>
                                isActive ? style.active : style.link
                            }
                        >
                            Login
                        </NavLink>
                        <NavLink
                            to="/register"
                            className={({ isActive }) =>
                                isActive ? style.active : style.link
                            }
                        >
                            Register
                        </NavLink>
                    </>
                ) : (
                    <span onClick={logout}>Log out</span>
                )}
            </nav>
        </header>
    );
}

Header.propTypes = {};

export default Header;
