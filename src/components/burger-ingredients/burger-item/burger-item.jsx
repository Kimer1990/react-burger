import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-item.module.css";
import { burgerListItemPropTypes } from "../../../utils/prop-types";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";

export const BurgerItem = (props) => {
  const item = props.menuItem;
  const location = useLocation();

  const [, drag] = useDrag({
    type: "ingredients",
    item: item,
  });

  return (
    <Link
      to={{
        pathname: `/ingredients/${item._id}`,
        state: { background: location },
      }}
      className={styles.link}
    >
      <li ref={drag} className={styles.card} key={item._id}>
        <img className="ml-4 mr-4" src={item.image} alt={item.name} />
        <div className={styles.price}>
          <p className="mr-2 text text_type_digits-default">{item.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`mt-2 text text_type_main-small ${styles.desc}`}>
          {item.name}
        </p>
        {!!item.qnt && (
          <Counter className={styles.counter} count={item.qnt} size="default" />
        )}
      </li>
    </Link>
  );
};

BurgerItem.propTypes = {
  menuItem: burgerListItemPropTypes,
};
