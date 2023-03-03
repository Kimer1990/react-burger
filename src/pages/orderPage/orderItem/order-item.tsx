import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-item.module.css";
import { FC } from "react";

type TOrderItem = {
  image: string;
  name: string;
  qnt: number;
  price: number;
};

export const OrderItem: FC<TOrderItem> = ({ image, name, qnt, price }) => {
  return (
    <li className={`${styles.container} ml-4 mb-5 pr-10`}>
      <div className={styles.info}>
        <img className={styles.icon} src={image} alt={name} />
        <div className="text text_type_main-default ml-4">{name}</div>
      </div>
      <div className={styles.sum}>
        <div className={styles.count}>
          <span className="mr-2 text text_type_digits-default">{`${qnt} x ${price}`}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </li>
  );
};
