import { useContext } from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-item.module.css";
import PropTypes from "prop-types";
import { burgerListItemPropTypes } from "../../../utils/prop-types";
import { OrderContext } from "../../../services/orderContext";

export const BurgerItem = (props) => {
  const { addIngredient } = useContext(OrderContext);

  const showModal = () => {
    props.openModal(props.menuItem);
    addIngredient(props.menuItem);
  };

  return (
    <li className={styles.card} key={props.menuItem._id} onClick={showModal}>
      <img
        className="ml-4 mr-4"
        src={props.menuItem.image}
        alt={props.menuItem.name}
      />
      <div className={styles.price}>
        <p className="mr-2 text text_type_digits-default">
          {props.menuItem.price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`mt-2 text text_type_main-small ${styles.desc}`}>
        {props.menuItem.name}
      </p>
      {props.amount && (
        <Counter
          className={styles.counter}
          count={props.amount}
          size="default"
        />
      )}
    </li>
  );
};

BurgerItem.propTypes = {
  menuItem: burgerListItemPropTypes,
  openModal: PropTypes.func.isRequired,
  amount: PropTypes.number.isRequired,
};
