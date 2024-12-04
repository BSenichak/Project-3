import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./components/Auth/AuthReducer";
import CalendarsReducer from "./components/CalendarsReducer";

export default configureStore({
    reducer: {
        auth: AuthReducer,
        calendars: CalendarsReducer
    },
});