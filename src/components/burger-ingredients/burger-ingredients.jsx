import { useState, useMemo, useCallback } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerType } from "./burger-type/burger-type";
import styles from "./burger-ingredients.module.css";
import PropTypes from "prop-types";
import { burgerListItemPropTypes } from "../../utils/prop-types.js";
import { Modal } from "../modal/modal";
import { IngredientDetails } from "../ingredientDetails/ingredientDetails";

export const BurgerIngredients = ({ ingredients }) => {
  const [current, setCurrent] = useState({ id: "bun", name: "Булки" });
  const [modalOpened, setModalOpened] = useState(false);
  const [itemSelected, setItemSelected] = useState();

  const tabsList = [
    { id: "bun", name: "Булки" },
    { id: "sauce", name: "Соусы" },
    { id: "main", name: "Начинки" },
  ];

  const burgersBun = useMemo(
    () => ingredients.filter((item) => item.type === "bun"),
    [ingredients]
  );
  const burgersMain = useMemo(
    () => ingredients.filter((item) => item.type === "main"),
    [ingredients]
  );
  const burgersSauce = useMemo(
    () => ingredients.filter((item) => item.type === "sauce"),
    [ingredients]
  );

  const toggleTab = useCallback((tab) => {
    setCurrent(tab);
    document.querySelector(`#${tab.id}`).scrollIntoView({
      behavior: "smooth",
    });
  }, []);

  const openModal = useCallback((item) => {
    setItemSelected(item);
    setModalOpened(true);
  }, []);

  const closeModal = () => {
    setModalOpened(false);
  };

  return (
    ingredients.length && (
      <section className={styles.container}>
        <div className={`${styles.variants} mb-10`}>
          {tabsList.map((tab) => (
            <Tab
              value={tab.name}
              active={current.id === tab.id}
              key={tab.name}
              onClick={() => toggleTab(tab)}
            >
              {tab.name}
            </Tab>
          ))}
        </div>
        <div className={`customs-scroll ${styles.items}`}>
          <BurgerType
            id="bun"
            openModal={openModal}
            list={burgersBun}
            title="Булки"
          />
          <BurgerType
            id="sauce"
            openModal={openModal}
            list={burgersSauce}
            title="Соусы"
          />
          <BurgerType
            id="main"
            openModal={openModal}
            list={burgersMain}
            title="Начинки"
          />
        </div>

        {modalOpened && (
          <Modal title="Детали ингридиента" closeModal={closeModal}>
            <IngredientDetails {...itemSelected} />
          </Modal>
        )}
      </section>
    )
  );
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(burgerListItemPropTypes),
};
