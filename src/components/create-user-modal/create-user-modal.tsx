import React, { useState } from "react";
import { Button, ControlledSelect, Typography } from "@/components";
import { useTranslation } from "@/hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BanFormValues, banModalSchema } from "@/schemas/ban-modal-schema";
import { Trans } from "@/components/trans";
import s from "./ban-modal.module.scss";
import { ControlledTextArea } from "@/components/controlled/controlled-text-area";

type Props = {
  name: string;
  onClick: (data: BanFormValues) => void;
  onCancelClick: () => void;
  banned: boolean;
};

export const BanModal = ({ name, onClick, onCancelClick, banned }: Props) => {
  const [textAreaValue, setTextAreaValue] = useState("");
  const { t } = useTranslation();
  const selectOptions = [
    { label: t.banModal.bad, value: t.banModal.bad },
    { label: t.banModal.advertising, value: t.banModal.advertising },
    { label: t.banModal.another, value: t.banModal.another },
  ];

  const { handleSubmit, watch, control } = useForm<BanFormValues>({
    mode: "onChange",
    resolver: zodResolver(banModalSchema(t)),
    defaultValues: { reason: "" },
  });

  const onSubmit = (data: BanFormValues) => {
    try {
      onClick(data);
    } catch (error) {
      console.log(error);
    }
  };

  const textAreaHandler = (value: string) => {
    setTextAreaValue(value);
  };

  return (
    <>
      {banned ? (
        <div>
          <Typography className={s.text} variant="regular_text_16" as="span">
            <Trans
              text={t.userList.areYouUnBanUser(name)}
              tags={{
                "1": (name) => (
                  <Typography variant="bold_text_16" color="inherit" as="span">
                    {name}
                  </Typography>
                ),
              }}
            />
          </Typography>
          <div className={s.btnFooter}>
            <Button
              onClick={onCancelClick}
              className={s.btn}
              variant={"primary"}
            >
              {t.no}
            </Button>
            <Button onClick={onClick} className={s.btn} variant={"ghost"}>
              {t.ok}
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography className={s.text} variant="regular_text_16" as="span">
            <Trans
              text={t.userList.areYouBanUser(name)}
              tags={{
                "1": (name) => (
                  <Typography variant="bold_text_16" color="inherit" as="span">
                    {name}
                  </Typography>
                ),
              }}
            />
          </Typography>
          <div className={s.selectWrapper}>
            <ControlledSelect
              className={s.select}
              name={"reason"}
              control={control}
              options={selectOptions}
              placeholder={t.banModal.reasonForBan}
            />
            {watch("reason") === t.banModal.another && (
              <ControlledTextArea
                counter={100}
                className={s.rootTextArea}
                classNameTextArea={s.textArea}
                rows={5}
                control={control}
                name={"textArea"}
                setValueFromForm={textAreaHandler}
              />
            )}
          </div>

          <div className={s.btnFooter}>
            <Button
              onClick={onCancelClick}
              className={s.btn}
              variant={"primary"}
            >
              {t.no}
            </Button>
            <Button type={"submit"} className={s.btn} variant={"ghost"}>
              {t.ok}
            </Button>
          </div>
        </form>
      )}
    </>
  );
};
