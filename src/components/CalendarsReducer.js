import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    events: [],
    modalState: false,
};

const CalendarsReducer = createSlice({
    name: "Calendars",
    initialState,
    reducers: {
        addEvent: (state, action) => {
            state.events = [...state.events, action.payload];
        },
        openModal: (state) => {
            state.modalState = true;
        },
        closeModal: (state) => {
            state.modalState = false;
        },
    },
});

export const { addEvent, openModal, closeModal } = CalendarsReducer.actions;

export default CalendarsReducer.reducer;
