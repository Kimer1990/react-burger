import { useMemo } from "react";
import { useSelector } from "../../hooks";
import { OrdersTable } from "./ordersTable/orders-table";
import styles from "./orders-state.module.css";
import { TOrdersListItem } from "../../services/types/data";

export const OrdersState = () => {
  const orderItems: Array<TOrdersListItem> = useSelector(
    (state) => state.feedWs.orders
  );
  const orderTotal = useSelector((state) => state.feedWs.total);
  const orderTotalToday = useSelector((state) => state.feedWs.totalToday);
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
        .filter((item) => item.status === "pending")
        .map((item) => item.number),
    [orderItems]
  );

  return (
    <section className={`${styles.main} ml-15`}>
      <div className={`${styles.table} mb-15`}>
        <div className={styles.done}>
          <OrdersTable status="Готовы" orders={readyOrders}></OrdersTable>
        </div>
        <div className={styles.pending}>
          <OrdersTable status="В работе" orders={processOrders}></OrdersTable>
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
