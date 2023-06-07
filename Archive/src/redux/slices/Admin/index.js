// Imports

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  acceptBookingAPI,
  bookingsAPI,
  createUserAPI,
  deleteBookingAPI,
  deleteUserAPI,
  findUserAPI,
  getRevenueAPI,
  updateUserAPI,
  usersAPI,
} from '../../actions/Admin';
import { __filter__ } from '../../utils';

// Creating user slice, where slice contains piece of application information
const adminSlice = createSlice({
  name: 'adminReducer',
  initialState: {
    loading: false,
    errors: [],
    bookings: [],
    users: [],
    foundedUser: {},
    revenue: [],
    totalBookings: 0,
    totalRevenue: 0,
  },

  reducers: {
    clearStore: (state, action) => {
      return { ...state, user: {}, loading: false, errors: [] };
    },
  },
  // adding cases for handling state life cycle of promise returned by thunk
  extraReducers: (builder) => {
    builder
      .addCase(getBookings.pending, (state, action) => {
        return { ...state, loading: true };
      })
      .addCase(getBookings.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          bookings: __filter__([...action.payload], '_id'),
        };
      })
      .addCase(getBookings.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload.response.data.errors,
        };
      })
      .addCase(getUsers.pending, (state, action) => {
        return { ...state, loading: true };
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          users: __filter__([...action.payload], '_id'),
        };
      })
      .addCase(getUsers.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload.response.data.errors,
        };
      })
      .addCase(createUser.pending, (state, action) => {
        return { ...state, loading: true };
      })
      .addCase(createUser.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          users: __filter__([...state.users, action.payload.user], '_id'),
        };
      })
      .addCase(createUser.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload.response.data.errors,
        };
      })
      .addCase(updateUser.pending, (state, action) => {
        return { ...state, loading: true };
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          users: __filter__([...state.users, action.payload.user], '_id'),
        };
      })
      .addCase(updateUser.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload.response.data.errors,
        };
      })
      .addCase(findUser.pending, (state, action) => {
        return { ...state, loading: true };
      })
      .addCase(findUser.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          foundedUser: action.payload.user,
        };
      })
      .addCase(findUser.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload.response.data.errors,
        };
      })
      .addCase(deleteUser.pending, (state, action) => {
        return { ...state, loading: true };
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          users: __filter__(
            state.users.filter((item) => item._id !== action.payload.id),
            '_id'
          ),
        };
      })
      .addCase(deleteUser.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload.response.data.errors,
        };
      })
      .addCase(acceptBooking.pending, (state, action) => {
        return { ...state, loading: true };
      })
      .addCase(acceptBooking.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          bookings: __filter__(
            state.bookings.map((item) =>
              item._id === action.payload.booking._id
                ? action.payload.booking
                : item
            ),
            '_id'
          ),
        };
      })
      .addCase(acceptBooking.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload.response.data.errors,
        };
      })
      .addCase(deleteBooking.pending, (state, action) => {
        return { ...state, loading: true };
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          bookings: __filter__(
            state.bookings.filter((item) => item._id !== action.payload.id),
            '_id'
          ),
        };
      })
      .addCase(deleteBooking.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload.response.data.errors,
        };
      })
      .addCase(getRevenue.pending, (state, action) => {
        return { ...state, loading: true };
      })
      .addCase(getRevenue.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          revenue: action.payload.response,
          totalBookings: action.payload.totalBookings,
          totalRevenue: action.payload.totalRevenue,
        };
      })
      .addCase(getRevenue.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload.response.data.errors,
        };
      });
  },
});

// Exporting actions and Reducers
export const { clearStore } = adminSlice.actions;

export default adminSlice.reducer;

// Registering Thunks here
export const getBookings = createAsyncThunk(
  'admin/bookings',
  async (_, { rejectWithValue }) => {
    return bookingsAPI(rejectWithValue);
  }
);
export const getUsers = createAsyncThunk(
  'admin/users',
  async (_, { rejectWithValue }) => {
    return usersAPI(rejectWithValue);
  }
);
export const createUser = createAsyncThunk(
  'admin/createUser',
  async (data, { rejectWithValue }) => {
    return createUserAPI(data, rejectWithValue);
  }
);

export const updateUser = createAsyncThunk(
  'admin/updateUser',
  async (data, { rejectWithValue }) => {
    return updateUserAPI(data, rejectWithValue);
  }
);

export const findUser = createAsyncThunk(
  'admin/findUser',
  async (data, { rejectWithValue }) => {
    return findUserAPI(data, rejectWithValue);
  }
);

export const deleteUser = createAsyncThunk(
  'admin/deleteUser',
  async (data, { rejectWithValue }) => {
    return deleteUserAPI(data, rejectWithValue);
  }
);

export const acceptBooking = createAsyncThunk(
  'admin/acceptBooking',
  async (data, { rejectWithValue }) => {
    return acceptBookingAPI(data, rejectWithValue);
  }
);

export const deleteBooking = createAsyncThunk(
  'admin/deleteBooking',
  async (data, { rejectWithValue }) => {
    return deleteBookingAPI(data, rejectWithValue);
  }
);
export const getRevenue = createAsyncThunk(
  'admin/revenue',
  async (data, { rejectWithValue }) => {
    return getRevenueAPI(data, rejectWithValue);
  }
);
