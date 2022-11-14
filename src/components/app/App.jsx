import "./App.css";
import { AppHeader } from "../app-header/app-header";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchIngredients } from "../../services/actions/allIngredientsActions";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <div className="App">
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <main>
          <h2 className="text text_type_main-large mb-3 title mt-8">
            Соберите бургер
          </h2>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      </DndProvider>
    </div>
  );
}

export default App;
