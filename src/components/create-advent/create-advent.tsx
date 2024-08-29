import { useState } from "react";
import { useForm } from "react-hook-form";

import { ControlledInput } from "@/components/controlled/controlled-input";
import { ControlledTextArea } from "@/components/controlled/controlled-text-area";
import { Button, Modal, Typography } from "@/components/ui";
import {
  CreateAdventFormValues,
  createAdventSchema,
} from "@/schemas/create-advent-schema";
import { createAdvert } from "@/store/advert-slice";
import { getUserData } from "@/store/auth-slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";

import s from "./create-advent.module.scss";

export const CreateAdvent = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUserData);
  const [advertCreateModal, setAdvertCreateModal] = useState(false);
  const { handleSubmit, control, reset } = useForm<CreateAdventFormValues>({
    mode: "onBlur",
    resolver: zodResolver(createAdventSchema()),
    defaultValues: { category: "", title: "", descriptions: "" },
  });

  const onSubmit = async (data: CreateAdventFormValues) => {
    try {
      const userId = user?.uid!;

      await dispatch(
        createAdvert({
          advert: {
            nickname: user?.username!,
            title: data.title,
            category: data.category,
            description: data.descriptions,
            price: Number.parseInt(data.price),
            userId,
          },
          userId,
        }),
      ).unwrap();
      setAdvertCreateModal(true);
      console.log("Advert created successfully");
    } catch (error) {
      console.error("Failed to create advert", error);
    }
  };

  const createAdventModalHandler = () => {
    setAdvertCreateModal(false);
    reset();
  };

  return (
    <div className={s.root}>
      <Modal
        className={s.modal}
        title={"Advert successfully created"}
        isOpen={advertCreateModal}
        onOpenChange={createAdventModalHandler}
      >
        <>
          <Typography color={"inherit"} variant={"bold_text_14"}>
            Advert successfully created
          </Typography>

          <Button
            variant={"primary"}
            onClick={createAdventModalHandler}
            className={s.modalButton}
            fullWidth
          >
            <Typography color={"inherit"} variant={"h3"}>
              Close modal
            </Typography>
          </Button>
        </>
      </Modal>
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
            type={"text"}
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
