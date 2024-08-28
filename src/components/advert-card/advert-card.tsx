import { memo, useState } from "react";

import clsx from "clsx"; // Импортируем clsx для объединения классов
import ShowMoreText from "react-show-more-text";

import s from "./advert-card.module.scss";

type Props = {
  advert: AdvertItem;
  className?: string;
};
type AdvertItem = {
  category: string;
  created: string;
  description: string;
  id: string;
  modified: string;
  price: number;
  title: string;
  userId: string;
  views: number;
};

export const AdvertCard = memo(({ advert, className }: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const collapsedTextHandler = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={clsx(s.wrapper, className)}>
      <div className={clsx(s.card, className)}>
        <h2 className={s.title}>{advert.title}</h2>
        <p className={s.price}>{advert.price} $</p>
        <div className={s.desc}>
          <ShowMoreText
            lines={2}
            more={"Show more"}
            less={"Hide"}
            className={`${s.rootDesc} ${isCollapsed ? s.scrolled : ""}`}
            anchorClass={s.anchor}
            onClick={collapsedTextHandler}
            expanded={false}
            // width={140}
            width={0}
          >
            {advert.description}
          </ShowMoreText>
        </div>

        {/*<ExpandableText className={s.description} text={advert.description}/>*/}
        {/*<p className={s.description}>{advert.description}</p>*/}
        <p className={s.category}>Category: {advert.category}</p>
        <div className={s.meta}>
          <span>Views: {advert.views}</span>
          <span>Created: {new Date(advert.created).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
});
