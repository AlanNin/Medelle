import { UserProps } from "@/types/user";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type UserState = {
  currentUser: UserProps | null;
  loading: boolean;
  error: boolean;
};

const initialState: UserState = {
  currentUser: null,
  loading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<UserProps>) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    userUpdated: (state, action: PayloadAction<UserProps>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, userUpdated } =
  userSlice.actions;

export default userSlice.reducer;
