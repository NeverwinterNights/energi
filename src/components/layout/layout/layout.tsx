import { Outlet } from "react-router-dom";

import { Header } from "@/components/ui/header";
import { useAppSelector } from "@/store/store";
import { isAuth } from "@/store/auth-slice";

export const Layout = () => {
  // const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  const isAuthUser = useAppSelector(isAuth);

  // const onSignOut = () => {
  //   // logout()
  //   //   .unwrap()
  //   //   .then(() => {
  //   //     dispatch(util?.resetApiState())
  //   //     navigate(PATH.LOGIN)
  //   //   })
  //   //   .catch(error => {
  //   //     toast(error)
  //   //   })
  // };

  return (
    <div>
      <Header isAuth={isAuthUser} />
      <Outlet />
    </div>
  );
};
