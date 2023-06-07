import storage from 'reduxjs-toolkit-persist/lib/storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from '../slices/User';
import adminSlice from '../slices/Admin';
import dealSlice from '../slices/Deals';
import dishSlice from '../slices/Dishes';
import { persistStore, persistReducer } from 'reduxjs-toolkit-persist';

// Defining Root Reducer: It contains all of our app reducers
const rootReducer = combineReducers({
  userReducer: userSlice,
  adminReducer: adminSlice,
  dealsReducer: dealSlice,
  dishReducer: dishSlice,
});
/*

  This will be the persisted Reducer, it will detect change in state
  and persists it again
*/
const _persistedReducer = persistReducer(
  {
    key: 'root',
    storage,
  },
  rootReducer
);

// Defining Store Now
const store = configureStore({
  reducer: _persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
// Finally defining and exporting persistor
export const persistor = persistStore(store);
// exporting store
export default store;
