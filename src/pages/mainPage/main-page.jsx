import { BurgerConstructor } from "../../components/burger-constructor/burger-constructor";
import { BurgerIngredients } from "../../components/burger-ingredients/burger-ingredients";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIngredients } from "../../services/actions/allIngredientsActions";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const MainPage = () => {
  const dispatch = useDispatch();
  const ingredientsList = useSelector(
    (state) => state.allIngredients.ingredientsList
  );

  useEffect(() => {
    if (!ingredientsList?.length) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredientsList]);

  return (
    <DndProvider backend={HTML5Backend}>
      <main>
        <h2 className="text text_type_main-large mb-3 title mt-8">
          Соберите бургер
        </h2>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </DndProvider>
  );
};
