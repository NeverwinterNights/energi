import React from "react";

import { Typography } from "@/components/ui";
import { useTimeAgo } from "@/hooks";
import { User } from "@/types";
import { clsx } from "clsx";

import s from "./user-card.module.scss";

type Props = {
  user: User;
  className?: string;
};
export const UserCard = React.memo(({ user, className }: Props) => {
  const classNames = {
    container: clsx(s.root, className),
  };

  return (
    <div className={classNames.container}>
      <Typography variant={"bold_text_14"}>{user.username}</Typography>
      <Typography
        variant={"bold_text_14"}
      >{`${user.firstName} ${user.lastName}`}</Typography>
      <Typography> Email: {user.email}</Typography>
      <Typography> Phone: {user.phone}</Typography>
      <Typography> Number of posts: {user.posts}</Typography>
      <Typography>
        Registered: {useTimeAgo(new Date(user.createdAt!))}
      </Typography>
    </div>
  );
});
