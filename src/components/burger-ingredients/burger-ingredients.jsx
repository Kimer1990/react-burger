import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerType } from "./burger-type/burger-type";
import styles from "./burger-ingredients.module.css";
import { Modal } from "../modal/modal";
import { IngredientDetails } from "../ingredientDetails/ingredientDetails";
import { useDispatch, useSelector } from "react-redux";
import { ingredientTypes } from "../../utils/constant";
import {
  SET_INGREDIENT,
  CLEAR_INGREDIENT,
} from "../../services/actions/currentIngredientActions";

export const BurgerIngredients = () => {
  const dispatch = useDispatch();

  const { BUN, MAIN, SAUCE } = ingredientTypes;

  //Состояния
  const [current, setCurrent] = useState({ id: "bun", name: "Булки" });
  const [modalOpened, setModalOpened] = useState(false);

  const ingredientsList = useSelector(
    (state) => state.allIngredients.ingredientsList
  );

  const tabsList = useSelector((state) => state.allIngredients.ingredientTabs);

  const burgersBun = useMemo(() => {
    return ingredientsList.filter((item) => item.type === BUN);
  }, [ingredientsList]);
  const burgersSauce = useMemo(() => {
    return ingredientsList.filter((item) => item.type === SAUCE);
  }, [ingredientsList]);
  const burgersMain = useMemo(() => {
    return ingredientsList.filter((item) => item.type === MAIN);
  }, [ingredientsList]);

  //Активный элемент списка
  const tabsRef = useRef();

  const bunTab = document.getElementById(BUN);
  const sauceTab = document.getElementById(SAUCE);
  const mainTab = document.getElementById(MAIN);

  const toggleTab = useCallback((tab) => {
    setCurrent(tab);
    document.querySelector(`#${tab.id}`).scrollIntoView({
      behavior: "smooth",
    });
  }, []);

  const scrollIngredients = useCallback(() => {
    const tabsY = tabsRef.current.getBoundingClientRect().top;

    const bunTabY = Math.abs(bunTab.getBoundingClientRect().top - tabsY);
    const sauceTabY = Math.abs(sauceTab.getBoundingClientRect().top - tabsY);
    const mainTabY = Math.abs(mainTab.getBoundingClientRect().top - tabsY);

    if (bunTabY < sauceTabY && bunTabY < mainTabY) {
      setCurrent(tabsList.find((t) => t.id === BUN));
    } else if (sauceTabY < bunTabY && sauceTabY < mainTabY) {
      setCurrent(tabsList.find((t) => t.id === SAUCE));
    } else if (mainTabY < bunTabY && mainTabY < sauceTabY) {
      setCurrent(tabsList.find((t) => t.id === MAIN));
    }
  }, [bunTab, sauceTab, mainTab, tabsList]);

  useEffect(() => {
    const tabsNode = tabsRef.current;
    tabsNode.addEventListener("scroll", scrollIngredients);

    return () => {
      tabsNode.removeEventListener("scroll", scrollIngredients);
    };
  }, [scrollIngredients]);

  //Модальные окна
  const showDetails = useCallback(
    (item) => {
      dispatch({
        type: SET_INGREDIENT,
        item,
      });
      setModalOpened(true);
    },
    [dispatch]
  );

  const closeDetails = () => {
    dispatch({
      type: CLEAR_INGREDIENT,
    });
    setModalOpened(false);
  };

  return (
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

      <div ref={tabsRef} className={`customs-scroll ${styles.items}`}>
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
          <IngredientDetails />
        </Modal>
      )}
    </section>
  );
};
