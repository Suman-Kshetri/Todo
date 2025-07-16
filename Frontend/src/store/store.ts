import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'; // reducer for auth state

export const store = configureStore({
  reducer: {
    auth: authReducer,  // this is the name of the state in store
  },
});

// These are helpful types to avoid repeating type code
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
