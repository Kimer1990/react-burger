import styles from "./orders-table.module.css";
import { FC } from "react";

type TOrdersTable = {
  status: string;
  orders: number[];
};

export const OrdersTable: FC<TOrdersTable> = ({ status, orders }) => {
  return (
    <div className={`${styles.status}`}>
      <div className="text text_type_main-medium mb-6">{`${status}:`}</div>
      <ul className={`${styles.list}`}>
        {orders.map((order) => (
          <li className="text text_type_digits-default font-ready" key={order}>
            {order}
          </li>
        ))}
      </ul>
    </div>
  );
};
