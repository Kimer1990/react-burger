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
  const { orderList, setOrderList } = useContext(OrderContext);

  const showModal = () => {
    props.openModal(props.menuItem);
    setOrderList(addIngredient());
  };

  //Временное добавление ингридиента
  const addIngredient = () => {
    const bunId = orderList.findIndex(
      (item) => item.type === "bun" && item.type === props.menuItem.type
    );
    if (bunId !== -1) {
      orderList.splice(bunId, 1, props.menuItem);
    } else if (!orderList.find((item) => item._id === props.menuItem._id)) {
      orderList.push(props.menuItem);
    }
    return [...orderList];
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
  orderList: PropTypes.arrayOf(burgerListItemPropTypes),
};
