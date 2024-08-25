import { clsx } from "clsx";

import s from "./loader.module.scss";

import LoadingGif from "./../../assets/image/loading.gif";

type LoaderProps = {
  className?: string;
};

export const Loader = ({ className }: LoaderProps) => {
  const classNames = {
    loader: clsx(s.loader, className),
  };

  return (
    <div className={classNames.loader}>
      <img width={40} height={40} src={LoadingGif} alt={"Loading..."} />
    </div>
  );
};
