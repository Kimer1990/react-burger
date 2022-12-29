import styles from "./orders-table.module.css";
import PropTypes from "prop-types";

export const OrdersTable = ({ status, orders }) => {
  return (
    <div className={`${styles.status}`}>
      <div className="text text_type_main-medium mb-6">{`${status}:`}</div>
      <ul className={`${styles.list}`}>
        {orders.map((order) => (
          <li
            className="text text_type_digits-default font-ready"
            key={order.number}
          >
            {order}
          </li>
        ))}
      </ul>
    </div>
  );
};

OrdersTable.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.number),
  status: PropTypes.string.isRequired,
};
