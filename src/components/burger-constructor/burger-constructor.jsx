import { useMemo, useState, useContext } from "react";
import styles from "./burger-constructor.module.css";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../orderDetails/orderDetails";
import { OrderContext } from "../.././services/orderContext";
import { postOrder } from "../../utils/burger-api";

export const BurgerConstructor = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const [order, setOrder] = useState();

  const { state, delIngredient } = useContext(OrderContext);

  const countSum = useMemo(() => {
    console.log(state.bun.price * 2);
    return (
      state.fillings.reduce((acc, el) => acc + el.price, 0) +
      state.bun.price * 2
    );
  }, [state.bun, state.fillings]);

  const fillingList = useMemo(() => {
    return state.fillings;
  }, [state.fillings]);

  const bun = useMemo(() => {
    return state.bun;
  }, [state.bun]);

  const allId = useMemo(() => {
    return [
      state.bun._id,
      ...state.fillings.map((item) => item._id),
      state.bun._id,
    ];
  }, [state.bun, state.fillings]);

  const makeOrder = async () => {
    try {
      const { success, order } = await postOrder({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients: allId }),
      });
      if (success) {
        setOrder(order.number);
        setModalOpened(true);
      } else alert("Не удалось оформить заказ :(");
    } catch (error) {
      console.error(error);
      alert("Не удалось оформить заказ :(");
    }
  };

  const closeOrder = () => {
    setModalOpened(false);
  };

  return (
    <section className={`${styles.container} pl-4`}>
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
      {!!fillingList.length && (
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
                  handleClose={() => delIngredient(item)}
                />
              </li>
            );
          })}
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
      {!!countSum && (
        <div className={`${styles.sum} pr-4`}>
          <div className="mr-10">
            <p className="mr-2 text text_type_digits-default">{countSum}</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={makeOrder}
          >
            Оформить заказ
          </Button>
        </div>
      )}
      {modalOpened && (
        <Modal title="" closeModal={closeOrder}>
          <OrderDetails order={order} />
        </Modal>
      )}
    </section>
  );
};
