// Imports

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createCustomDealAPI, fetchAllDealsAPI } from '../../actions/Deals';
import { __filter__ } from '../../utils';

// Creating user slice, where slice contains piece of application information
const dealsSlice = createSlice({
  name: 'deals',
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
      .addCase(fetchDeals.pending, (state, action) => {
        return { ...state, loading: true };
      })
      .addCase(fetchDeals.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          data: __filter__([...action.payload], '_id'),
        };
      })
      .addCase(fetchDeals.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload.response.data.errors,
        };
      })
      .addCase(createCustomDeal.pending, (state, action) => {
        return { ...state, loading: true };
      })
      .addCase(createCustomDeal.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          data: __filter__([...state.data, action.payload], '_id'),
        };
      })
      .addCase(createCustomDeal.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload.response.data.errors,
        };
      });
  },
});

// Exporting actions and Reducers
export const { clearStore } = dealsSlice.actions;

export default dealsSlice.reducer;

// Registering Thunks here
export const fetchDeals = createAsyncThunk(
  'deals/fetch',
  async (_, { rejectWithValue }) => {
    return fetchAllDealsAPI(rejectWithValue);
  }
);

export const createCustomDeal = createAsyncThunk(
  'deals/post',
  async (data, { rejectWithValue }) => {
    return createCustomDealAPI(data, rejectWithValue);
  }
);
