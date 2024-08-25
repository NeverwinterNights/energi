import { useForm } from "react-hook-form";

import { ControlledInput } from "@/components/controlled/controlled-input";
import { ControlledTextArea } from "@/components/controlled/controlled-text-area";
import { Button, Typography } from "@/components/ui";
import {
  CreateAdventFormValues,
  createAdventSchema,
} from "@/schemas/create-advent-schema";
import { zodResolver } from "@hookform/resolvers/zod";

import s from "./create-advent.module.scss";

export const CreateAdvent = () => {
  const { handleSubmit, control } = useForm<CreateAdventFormValues>({
    mode: "onBlur",
    resolver: zodResolver(createAdventSchema()),
    defaultValues: { category: "", title: "", descriptions: "" },
  });
  const onSubmit = async (data: CreateAdventFormValues) => {
    console.log("value", data);
  };

  return (
    <div className={s.root}>
      <Typography variant={"bold_text_14"} className={s.title}>
        Create advent
      </Typography>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.fields}>
          <ControlledInput
            name={"title"}
            control={control}
            label={"Title"}
            type={"text"}
          />
          <ControlledInput
            type={"text"}
            label={"Category"}
            control={control}
            name={"category"}
          />
          <ControlledInput
            type={"number"}
            label={"Price"}
            control={control}
            name={"price"}
          />
          <ControlledTextArea
            classNameTextArea={s.textarea}
            label={"Descriptions"}
            name={"descriptions"}
            control={control}
            counter={300}
            rows={6}
          />
        </div>
        <Button
          variant={"primary"}
          fullWidth
          type={"submit"}
          className={s.submitBtn}
        >
          {" "}
          <Typography variant={"h3"}> Create Advent</Typography>
        </Button>
      </form>
    </div>
  );
};
