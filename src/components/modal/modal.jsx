import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../modalOverlay/modalOverlay";
import styles from "./modal.module.css";
import { useEffect } from "react";

const ESC_KEYCODE = 27;
const modalRoot = document.getElementById("root");

export const Modal = ({ title, children, closeModal }) => {
  useEffect(() => {
    const onTapEsc = (event) => {
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
          <span className="text text_type_main-large">{title || ""}</span>
          <CloseIcon onClick={closeModal} type="primary" />
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>,
    modalRoot
  );
};
