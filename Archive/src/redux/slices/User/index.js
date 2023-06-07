// Imports

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    createBookingAPI,
    findBookingsAPI,
    getPhotographersAPI,
    getCaterersAPI,
    loginAPI,
    logoutAPI,
    makePaymentAPI,
    registerAPI,
    updateUserAPI,
} from '../../actions/User';
import { __filter__, __update__ } from '../../utils';

// Creating user slice, where slice contains piece of application information
const userSlice = createSlice({
    name: 'userReducer',
    initialState: {
        user: {},
        loading: false,
        errors: [],
        bookings: [],
        charge: {},
        foundUser: {},
        photographers: [],
        caterers: [],
    },

    reducers: {
        clearStore: (state, action) => {
            return {...state, user: {}, loading: false, errors: [] };
        },
    },
    // adding cases for handling state life cycle of promise returned by thunk
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state, action) => {
                return {...state, loading: true };
            })
            .addCase(register.fulfilled, (state, action) => {
                return {...state, loading: false, user: action.payload.user };
            })
            .addCase(register.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.payload.response.data.error,
                };
            })
            .addCase(login.pending, (state, action) => {
                return {...state, loading: true };
            })
            .addCase(login.fulfilled, (state, action) => {
                return {...state, loading: false, user: action.payload.user };
            })
            .addCase(login.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.payload.response.data.errors,
                };
            })
            .addCase(logout.pending, (state, action) => {
                return {...state, loading: true };
            })
            .addCase(logout.fulfilled, (state, action) => {
                return {...state, loading: false, user: {} };
            })
            .addCase(logout.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.payload.response.data.errors,
                };
            })
            .addCase(createBooking.pending, (state, action) => {
                return {...state, loading: true };
            })
            .addCase(createBooking.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    bookings: __filter__(
                        [...state.bookings, action.payload.booking],
                        '_id'
                    ),
                };
            })
            .addCase(createBooking.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.payload.response.data.errors,
                };
            })
            .addCase(findBookings.pending, (state, action) => {
                return {...state, loading: true };
            })
            .addCase(findBookings.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    bookings: __filter__([...action.payload], '_id'),
                };
            })
            .addCase(findBookings.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.payload.response.data.errors,
                };
            })
            .addCase(makePayment.pending, (state, action) => {
                return {...state, loading: true };
            })
            .addCase(makePayment.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    bookings: __update__(state.bookings, action.payload.booking),
                    charge: action.payload.charge,
                };
            })
            .addCase(makePayment.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.payload.response.data.errors,
                };
            })
            .addCase(getPhotographers.pending, (state, action) => {
                return {...state, loading: true };
            })
            .addCase(getPhotographers.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    photographers: __filter__([...action.payload], '_id'),
                };
            })
            .addCase(getPhotographers.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.payload.response.data.errors,
                };
            })
            .addCase(getCaterers.pending, (state, action) => {
                return {...state, loading: true };
            })
            .addCase(getCaterers.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    caterers: __filter__([...action.payload], '_id'),
                };
            })
            .addCase(getCaterers.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.payload.response.data.errors,
                };
            })
            .addCase(updateUser.pending, (state, action) => {
                return {...state, loading: true };
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    user: action.payload.user,
                };
            })
            .addCase(updateUser.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.payload.response.data.errors,
                };
            });
    },
});

// Exporting actions and Reducers
export const { clearStore } = userSlice.actions;

export default userSlice.reducer;

// Registering Thunks here
export const register = createAsyncThunk(
    'user/register',
    async(data, { rejectWithValue }) => {
        return registerAPI(data, rejectWithValue);
    }
);

export const login = createAsyncThunk(
    'user/login',
    async(data, { rejectWithValue }) => {
        return loginAPI(data, rejectWithValue);
    }
);

export const createBooking = createAsyncThunk(
    'user/createBooking',
    async(data, { rejectWithValue }) => {
        return createBookingAPI(data, rejectWithValue);
    }
);

export const findBookings = createAsyncThunk(
    'user/bookings',
    async(data, { rejectWithValue }) => {
        return findBookingsAPI(data, rejectWithValue);
    }
);

export const makePayment = createAsyncThunk(
    'user/payment',
    async(data, { rejectWithValue }) => {
        return makePaymentAPI(data, rejectWithValue);
    }
);
export const getPhotographers = createAsyncThunk(
    'user/photographers',
    async(_, { rejectWithValue }) => {
        return getPhotographersAPI(rejectWithValue);
    }
);
export const getCaterers = createAsyncThunk(
    'user/caterers',
    async(_, { rejectWithValue }) => {
        return getCaterersAPI(rejectWithValue);
    }
);
export const updateUser = createAsyncThunk(
    'user/updateUser',
    async(data, { rejectWithValue }) => {
        return updateUserAPI(data, rejectWithValue);
    }
);
export const logout = createAsyncThunk(
    'users/logout',
    async(_, { rejectWithValue }) => {
        return logoutAPI(rejectWithValue);
    }
);