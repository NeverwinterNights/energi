import s from "./header.module.scss";
import { Button, Typography } from "@/components/ui";
import { useAppDispatch } from "@/store/store";
import { logout } from "@/store/auth-slice";
import { PATH } from "@/router";
import { useNavigate } from "react-router-dom";

type Props = {
  isAuth: boolean;
};

export const Header = ({ isAuth }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div className={s.main}>
      <Typography variant={"bold_text_14"}>Header</Typography>
      {isAuth ? (
        <Button onClick={logoutHandler} variant={"primary"}>
          Logout
        </Button>
      ) : (
        <Button onClick={() => navigate(PATH.LOGIN)} variant={"primary"}>
          Login
        </Button>
      )}
    </div>
  );
};
