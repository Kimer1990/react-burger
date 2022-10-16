import styles from "./order-details.module.css";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export const OrderDetails = () => {
  return (
    <div className={`${styles.container} pb-30`}>
      <p className={`${styles.number} text text_type_digits-large mb-8`}>
        034536
      </p>
      <p className={`${styles.identifier} text text_type_main-medium mb-15`}>
        идентификатор заказа
      </p>
      <CheckMarkIcon className={styles.img} />
      <p className={`${styles.status} text text_type_main-default mt-15 mb-2`}>
        Ваш заказ начали готовить
      </p>
      <p
        className={`${styles.info} text text_type_main-default text_color_inactive`}
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};
