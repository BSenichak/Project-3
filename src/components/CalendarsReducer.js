import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    events: [],
    modalState: false,
    loading: false,
    error: null,
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
    extraReducers: (builder) => {
        builder.addCase(addNewEvent.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(addNewEvent.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(addNewEvent.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.error || action.error.message;
        });

        builder.addCase(getEvents.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getEvents.fulfilled, (state, action) => {
            state.loading = false;
            state.events = action.payload;
        });
        builder.addCase(getEvents.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.error || action.error.message;
        });
    },
});

export const addNewEvent = createAsyncThunk(
    "calendars/addNewEvent",
    async (data, { rejectWithValue, getState }) => {
        try {
            const response = await fetch("http://localhost:3000/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getState().auth.token}`,
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (!response.ok) {
                return rejectWithValue({ error: result.error });
            }
            return result;
        } catch (error) {
            throw error;
        }
    }
);

export const getEvents = createAsyncThunk(
    "calendars/getEvents",
    async (data, { rejectWithValue, getState }) => {
        try {
            const response = await fetch("http://localhost:3000/events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getState().auth.token}`,
                },
            });
            const result = await response.json();
            if (!response.ok) {
                return rejectWithValue({ error: result.error });
            }
            return result;
        } catch (error) {
            throw error;
        }
    }
);

export const { addEvent, openModal, closeModal } = CalendarsReducer.actions;

export default CalendarsReducer.reducer;
