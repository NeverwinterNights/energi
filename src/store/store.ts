import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userReducer } from "@/store/user-slice";
import { authReducer } from "@/store/auth-slice";
import { advertReducer } from "@/store/advert-slice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    auth: authReducer,
    advert: advertReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

setupListeners(store.dispatch);
