import { Link, useLocation } from "react-router-dom";
import { ListItem } from "./listItem/list-item";
import styles from "./orders-list.module.css";

export const OrdersList = ({ route, ordersList }) => {
  const location = useLocation();

  return (
    <section className={`${styles.orders} customs-scroll pr-2`}>
      {ordersList.map((item, idx) => {
        return (
          <Link
            key={idx}
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
