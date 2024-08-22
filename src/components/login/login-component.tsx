import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, Card, Typography } from "@/components/ui";
import { ControlledInput } from "@/components/controlled/controlled-input";
import { LoginFormValues, loginSchema } from "@/schemas/login-schema";
import s from "./login-component.module.scss";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/router";
import { useAppDispatch } from "@/store/store";
import { addUserAsync } from "@/store/auth-slice";

export const LoginComponent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { handleSubmit, control } = useForm<LoginFormValues>({
    mode: "onBlur",
    resolver: zodResolver(loginSchema()),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginFormValues) => {
    await dispatch(
      addUserAsync({ email: data.email, password: data.password }),
    );
    navigate(PATH.MAIN);
  };

  return (
    <Card className={s.card}>
      <Typography variant="h1" as="h1" className={s.title}>
        Sign In
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.fields}>
          <ControlledInput
            name="email"
            control={control}
            label={"Email"}
            type="email"
          />
          <ControlledInput
            type="password"
            label={"Password"}
            control={control}
            name="password"
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
