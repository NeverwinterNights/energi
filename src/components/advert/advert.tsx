import { Typography } from "@/components/ui";

import s from "./advert.module.scss";

export const Advert = () => {
  return (
    <div className={s.root}>
      <Typography variant={"bold_text_16"}>Add Advert</Typography>
      <form></form>
    </div>
  );
};
