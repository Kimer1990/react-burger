import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import { OrderItem } from "./orderItem/order-item";
import { useSelector, useDispatch } from "react-redux";
import { ingredientTypes } from "../../utils/constant";
import { getOrder } from "../../services/actions/getOrderActions";
import { Preloader } from "../../components/preloader/Preloader";
import PropTypes from "prop-types";
import styles from "./order-page.module.css";

export const OrderPage = ({ title }) => {
  const { BUN } = ingredientTypes;

  const params = useParams();
  const dispatch = useDispatch();

  const order = useSelector((state) => state.getOrder.orderContent);
  const orderMakedRequest = useSelector(
    (state) => state.getOrder.orderMakedRequest
  );

  useEffect(() => {
    dispatch(getOrder(params.id));
  }, [dispatch, params.id]);

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

  return (
    <div className={`${styles.main} pl-8 pr-8`}>
      {orderMakedRequest && <Preloader />}

      {!orderMakedRequest && (
        <>
          {title && (
            <div
              className={`${styles.number} mt-30 text text_type_digits-medium mb-10`}
            >
              {`#${order.number}`}
            </div>
          )}

          <div className={`text text_type_main-medium mb-3`}>{order.name}</div>

          <div
            className={`${order.statusClass} text text_type_main-default mb-15`}
          >
            {order.status}
          </div>

          <div className={`text text_type_main-medium mb-6`}>Состав:</div>

          <ul className={`customs-scroll mb-10 pr-24 ${styles.order} `}>
            {orderIngredients.map((item) => (
              <OrderItem key={item._id} {...item} />
            ))}
          </ul>

          <div className={`${styles.summary} pb-8`}>
            <div className="text text_type_main-default text_color_inactive">
              {order.updatedAt}
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
  title: PropTypes.string,
};
