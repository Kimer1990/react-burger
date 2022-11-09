import { useState, useMemo, useCallback, useContext } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerType } from "./burger-type/burger-type";
import styles from "./burger-ingredients.module.css";
import { Modal } from "../modal/modal";
import { IngredientDetails } from "../ingredientDetails/ingredientDetails";
import { IngredientsContext } from "../.././services/ingredientsContext";

export const BurgerIngredients = () => {
  const [current, setCurrent] = useState({ id: "bun", name: "Булки" });
  const [modalOpened, setModalOpened] = useState(false);
  const [itemSelected, setItemSelected] = useState();

  const { ingredientsList } = useContext(IngredientsContext);

  const tabsList = [
    { id: "bun", name: "Булки" },
    { id: "sauce", name: "Соусы" },
    { id: "main", name: "Начинки" },
  ];

  const burgersBun = useMemo(
    () => ingredientsList.filter((item) => item.type === "bun"),
    [ingredientsList]
  );
  const burgersMain = useMemo(
    () => ingredientsList.filter((item) => item.type === "main"),
    [ingredientsList]
  );
  const burgersSauce = useMemo(
    () => ingredientsList.filter((item) => item.type === "sauce"),
    [ingredientsList]
  );

  const toggleTab = useCallback((tab) => {
    setCurrent(tab);
    document.querySelector(`#${tab.id}`).scrollIntoView({
      behavior: "smooth",
    });
  }, []);

  const showDetails = useCallback((item) => {
    setItemSelected(item);
    setModalOpened(true);
  }, []);

  const closeDetails = () => {
    setModalOpened(false);
  };

  return (
    ingredientsList.length && (
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
            openModal={showDetails}
            list={burgersBun}
            title="Булки"
          />
          <BurgerType
            id="sauce"
            openModal={showDetails}
            list={burgersSauce}
            title="Соусы"
          />
          <BurgerType
            id="main"
            openModal={showDetails}
            list={burgersMain}
            title="Начинки"
          />
        </div>

        {modalOpened && (
          <Modal title="Детали ингридиента" closeModal={closeDetails}>
            <IngredientDetails {...itemSelected} />
          </Modal>
        )}
      </section>
    )
  );
};
