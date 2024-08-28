import ShowMoreText from "react-show-more-text";

import clsx from "clsx";

import s from "./expandable-text.module.scss";

type ExpandableTextProps = {
  text: null | string;
  className?: string;
  callback?: () => void;
};

export const ExpandableText = ({ text, className }: ExpandableTextProps) => {
  const executeOnClick = () => {
    // callback!()
  };

  return (
    <ShowMoreText
      lines={2}
      more={"Show more"}
      less={"Hide"}
      className={clsx(s.root, className)}
      anchorClass={s.anchor}
      // className="content-css"
      // anchorClass="show-more-less-clickable"
      onClick={executeOnClick}
      expanded={false}
      // width={280}
      truncatedEndingComponent={" "}
    >
      {text}
    </ShowMoreText>
  );
};
