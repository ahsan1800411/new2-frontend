import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import billReducer from './slices/billSlice';

export const store = configureStore({
  reducer: {
    bills: billReducer,
  },

  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
