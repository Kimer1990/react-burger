import { Link, useLocation } from "react-router-dom";
import { ListItem } from "./listItem/list-item";
import styles from "./orders-list.module.css";
import { TOrdersListItem } from "../../services/types/data";
import { FC } from "react";

type TOrdersList = {
  route: string;
  ordersList: Array<TOrdersListItem>;
};

export const OrdersList: FC<TOrdersList> = ({ route, ordersList }) => {
  const location = useLocation();

  return (
    <section className={`${styles.orders} customs-scroll pr-2`}>
      {ordersList?.map((item) => {
        return (
          <Link
            key={item._id}
            to={{
              pathname: `${route}/${item.number}`,
              state: { background: location },
            }}
            className={styles.link}
          >
            <ListItem {...item} />
          </Link>
        );
      })}
    </section>
  );
};
