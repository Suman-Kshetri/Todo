import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  _id: string;
  username: string;
  email: string;
  fullname: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
  setUser(state, action: PayloadAction<User>) {
    state.user = action.payload;
    state.isAuthenticated = true;
    state.loading = false;
  },
  clearUser(state) {
    state.user = null;
    state.isAuthenticated = false;
    state.loading = false;
  },
},
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
