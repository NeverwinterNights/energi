import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
};

const initialState: User[] = [];

const slice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<Omit<User, "id">>) => {
      const users: User = {
        ...action.payload,
        id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      };
      return [...state, users];
    },
  },
  selectors: {
    selectUsers: (sliceState) => sliceState,
  },
});

export const userReducer = slice.reducer;
export const { addUser } = slice.actions;
export const { selectUsers } = slice.selectors;
