import { useMemo } from "react";
import { data } from "../../utils/data";
import styles from "./burger-constructor.module.css";
import PropTypes from "prop-types";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { burgerListItemPropTypes } from "../../utils/prop-types";

export const BurgerConstructor = () => {
  const countSum = data.reduce((acc, el) => acc + el.price, 0);
  const sum = useMemo(() => countSum, [countSum]);

  const getFillingList = data.filter((el) => el.type !== "bun");
  const fillingList = useMemo(() => getFillingList, [getFillingList]);

  return (
    <section className={`${styles.container} pl-4`}>
      <div className="pl-8 pr-4 mb-4">
        <ConstructorElement
          type={"top"}
          isLocked={true}
          text={data[0].name}
          price={data[0].price}
          thumbnail={data[0].image}
        />
      </div>
      <ul className={`customs-scroll pr-4 ${styles.list}`}>
        {fillingList.map((item) => {
          return (
            <li className={styles.li} key={item._id}>
              <DragIcon className="mr-3" style={{ cursor: "pointer" }} />
              <ConstructorElement
                isLocked={false}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </li>
          );
        })}
      </ul>

      <div className="pl-8 pr-4 pt-4 pb-10">
        <ConstructorElement
          type={"bottom"}
          isLocked={true}
          text={data[data.length - 1].name}
          price={data[data.length - 1].price}
          thumbnail={data[data.length - 1].image}
        />
      </div>

      <div className={`${styles.sum} pr-4`}>
        <div className="mr-10">
          <p className="mr-2 text text_type_digits-default">{sum}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(burgerListItemPropTypes),
};
