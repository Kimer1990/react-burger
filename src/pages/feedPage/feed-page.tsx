import styles from "./feed-page.module.css";
import { OrdersList } from "../../components/ordersList/orders-list";
import { Preloader } from "../../components/preloader/Preloader";
import { useEffect } from "react";
import {
  feedWsConnectionStart,
  feedWsConnectionClose,
} from "../../services/actions/feedWsActions";
import { OrdersState } from "../../components/ordersState/orders-state";
import { useDispatch, useSelector } from "../../hooks";

export const FeedPage = () => {
  const dispatch = useDispatch();

  const isCreated = useSelector((state) => state.feedWs.isCreated);
  const isConnected = useSelector((state) => state.feedWs.isOpen);
  const List = useSelector((state) => state.feedWs.orders);

  useEffect(() => {
    if (!isCreated && !isConnected) {
      dispatch(feedWsConnectionStart("/all"));
    }

    return () => {
      if (isConnected) {
        dispatch(feedWsConnectionClose());
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
