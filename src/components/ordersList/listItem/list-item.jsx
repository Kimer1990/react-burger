import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { ingredientTypes } from "../../../utils/constant";
import { useLocation } from "react-router-dom";
import styles from "./list-item.module.css";

export const ListItem = ({ name, number, status, updatedAt, ingredients }) => {
  const { BUN } = ingredientTypes;
  const location = useLocation();

  const statusText =
    status === "done"
      ? "Выполнен"
      : status === "pending"
      ? "Готовится"
      : "Отменен";
  const statusClass = status === "done" ? "font-ready" : "";

  const storeIngredients = useSelector(
    (state) => state.allIngredients.ingredientsList
  );
  const limitIngredients = 6;

  const orderIngredients = useMemo(
    () =>
      storeIngredients.filter((item) => {
        const _id = item._id || "";
        return ingredients.includes(_id);
      }),
    [storeIngredients, ingredients]
  );

  const ingredientsVisible = orderIngredients.slice(0, limitIngredients);
  const overLimitQnt =
    orderIngredients.length > limitIngredients
      ? orderIngredients.length - limitIngredients
      : null;

  const orderPrice = useMemo(() => {
    return orderIngredients.reduce(
      (acc, el) => (el.type === BUN ? acc + el.price * 2 : acc + el.price),
      0
    );
    // eslint-disable-next-line
  }, [orderIngredients]);

  return (
    <div className={`${styles.item} mb-4`}>
      <div className={styles.title}>
        <div className="text text_type_digits-default">{`#${number}`}</div>

        <div className="text text_type_main-default text_color_inactive">
          {<FormattedDate date={new Date(updatedAt)} />} i-GMT+3
        </div>
      </div>

      <div className="text-overflow-ellipsis text text_type_main-medium">
        {name}
      </div>

      {location.pathname === "/profile/orders" && (
        <div className={`${styles.status} ${statusClass}`}>{statusText}</div>
      )}

      <div className={styles.details}>
        <div className={`${styles.list} ml-4`}>
          {ingredientsVisible.map((item) => (
            <img
              key={item._id}
              className={styles.icon}
              src={item.image}
              alt={item.name}
            />
          ))}
          {overLimitQnt && (
            <div className={styles["overlimit"]}>{`+${overLimitQnt}`}</div>
          )}
        </div>

        <div className={styles.count}>
          <span className="mr-2 text text_type_digits-default">
            {orderPrice}
          </span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
