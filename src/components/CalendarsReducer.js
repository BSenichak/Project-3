import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    events: [],
    modalState: false,
    loading: false,
    error: null,
    month: new Date().getTime(),
    week: new Date().getTime(),
    day: new Date().getTime(),
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
        changeMonth: (state, action) => {
            state.month = new Date(action.payload).getTime();
        },
        changeWeek: (state, action) => {
            state.week = new Date(action.payload).getTime();
        },
        changeDay: (state, action) => {
            state.day = new Date(action.payload).getTime();
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addNewEvent.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(addNewEvent.fulfilled, (state, action) => {
            state.loading = false;
            state.events = action.payload;
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

        builder.addCase(removeEvent.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(removeEvent.fulfilled, (state, action) => {
            state.loading = false;
            state.events = action.payload;
        });
        builder.addCase(removeEvent.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.error || action.error.message;
        });
    },
});

export const addNewEvent = createAsyncThunk(
    "calendars/addNewEvent",
    async (data, { rejectWithValue, getState }) => {
        try {
            const response = await fetch("/add", {
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
            const response = await fetch("/events", {
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

export const removeEvent = createAsyncThunk(
    "calendars/removeEvent",
    async (id, { rejectWithValue, getState }) => {
        try {
            const response = await fetch(`/remove/${id}`, {
                method: "DELETE",
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

export const {
    addEvent,
    openModal,
    closeModal,
    changeMonth,
    changeWeek,
    changeDay,
} = CalendarsReducer.actions;

export default CalendarsReducer.reducer;
