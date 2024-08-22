import s from "./main-component.module.scss";
import { Typography } from "@/components/ui";
import { useAppSelector } from "@/store/store";
import { getUserData } from "@/store/auth-slice";

export const MainComponent = () => {
  const users = useAppSelector(getUserData);
  console.log("users?.username", users?.username);
  console.log("users?.username == undefined ", users?.username == undefined);

  return (
    <div className={s.root}>
      <Typography
        className={s.title}
        as={"h1"}
        variant={"bold_text_16"}
      >{`Hello, ${users?.username == undefined ? "Guest" : users?.username}`}</Typography>
    </div>
  );
};
