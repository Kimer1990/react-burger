import styles from "./preloader.module.css";

export const Preloader = () => {
  return (
    <p className={`${styles.container} text text_type_main-large`}>
      Идет загрузка ...
    </p>
  );
};
