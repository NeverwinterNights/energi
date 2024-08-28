import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Button, Card, Modal, Typography } from "@/components/ui";
import { phoneFormatter } from "@/helpers";
import { PATH } from "@/router";
import {
  CreateUserFormValues,
  createUserModalSchema,
} from "@/schemas/create-user-modal-schema";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useAppDispatch } from "@/store/store";

import { createUserAsync } from "@/store/auth-slice";
import { useAppDispatch } from "@/store/store";

import s from "./sign-up.module.scss";

import { ControlledInput } from "../controlled/controlled-input";

export const SignUp = () => {
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    control,
    watch,
    formState: { isValid },
    setValue,
  } = useForm<CreateUserFormValues>({
    mode: "onBlur",
    resolver: zodResolver(createUserModalSchema()),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      phone: "",
      password: "",
    },
  });
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const phoneValue = watch("phone");

  useEffect(() => {
    if (phoneValue !== undefined && phoneValue !== "") {
      const formattedPhone = phoneFormatter(phoneValue);

      setValue("phone", formattedPhone, { shouldValidate: false });
    }
  }, [phoneValue, setValue]);

  const onSubmit = async (data: CreateUserFormValues) => {
    try {
      await dispatch(createUserAsync(data)).unwrap(); // Запускаем thunk
      setIsOpen(true);
    } catch (error: any) {
      console.error("Error signing up:", error.message);
    }
  };

  // const onSubmit = async (data: CreateUserFormValues) => {
  //   try {
  //     const userCredential = await createUserWithEmailAndPassword(
  //       auth,
  //       data.email,
  //       data.password,
  //     );
  //
  //     const user = userCredential.user;
  //
  //     await setDoc(doc(db, "users", user.uid), {
  //       firstName: data.firstName,
  //       lastName: data.lastName,
  //       phone: data.phone,
  //       email: data.email,
  //       username: data.username,
  //       createdAt: user.metadata.creationTime,
  //     });
  //     console.log("User signed up and data saved:", user.uid);
  //     setIsOpen(true);
  //   } catch (error: any) {
  //     console.error("Error signing up:", error.message);
  //   }
  // };
  const handleChangeModal = () => {
    setIsOpen(false);
    navigate(PATH.LOGIN);
  };

  return (
    <>
      <Modal
        className={s.modal}
        title={"User successfully created"}
        isOpen={isOpen}
        onOpenChange={() => setIsOpen(false)}
      >
        <>
          <Typography color={"inherit"} variant={"bold_text_14"}>
            User successfully created
          </Typography>

          <Button
            variant={"primary"}
            onClick={handleChangeModal}
            className={s.modalButton}
            fullWidth
          >
            <Typography color={"inherit"} variant={"h3"}>
              Move to Login page
            </Typography>
          </Button>
        </>
      </Modal>
      <Card className={s.card}>
        <Typography className={s.text} variant={"bold_text_16"} as={"div"}>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className={s.root}>
          <ControlledInput
            label={"Username"}
            control={control}
            name={"username"}
          />
          <ControlledInput
            label={"First Name"}
            control={control}
            name={"firstName"}
          />
          <ControlledInput
            label={"Last Name"}
            control={control}
            name={"lastName"}
          />
          <ControlledInput label={"Email"} control={control} name={"email"} />
          <ControlledInput
            label={"Phone"}
            startIcon={"+"}
            control={control}
            name={"phone"}
          />
          <ControlledInput
            type={"password"}
            label={"Password"}
            control={control}
            name={"password"}
          />
          <div className={s.btnFooter}>
            <Button
              disabled={!isValid}
              fullWidth
              type={"submit"}
              className={s.btn}
              variant={"primary"}
            >
              Create User
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
};
