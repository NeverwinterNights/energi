import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import s from "./sign-up.module.scss";
import { Button, Card, Typography } from "@/components/ui";
import {
  CreateUserFormValues,
  createUserModalSchema,
} from "@/schemas/create-user-modal-schema";
import { ControlledInput } from "../controlled/controlled-input";
import { useEffect } from "react";
import { phoneFormatter } from "@/helpers";
// import { useAppDispatch } from "@/store/store";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";

export const SignUp = () => {
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
  // const dispatch = useAppDispatch();

  const phoneValue = watch("phone");

  useEffect(() => {
    if (phoneValue !== undefined && phoneValue !== "") {
      const formattedPhone = phoneFormatter(phoneValue);
      setValue("phone", formattedPhone, { shouldValidate: false });
    }
  }, [phoneValue, setValue]);

  const onSubmit = async (data: CreateUserFormValues) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      const user = userCredential.user;

      // Сохранение дополнительных данных в Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        email: data.email,
        username: data.username,
      });
      console.log("User signed up and data saved:", user.uid);
    } catch (error: any) {
      console.error("Error signing up:", error.message);
    }
  };

  return (
    <Card className={s.card}>
      <Typography className={s.text} variant="bold_text_16" as="div">
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
          type="password"
          label={"Password"}
          control={control}
          name="password"
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
  );
};
