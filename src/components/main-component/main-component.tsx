import s from "./main-component.module.scss";
import { Typography } from "@/components/ui";
import { useAppSelector } from "@/store/store";
import { userData } from "@/store/auth-slice";

export const MainComponent = () => {
  const users = useAppSelector(userData);
  return (
    <div className={s.root}>
      <Typography
        className={s.title}
        as={"h1"}
        variant={"bold_text_16"}
      >{`Hello, ${users.username}`}</Typography>
    </div>
  );
};
