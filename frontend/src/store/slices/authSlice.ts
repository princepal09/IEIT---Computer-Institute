import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { Admin } from "@/types/admin";

interface AuthState {
  admin: Admin | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  admin: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setAdmin: (state, action: PayloadAction<Admin>) => {
      state.admin = action.payload;
      state.isAuthenticated = true;
    },

    clearAuth: (state) => {
      state.admin = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAdmin, clearAuth } = authSlice.actions;
export default authSlice.reducer;
