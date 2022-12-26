import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-item.module.css";

export const OrderItem = (item) => {
  return (
    <li className={`${styles.container} ml-4 mb-5 pr-10`}>
      <div className={styles.info}>
        <img className={styles.icon} src={item.image} alt={item.name} />
        <div className="text text_type_main-default ml-4">{item.name}</div>
      </div>
      <div className={styles.sum}>
        <div className={styles.count}>
          <span className="mr-2 text text_type_digits-default">{`${item.qnt} x ${item.price}`}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </li>
  );
};
