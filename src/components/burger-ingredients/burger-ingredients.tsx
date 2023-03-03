import { useState, useMemo, useCallback, useRef, useEffect, FC } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerType } from "./burger-type/burger-type";
import styles from "./burger-ingredients.module.css";
import { useSelector } from "../../hooks";
import { BUN, MAIN, SAUCE, TTab } from "../../services/types/data";

export const BurgerIngredients = () => {
  type TToggleTab = (tab: TTab) => void;

  //Состояния
  const [current, setCurrent] = useState<TTab | any>({
    id: BUN,
    name: "Булки",
  });

  const ingredientsList = useSelector(
    (state) => state.allIngredients.ingredientsList
  );

  const tabsList = useSelector((state) => state.allIngredients.ingredientTabs);

  /* eslint-disable react-hooks/exhaustive-deps */
  const burgersBun = useMemo(() => {
    return ingredientsList.filter((item) => item.type === BUN);
  }, [ingredientsList]);
  const burgersSauce = useMemo(() => {
    return ingredientsList.filter((item) => item.type === SAUCE);
  }, [ingredientsList]);
  const burgersMain = useMemo(() => {
    return ingredientsList.filter((item) => item.type === MAIN);
  }, [ingredientsList]);
  /* eslint-enable react-hooks/exhaustive-deps */

  //Активный элемент списка
  const tabsRef = useRef<HTMLDivElement>(null);

  const bunTab = useRef<HTMLDivElement | any>(null);
  const sauceTab = useRef<HTMLDivElement | any>(null);
  const mainTab = useRef<HTMLDivElement | any>(null);

  /* eslint-disable react-hooks/exhaustive-deps */
  const toggleTab = useCallback<TToggleTab>((tab) => {
    setCurrent(tab);
    tabsRef.current!.scrollTo({
      behavior: "smooth",
      top:
        (tab.id === BUN
          ? bunTab.current.offsetTop
          : tab.id === SAUCE
          ? sauceTab.current.offsetTop
          : tab.id === MAIN && mainTab.current.offsetTop) -
        tabsRef.current!.offsetTop,
    });
  }, []);

  const scrollIngredients = useCallback(() => {
    const tabsY = tabsRef.current!.getBoundingClientRect().top;

    const bunTabY = Math.abs(
      bunTab.current.getBoundingClientRect().top - tabsY
    );
    const sauceTabY = Math.abs(
      sauceTab.current.getBoundingClientRect().top - tabsY
    );
    const mainTabY = Math.abs(
      mainTab.current.getBoundingClientRect().top - tabsY
    );

    if (bunTabY < sauceTabY && bunTabY < mainTabY) {
      setCurrent(tabsList.find((t) => t.id === BUN));
    } else if (sauceTabY < bunTabY && sauceTabY < mainTabY) {
      setCurrent(tabsList.find((t) => t.id === SAUCE));
    } else if (mainTabY < bunTabY && mainTabY < sauceTabY) {
      setCurrent(tabsList.find((t) => t.id === MAIN));
    }
  }, [bunTab, sauceTab, mainTab, tabsList]);
  /* eslint-enable react-hooks/exhaustive-deps */

  useEffect(() => {
    const tabsNode = tabsRef.current;
    tabsNode!.addEventListener("scroll", scrollIngredients);

    return () => {
      tabsNode!.removeEventListener("scroll", scrollIngredients);
    };
  }, [scrollIngredients]);

  //Блоки с привязками
  type TBlock = {
    innerRef: React.RefObject<HTMLDivElement>;
  };
  const BunBlock: FC<TBlock> = ({ innerRef }) => {
    return (
      <div ref={innerRef}>
        <BurgerType id="bun" list={burgersBun} title="Булки" />
      </div>
    );
  };

  const SauceBlock: FC<TBlock> = ({ innerRef }) => {
    return (
      <div ref={innerRef}>
        <BurgerType id="sauce" list={burgersSauce} title="Соусы" />
      </div>
    );
  };

  const MainBlock: FC<TBlock> = ({ innerRef }) => {
    return (
      <div ref={innerRef}>
        <BurgerType id="main" list={burgersMain} title="Начинки" />
      </div>
    );
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
        <BunBlock innerRef={bunTab}></BunBlock>
        <SauceBlock innerRef={sauceTab}></SauceBlock>
        <MainBlock innerRef={mainTab}></MainBlock>
      </div>
    </section>
  );
};
