import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { advertReducer } from "@/store/advert-slice";
import { appReducer } from "@/store/app-slice";
import { authReducer } from "@/store/auth-slice";
import { userReducer } from "@/store/user-slice";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    advert: advertReducer,
    auth: authReducer,
    users: userReducer,
    app: appReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

setupListeners(store.dispatch);
