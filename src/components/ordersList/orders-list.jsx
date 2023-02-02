import { Link, useLocation } from "react-router-dom";
import { ListItem } from "./listItem/list-item";
import PropTypes from "prop-types";
import { orderItemPropTypes } from "../../utils/prop-types";
import styles from "./orders-list.module.css";

export const OrdersList = ({ route, ordersList }) => {
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

OrdersList.propTypes = {
  route: PropTypes.string.isRequired,
  ordersList: PropTypes.arrayOf(orderItemPropTypes).isRequired,
};
