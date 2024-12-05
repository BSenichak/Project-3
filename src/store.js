import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./components/Auth/AuthReducer";
import CalendarsReducer from "./components/CalendarsReducer";
import logger from "redux-logger";

export default configureStore({
    reducer: {
        auth: AuthReducer,
        calendars: CalendarsReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
