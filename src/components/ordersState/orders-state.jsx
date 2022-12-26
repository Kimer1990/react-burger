import { useMemo } from "react";
import { useSelector } from "react-redux";
import styles from "./orders-state.module.css";

export const OrdersState = () => {
  const orderItems = useSelector((state) => state.ws.orders);
  const orderTotal = useSelector((state) => state.ws.total);
  const orderTotalToday = useSelector((state) => state.ws.totalToday);
  const readyOrders = useMemo(
    () =>
      orderItems
        .filter((item) => item.status === "done")
        .map((item) => item.number),
    [orderItems]
  );
  const processOrders = useMemo(
    () =>
      orderItems
        .filter((item) => item.status !== "done")
        .map((item) => item.number),
    [orderItems]
  );

  return (
    <section className={`${styles.main} ml-15`}>
      <div className={`${styles.table} mb-15`}>
        <div className={`${styles.status}`}>
          <div className={`${styles.title} text text_type_main-medium mb-6`}>
            Готовы:
          </div>
          <ul className={`${styles.list}`}>
            {readyOrders.map((order, idx) => (
              <li
                className="text text_type_digits-default font-ready mb-2"
                key={idx}
              >
                {order}
              </li>
            ))}
          </ul>
        </div>

        <div className={`${styles.status}`}>
          <div className={`${styles.title} text text_type_main-medium mb-6`}>
            В работе:
          </div>
          <ul className={`${styles.list}`}>
            {processOrders.map((order, idx) => (
              <li className="text text_type_digits-default mb-2" key={idx}>
                {order}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mb-15">
        <div className="text text_type_main-medium">
          Выполнено за все время:
        </div>
        <div className="text text_type_digits-large text-highlight">
          {orderTotal}
        </div>
      </div>

      <div>
        <div className="text text_type_main-medium">Выполнено за сегодня:</div>
        <div className="text text_type_digits-large text-highlight">
          {orderTotalToday}
        </div>
      </div>
    </section>
  );
};
