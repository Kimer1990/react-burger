import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-item.module.css";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import { TIngredient } from "../../../services/types/data";

export const BurgerItem = ({ ingredient }: TIngredient) => {
  const location = useLocation();

  const [, drag] = useDrag({
    type: "ingredients",
    item: ingredient,
  });

  return (
    <Link
      to={{
        pathname: `/ingredients/${ingredient._id}`,
        state: { background: location },
      }}
      className={styles.link}
    >
      <li ref={drag} className={styles.card} key={ingredient._id}>
        <img
          className="ml-4 mr-4"
          src={ingredient.image}
          alt={ingredient.name}
        />
        <div className={styles.price}>
          <p className="mr-2 text text_type_digits-default">
            {ingredient.price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`mt-2 text text_type_main-small ${styles.desc}`}>
          {ingredient.name}
        </p>
        {!!ingredient.qnt && (
          <Counter
            extraClass={styles.counter}
            count={ingredient.qnt}
            size="default"
          />
        )}
      </li>
    </Link>
  );
};
