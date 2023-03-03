import styles from "./modal-overlay.module.css";

export const ModalOverlay = (props: { closeModal: () => void }) => {
  return <div onClick={props.closeModal} className={styles.overlay}></div>;
};
