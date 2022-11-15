import { useState, useCallback } from "react";
import styles from "./burger-constructor.module.css";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../orderDetails/orderDetails";
import { useDispatch, useSelector } from "react-redux";
import { FillingsItem } from "./fillings-item/fillings-item";
import { makeOrder } from "../../services/actions/orderActions";
import { addIngredient } from "../../services/actions/orderIngredientsActions";
import { useDrop } from "react-dnd";

export const BurgerConstructor = () => {
  const dispatch = useDispatch();

  const [modalOpened, setModalOpened] = useState(false);

  const { fillings, bun, orderSum } = useSelector(
    (state) => state.orderIngredients
  );

  const openOrder = useCallback(() => {
    const allId = [bun._id, ...fillings.map((item) => item._id), bun._id];
    dispatch(makeOrder(allId));
    setModalOpened(true);
  }, [dispatch, fillings, bun]);

  const closeOrder = () => {
    setModalOpened(false);
  };

  const [{ isHover }, drop] = useDrop({
    accept: "ingredients",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      dispatch(addIngredient(item));
    },
  });

  return (
    <section
      ref={drop}
      className={`${styles.container} ${isHover ? styles.onHover : ""} pl-4`}
    >
      {!!Object.keys(bun).length && (
        <div className="pl-8 pr-4 mb-4">
          <ConstructorElement
            type={"top"}
            isLocked={true}
            text={bun.name}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      )}
      {!!fillings.length && (
        <ul className={`customs-scroll pr-4 ${styles.list}`}>
          {fillings.map((item, index) => (
            <FillingsItem
              key={item.unicId}
              index={index}
              filling={item}
            ></FillingsItem>
          ))}
        </ul>
      )}
      {!!Object.keys(bun).length && (
        <div className="pl-8 pr-4 pt-4 pb-10">
          <ConstructorElement
            type={"bottom"}
            isLocked={true}
            text={bun.name}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      )}
      {!!orderSum && (
        <div className={`${styles.sum} pr-4`}>
          <div className="mr-10">
            <p className="mr-2 text text_type_digits-default">{orderSum}</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={openOrder}
          >
            Оформить заказ
          </Button>
        </div>
      )}
      {modalOpened && (
        <Modal title="" closeModal={closeOrder}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};
