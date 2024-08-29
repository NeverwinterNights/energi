import { memo, useState } from "react";

import clsx from "clsx"; // Импортируем clsx для объединения классов
import ShowMoreText from "react-show-more-text";

import { CloseModal } from "@/assets/icons";
import { Button, Modal, Typography } from "@/components/ui";
import { deleteAdvert } from "@/store/advert-slice";
import { useAppDispatch } from "@/store/store";

import s from "./advert-card.module.scss";

type Props = {
  advert: AdvertItem;
  className?: string;
  isMyAdvert?: boolean;
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
  nickname: string;
};

export const AdvertCard = memo(({ advert, className, isMyAdvert }: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  const collapsedTextHandler = () => {
    setIsCollapsed(!isCollapsed);
  };
  const modalDeleteHandler = async () => {
    try {
      await dispatch(
        deleteAdvert({ advertId: advert.id, userId: advert.userId }),
      ).unwrap();
      // await dispatch(fetchAdvertsWithPagination({ limit: 10 }));

      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to create advert", error);
    }
  };
  const closedModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        className={s.modal}
        title={"Delete Advert"}
        isOpen={isModalOpen}
        onOpenChange={closedModal}
        contentClassName={s.modalBody}
      >
        <>
          <Typography
            color={"inherit"}
            className={s.modalText}
            variant={"bold_text_14"}
          >
            Delete Advert?
          </Typography>
          <div className={s.buttons}>
            <Button
              variant={"primary"}
              onClick={modalDeleteHandler}
              className={s.modalButton}
              fullWidth
            >
              <Typography color={"inherit"} variant={"h3"}>
                Delete Advert
              </Typography>
            </Button>
            <Button
              variant={"secondary"}
              onClick={closedModal}
              className={s.modalButton}
              fullWidth
            >
              <Typography color={"inherit"} variant={"h3"}>
                Close modal
              </Typography>
            </Button>
          </div>
        </>
      </Modal>

      <div className={clsx(s.wrapper, className)}>
        <div className={clsx(s.card, className)}>
          <div className={s.header}>
            <h2 className={s.title}>{advert.title}</h2>
            {isMyAdvert && (
              <CloseModal
                onClick={() => setIsModalOpen(true)}
                className={s.close}
              />
            )}
          </div>
          <Typography
            as={"span"}
            variant={"regular_text_14"}
            className={s.owner}
          >
            Advert creator:
            <Typography as={"span"} variant={"bold_text_14"}>
              {` ${advert.nickname}`}
            </Typography>
          </Typography>
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
            <span>
              Created: {new Date(advert.created).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </>
  );
});
