import { Navigate, Outlet } from "react-router-dom";
import { PATH } from "@/router/path";
import { useAppSelector } from "@/store/store";
import { isAuthenticated } from "@/store/auth-slice";

export const PrivateRoute = () => {
  const isAuth = useAppSelector(isAuthenticated);
  console.log("isAuth", isAuth);
  // if (isLoading) return <MainLoader />

  return isAuth ? <Outlet /> : <Navigate to={PATH.LOGIN} />;
};
