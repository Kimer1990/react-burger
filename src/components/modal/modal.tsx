import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../modalOverlay/modal-overlay";
import styles from "./modal.module.css";
import { useEffect, FC } from "react";

const ESC_KEYCODE = 27;
const modalRoot: any = document.getElementById("react-modals");

type TModal = {
  title: string;
  titleNumber: boolean;
  children: any;
  closeModal: () => void;
};

export const Modal: FC<TModal> = ({
  title,
  titleNumber = false,
  children,
  closeModal,
}) => {
  useEffect(() => {
    const onTapEsc = (event: KeyboardEvent): void => {
      if (event.keyCode === ESC_KEYCODE) {
        closeModal();
      }
    };

    document.addEventListener("keyup", onTapEsc);

    return () => {
      document.removeEventListener("keyup", onTapEsc);
    };
  }, [closeModal]);

  return ReactDOM.createPortal(
    <div className={styles.container}>
      <ModalOverlay closeModal={closeModal} />

      <div className={`${styles.modal}`}>
        <div className={`${styles.header} p-10`}>
          <span
            className={`text ${
              titleNumber ? "text_type_digits-medium" : "text_type_main-large"
            }`}
          >
            {title || ""}
          </span>
          <CloseIcon onClick={closeModal} type="primary" />
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>,
    modalRoot
  );
};
