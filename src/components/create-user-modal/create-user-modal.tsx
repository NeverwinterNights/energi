import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import s from "./create-user-modal.module.scss";
import { Button, Card, Typography } from "@/components/ui";
import {
  CreateUserFormValues,
  createUserModalSchema,
} from "@/schemas/create-user-modal-schema";
import { ControlledInput } from "../controlled/controlled-input";
import { useEffect } from "react";
import { phoneFormatter } from "@/helpers";
import { addUser } from "@/store/user-slice";
import { useAppDispatch } from "@/store/store";

// type Props = {
//   // onClick: (data: CreateUserFormValues) => void;
// };

export const CreateUserModal = () => {
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
    },
  });
  const dispatch = useAppDispatch();

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

  const onSubmit = (data: CreateUserFormValues) => {
    try {
      dispatch(addUser(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className={s.card}>
      <Typography className={s.text} variant="bold_text_16" as="div">
        Create User
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
