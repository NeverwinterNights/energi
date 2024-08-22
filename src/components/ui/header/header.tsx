import s from "./header.module.scss";
import { Button, Modal, Typography } from "@/components/ui";
import { PATH } from "@/router";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { logoutUser } from "@/store/auth-slice";

type Props = {
  isAuth: boolean;
};

export const Header = ({ isAuth }: Props) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const logoutHandler = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleModalClosed = () => {
    setIsModalOpen(false);
  };
  const handleModalOpened = async () => {
    try {
      logoutUser();
      setIsModalOpen(false);
      navigate(PATH.HOME);
    } catch (error: any) {
      console.error("Error logging out:", error.message);
    }
  };
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
            <Button onClick={handleModalOpened} variant="primary">
              Logout
            </Button>
            <Button onClick={handleModalClosed} variant="secondary">
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
