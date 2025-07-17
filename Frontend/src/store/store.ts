import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'; // reducer for auth state
import themeReducer from '../features/theme/themeSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,  // this is the name of the state in store
    theme: themeReducer
  },
});

// These are helpful types to avoid repeating type code
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
