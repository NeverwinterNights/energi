import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/store/user-slice";

type Auth = {
  id: string;
  isAuthenticated: boolean;
  username: string;
  email: string;
};

const initialState: Auth = {} as Auth;

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        email: string;
        username: string;
        phone: string;
        users: User[];
      }>,
    ) => {
      const { email, phone, users, username } = action.payload;
      console.log("action.payload", action.payload);
      const user = users.find(
        (user) =>
          user.email === email &&
          user.phone === phone &&
          user.username === username,
      );
      if (user) {
        state.email = user.email;
        state.id = user.id;
        state.username = user.username;
        state.isAuthenticated = true;
      } else {
        state.isAuthenticated = false;
      }
    },
    logout: () => {
      return initialState;
    },
  },
  selectors: {
    isAuthenticated: (sliceState) => sliceState.isAuthenticated,
    userData: (state) => state,
  },
});

export const authReducer = slice.reducer;
export const { login, logout } = slice.actions;
export const { isAuthenticated, userData } = slice.selectors;
