import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Modal, Typography } from "@/components/ui";
import { PATH } from "@/router";
import { logoutUser } from "@/store/auth-slice";
import { useAppDispatch } from "@/store/store";

import s from "./header.module.scss";

type Props = {
  isAuth: boolean;
};

export const Header = ({ isAuth }: Props) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  // const isLoading = useAppSelector(getIsLoading);

  const logoutHandler = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleModalClosed = () => {
    setIsModalOpen(false);
  };
  const handleModalOpened = async () => {
    try {
      dispatch(logoutUser());
      setIsModalOpen(false);
      navigate(PATH.HOME);
    } catch (error: any) {
      console.error("Error logging out:", error.message);
    }
  };

  // if (isLoading) {
  //   return <Loader />;
  // }

  return (
    <>
      <Modal
        onOpenChange={handleModalClosed}
        className={s.modal}
        isOpen={isModalOpen}
        title={"Are You Sure Wannna Logout?"}
      >
        <>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button onClick={handleModalOpened} variant={"primary"}>
              Logout
            </Button>
            <Button onClick={handleModalClosed} variant={"secondary"}>
              Cancel
            </Button>
          </div>
        </>
      </Modal>
      <div className={s.main}>
        <Typography variant={"bold_text_14"}>Header</Typography>
        {isAuth ? (
          <Button onClick={logoutHandler} variant={"primary"}>
            Logout
          </Button>
        ) : (
          <div className={s.buttons}>
            <Button onClick={() => navigate(PATH.CREATE)} variant={"primary"}>
              Sign Up
            </Button>
            <Button onClick={() => navigate(PATH.LOGIN)} variant={"primary"}>
              Sign In
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
