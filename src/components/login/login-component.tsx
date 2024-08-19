import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, Card, Typography } from "@/components/ui";
import { ControlledInput } from "@/components/controlled/controlled-input";
import { LoginFormValues, loginSchema } from "@/schemas/login-schema";
import s from "./login-component.module.scss";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { login } from "@/store/auth-slice";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/router";
import { selectUsers } from "@/store/user-slice";
import { useEffect } from "react";
import { phoneFormatter } from "@/helpers";

export const LoginComponent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { handleSubmit, control, watch, setValue } = useForm<LoginFormValues>({
    mode: "onBlur",
    resolver: zodResolver(loginSchema()),
    defaultValues: { email: "", phone: "", username: "" },
  });
  const users = useAppSelector(selectUsers);
  const phoneValue = watch("phone");

  // const addUserHandler = (data: CreateUserFormValues) => {
  //   dispatch(addUser(data));
  // };
  useEffect(() => {
    if (phoneValue !== undefined && phoneValue !== "") {
      const formattedPhone = phoneFormatter(phoneValue);
      setValue("phone", formattedPhone, { shouldValidate: false });
    }
  }, [phoneValue, setValue]);
  const onSubmit = async (data: LoginFormValues) => {
    try {
      dispatch(login({ ...data, users }));
      navigate(PATH.MAIN);
    } catch (e: any) {
      console.log("error", e);
    }
  };

  return (
    <Card className={s.card}>
      <Typography variant="h1" as="h1" className={s.title}>
        Sign In
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.fields}>
          <ControlledInput
            name="username"
            control={control}
            label={"Username"}
            type="text"
          />
          <ControlledInput
            name="email"
            control={control}
            label={"Email"}
            type="email"
          />
          <ControlledInput
            label={"Phone"}
            startIcon={"+"}
            control={control}
            name={"phone"}
          />
        </div>
        <Button
          variant="primary"
          fullWidth
          type="submit"
          className={s.submitBtn}
        >
          <Typography variant="h3"> Sign In</Typography>
        </Button>
      </form>
    </Card>
  );
};
