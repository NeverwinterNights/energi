import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type AppState = {
  isLoading: boolean;
};

const initialState: AppState = {
  isLoading: false,
};

const slice = createSlice({
  initialState,
  name: "app",
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  selectors: {
    getIsLoading: (state: AppState) => state.isLoading,
  },
});

export const appReducer = slice.reducer;
export const { setLoading } = slice.actions;
export const { getIsLoading } = slice.selectors;
