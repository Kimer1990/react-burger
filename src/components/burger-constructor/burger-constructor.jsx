import { useState, useCallback } from "react";
import styles from "./burger-constructor.module.css";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "../modal/modal";
import { OrderCreate } from "../orderCreate/orderCreate";
import { useDispatch, useSelector } from "react-redux";
import { FillingsItem } from "./fillings-item/fillings-item";
import { makeOrder } from "../../services/actions/orderActions";
import { addIngredient } from "../../services/actions/orderIngredientsActions";
import { useDrop } from "react-dnd";
import { useHistory } from "react-router-dom";

export const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [modalOpened, setModalOpened] = useState(false);

  const { fillings, bun, orderSum } = useSelector(
    (state) => state.orderIngredients
  );
  const { loginSuccess } = useSelector((state) => state.user);

  const openOrder = useCallback(() => {
    if (!loginSuccess) {
      history.push("/login");
    } else {
      const allId = [bun._id, ...fillings.map((item) => item._id), bun._id];
      dispatch(makeOrder({ ingredients: allId }));
      setModalOpened(true);
    }
  }, [dispatch, fillings, bun, loginSuccess, history]);

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
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      )}
      {!!fillings.length && (
        <ul className={`customs-scroll ${styles.list}`}>
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
            text={`${bun.name} (низ)`}
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
          <OrderCreate />
        </Modal>
      )}
    </section>
  );
};
