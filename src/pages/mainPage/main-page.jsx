import styles from "./main-page.module.css";
import { BurgerConstructor } from "../../components/burger-constructor/burger-constructor";
import { BurgerIngredients } from "../../components/burger-ingredients/burger-ingredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const MainPage = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <main className={styles.main}>
        <h2
          className={`text text_type_main-large mb-3 title mt-8 ${styles.title}`}
        >
          Соберите бургер
        </h2>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </DndProvider>
  );
};
