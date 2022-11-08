import { useMemo, useState, useContext } from "react";
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
import { OrderContext } from "../.././services/orderContext";
import { postOrder } from "../../utils/burger-api";

export const BurgerConstructor = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const [order, setOrder] = useState();
  const { orderList, setOrderList } = useContext(OrderContext);

  //временное удаление ингридиента
  const delIngredient = (object) => {
    return orderList.filter((item) => item._id !== object._id);
  };

  const countSum = useMemo(() => {
    return orderList.reduce(
      (acc, el) => (el.type === "bun" ? acc + el.price * 2 : acc + el.price),
      0
    );
  }, [orderList]);

  const fillingList = useMemo(() => {
    return orderList.filter((item) => item.type !== "bun");
  }, [orderList]);

  const bun = useMemo(() => {
    return orderList.filter((item) => item.type === "bun");
  }, [orderList]);

  const allId = useMemo(() => {
    return orderList.map((item) => item._id);
  }, [orderList]);

  const openModal = async () => {
    try {
      const { order } = await postOrder({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients: allId }),
      });
      setOrder(order.number);
    } catch (error) {
      console.error(error);
    }
    setModalOpened(true);
  };

  const closeModal = () => {
    setModalOpened(false);
  };

  return (
    orderList.length && (
      <section className={`${styles.container} pl-4`}>
        {bun.length && (
          <div className="pl-8 pr-4 mb-4">
            <ConstructorElement
              type={"top"}
              isLocked={true}
              text={bun[0].name}
              price={bun[0].price}
              thumbnail={bun[0].image}
            />
          </div>
        )}
        {fillingList.length && (
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
                    handleClose={() => setOrderList(delIngredient(item))}
                  />
                </li>
              );
            })}
          </ul>
        )}
        {bun.length && (
          <div className="pl-8 pr-4 pt-4 pb-10">
            <ConstructorElement
              type={"bottom"}
              isLocked={true}
              text={bun[0].name}
              price={bun[0].price}
              thumbnail={bun[0].image}
            />
          </div>
        )}
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
            <OrderDetails order={order} />
          </Modal>
        )}
      </section>
    )
  );
};

BurgerConstructor.propTypes = {
  orderList: PropTypes.arrayOf(burgerListItemPropTypes),
};
