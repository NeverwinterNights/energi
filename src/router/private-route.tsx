import { Navigate, Outlet } from "react-router-dom";

import { PATH } from "@/router/path";
import { isAuth } from "@/store/auth-slice";
import { useAppSelector } from "@/store/store";

export const PrivateRoute = () => {
  const isAuthUser = useAppSelector(isAuth);

  // if (isLoading) return <MainLoader />

  return isAuthUser ? <Outlet /> : <Navigate to={PATH.MAIN} />;
};
