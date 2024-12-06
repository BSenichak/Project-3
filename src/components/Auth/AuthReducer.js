import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    loading: false,
    error: null,
};

const AuthReducer = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        uploadTokenFromLocalStorage: (state) => {
            state.token = localStorage.getItem("token") || null;
        },
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem("token", action.payload);
        },
        removeToken: (state) => {
            state.token = null;
            localStorage.removeItem("token");
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.token = action.payload.token;
            localStorage.setItem("token", action.payload.token);
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.error || action.error.message;
        });
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.error || action.error.message;
        });
    },
});

export const loginUser = createAsyncThunk(
    "auth/loginUser", // ім'я екшену
    async (data, { rejectWithValue }) => {
        // функція, яка буде виконуватися при виклику екшену
        try {
            // відправляємо запит на сервер
            const response = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data), // перетворюємо дані у JSON
            });
            let result = await response.json(); // отримуємо дані з відповіді сервера
            if (!response.ok) {
                // якщо сервер повернув помилку
                return rejectWithValue({ error: result.error }); // повертаємо помилку rejectWithValue
            }
            return result; // повертаємо успішний результат
        } catch (error) {
            throw error; // якщо виникла помилка, то кидаємо її
        }
    }
);

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (data, { rejectWithValue, dispatch }) => {
        try {
            const response = await fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            let result = await response.json();
            if (!response.ok) return rejectWithValue({ error: result.error });

            result = await dispatch(loginUser(data));
            return result;
        } catch (error) {
            throw error;
        }
    }
);

export const {
    uploadTokenFromLocalStorage,
    setToken,
    removeToken,
    clearError,
} = AuthReducer.actions;

export default AuthReducer.reducer;
