import { ComponentProps, ReactElement, ReactNode } from "react";

import * as Dialog from "@radix-ui/react-dialog";
import { clsx } from "clsx";

import s from "./modal.module.scss";

import { Typography } from "../typography";
import { CloseModal } from "@/assets/icons";

type PointerDownOutsideEvent = CustomEvent<{
  originalEvent: PointerEvent;
}>;
type FocusOutsideEvent = CustomEvent<{
  originalEvent: FocusEvent;
}>;

export type ModalType = {
  additionalContent?: ReactElement;
  children?: ReactNode;
  closeButtonClass?: string;
  contentClassName?: string;
  isOpen: boolean;
  onInteractOutside?: (
    event: FocusOutsideEvent | PointerDownOutsideEvent,
  ) => void;
  onOpenChange?: (value: boolean) => void;
  postHeader?: ReactNode;
  title?: string;
} & ComponentProps<"div">;

export const Modal = ({
  additionalContent,
  children,
  className,
  closeButtonClass,
  contentClassName,
  isOpen,
  onInteractOutside,
  onOpenChange,
  postHeader,
  title,
}: ModalType) => {
  const classNames = {
    closeButton: clsx(s.iconButton, closeButtonClass && closeButtonClass),
    container: clsx(s.dialogContent, className && className),
    content: clsx(s.content, contentClassName && contentClassName),
  };

  return (
    <Dialog.Root onOpenChange={onOpenChange} open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className={s.dialogOverlay} />
        <Dialog.Content
          className={classNames.container}
          onInteractOutside={onInteractOutside}
          aria-describedby={undefined}
        >
          {additionalContent}
          <div>
            <div className={s.header}>
              <Dialog.Title>
                {postHeader ?? <Typography variant={"h1"}>{title}</Typography>}
              </Dialog.Title>
              <Dialog.Close
                aria-label={"Close"}
                className={classNames.closeButton}
              >
                <CloseModal />
              </Dialog.Close>
            </div>
            <div className={classNames.content}>{children}</div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
