import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { OrderItem } from "./orderItem/order-item";
import { useSelector } from "react-redux";
import { ingredientTypes } from "../../utils/constant";
import { Preloader } from "../../components/preloader/Preloader";
import PropTypes from "prop-types";
import { orderItemPropTypes } from "../../utils/prop-types";
import styles from "./order-page.module.css";

export const OrderPage = ({ withTitle, orders }) => {
  const { BUN } = ingredientTypes;

  const params = useParams();

  const order = useMemo(() => {
    return orders.find(
      (item) => item.number.toString() === params.id.toString()
    );
  }, [orders, params.id]);

  const storeIngredients = useSelector(
    (state) => state.allIngredients.ingredientsList
  );

  const orderIngredients = useMemo(() => {
    if (storeIngredients.length && order?.ingredients?.length) {
      const ingredients = storeIngredients.filter((item) =>
        order.ingredients.includes(item._id)
      );
      return ingredients.map((item) => {
        const allCurIngredients = order.ingredients.filter(
          (elem) => elem === item._id
        );
        return {
          ...item,
          qnt: item.type === BUN ? 2 : allCurIngredients.length,
          price: item.price * allCurIngredients.length,
        };
      });
    }
    return [];
    // eslint-disable-next-line
  }, [storeIngredients, order]);

  const orderPrice = useMemo(() => {
    if (orderIngredients.length) {
      return orderIngredients.reduce(
        (acc, el) => (el.type === BUN ? acc + el.price * 2 : acc + el.price),
        0
      );
    }
    return 0;
    // eslint-disable-next-line
  }, [orderIngredients]);

  const statusText =
    order?.status === "done"
      ? "Выполнен"
      : order?.status === "pending"
      ? "Готовится"
      : "Отменен";
  const statusClass = order?.status === "done" ? "font-ready" : "";

  return (
    <div className={`${styles.main} pl-8 pr-8`}>
      {!order && <Preloader />}

      {order && (
        <>
          {withTitle && (
            <div
              className={`${styles.number} mt-30 text text_type_digits-medium mb-10`}
            >
              {`#${order?.number}`}
            </div>
          )}

          <div className={`text text_type_main-medium mb-3`}>{order.name}</div>

          <div className={`${statusClass} text text_type_main-default mb-15`}>
            {statusText}
          </div>

          <div className={`text text_type_main-medium mb-6`}>Состав:</div>

          <ul className={`customs-scroll mb-10 pr-24 ${styles.order} `}>
            {orderIngredients.map((item) => (
              <OrderItem key={item._id} {...item} />
            ))}
          </ul>

          <div className={`${styles.summary} pb-8`}>
            <div className="text text_type_main-default text_color_inactive">
              {<FormattedDate date={new Date(order.updatedAt)} />} i-GMT+
              {Math.abs(new Date().getTimezoneOffset()) / 60}
            </div>

            <div className={styles.count}>
              <span className="mr-2 text text_type_digits-default">
                {orderPrice}
              </span>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

OrderPage.propTypes = {
  withTitle: PropTypes.bool.isRequired,
  orders: PropTypes.arrayOf(orderItemPropTypes).isRequired,
};
