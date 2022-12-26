import styles from "./feed-page.module.css";
import { OrdersList } from "../../components/ordersList/orders-list";
import { Preloader } from "../../components/preloader/Preloader";
import { useEffect } from "react";
import {
  wsConnectionStart,
  wsConnectionClose,
} from "../../services/actions/wsActions";
import { OrdersState } from "../../components/ordersState/orders-state";
import { useSelector, useDispatch } from "react-redux";

export const FeedPage = () => {
  const dispatch = useDispatch();

  const isCreated = useSelector((state) => state.ws.isCreated);
  const isConnected = useSelector((state) => state.ws.isOpen);
  const List = useSelector((state) => state.ws.orders);

  useEffect(() => {
    if (!isCreated && !isConnected) {
      dispatch(wsConnectionStart("/all"));
    }

    return () => {
      if (isConnected) {
        dispatch(wsConnectionClose());
      }
    };
  }, [dispatch, isConnected, isCreated]);

  return (
    <main className={`${styles.main} pl-5 pr-5`}>
      <div
        className={`${styles.header} header text text_type_main-large pt-10 pb-5`}
      >
        Лента заказов
      </div>

      {!isConnected && <Preloader />}

      {isConnected && (
        <div className={styles.body}>
          <OrdersList ordersList={List} route="/feed" />
          <OrdersState />
        </div>
      )}
    </main>
  );
};
