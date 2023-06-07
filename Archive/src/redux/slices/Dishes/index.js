// Imports

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllDishesAPI } from '../../actions/Dish';
import { __filter__ } from '../../utils';

// Creating user slice, where slice contains piece of application information
const dishSlice = createSlice({
  name: 'dishes',
  initialState: {
    loading: false,
    errors: [],
    data: [],
  },

  reducers: {
    clearStore: (state, action) => {
      return { ...state, data: [], loading: false, errors: [] };
    },
  },
  // adding cases for handling state life cycle of promise returned by thunk
  extraReducers: (builder) => {
    builder
      .addCase(fetchDishes.pending, (state, action) => {
        return { ...state, loading: true };
      })
      .addCase(fetchDishes.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          data: __filter__([...action.payload], '_id'),
        };
      })
      .addCase(fetchDishes.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload.response.data.errors,
        };
      });
  },
});

// Exporting actions and Reducers
export const { clearStore } = dishSlice.actions;

export default dishSlice.reducer;

// Registering Thunks here
export const fetchDishes = createAsyncThunk(
  'dishes/fetch',
  async (_, { rejectWithValue }) => {
    return fetchAllDishesAPI(rejectWithValue);
  }
);

