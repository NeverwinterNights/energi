import { Navigate, Outlet } from "react-router-dom";
import { PATH } from "@/router/path";
import { useAppSelector } from "@/store/store";
import { isAuth } from "@/store/auth-slice";

export const PrivateRoute = () => {
  const isAuthUser = useAppSelector(isAuth);
  console.log("isAuth", isAuth);
  // if (isLoading) return <MainLoader />

  return isAuthUser ? <Outlet /> : <Navigate to={PATH.LOGIN} />;
};
