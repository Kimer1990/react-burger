import { useMemo, useState } from "react";
import styles from "./burger-constructor.module.css";
import PropTypes from "prop-types";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { burgerListItemPropTypes } from "../../utils/prop-types";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../orderDetails/orderDetails";

export const BurgerConstructor = ({ ingredients }) => {
  const countSum = useMemo(() => {
    return ingredients.reduce((acc, el) => acc + el.price, 0);
  }, [ingredients]);

  const fillingList = useMemo(() => {
    return ingredients.filter((item) => item.type !== "bun");
  }, [ingredients]);

  const bunList = useMemo(() => {
    return ingredients.filter((item) => item.type === "bun");
  }, [ingredients]);

  const [modalOpened, setModalOpened] = useState(false);

  const openModal = () => {
    setModalOpened(true);
  };

  const closeModal = () => {
    setModalOpened(false);
  };

  return (
    ingredients.length && (
      <section className={`${styles.container} pl-4`}>
        <div className="pl-8 pr-4 mb-4">
          <ConstructorElement
            type={"top"}
            isLocked={true}
            text={bunList[0].name}
            price={bunList[0].price}
            thumbnail={bunList[0].image}
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
            text={bunList[bunList.length - 1].name}
            price={bunList[bunList.length - 1].price}
            thumbnail={bunList[bunList.length - 1].image}
          />
        </div>
        <div className={`${styles.sum} pr-4`}>
          <div className="mr-10">
            <p className="mr-2 text text_type_digits-default">{countSum}</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={openModal}
          >
            Оформить заказ
          </Button>
        </div>
        {modalOpened && (
          <Modal title="" closeModal={closeModal}>
            <OrderDetails />
          </Modal>
        )}
      </section>
    )
  );
};

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(burgerListItemPropTypes),
};
