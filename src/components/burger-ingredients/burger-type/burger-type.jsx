import { BurgerItem } from "../burger-item/burger-item";
import styles from "./burger-type.module.css";
import PropTypes from "prop-types";
import { burgerListItemPropTypes } from "../../../utils/prop-types";

export const BurgerType = (props) => {
  return (
    <div id={props.id}>
      <h2 className={styles.title}>{props.title}</h2>
      <ul className={`pt-6 pb-10 pl-4 pr-2 ${styles.items}`}>
        {props.list.map((item) => (
          <BurgerItem
            menuItem={item}
            openModal={props.openModal}
            key={item._id}
          ></BurgerItem>
        ))}
      </ul>
    </div>
  );
};

BurgerType.propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(burgerListItemPropTypes),
  openModal: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};
