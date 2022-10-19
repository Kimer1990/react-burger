import "./App.css";
import { AppHeader } from "../app-header/app-header";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { useState, useEffect } from "react";
import { getIngredients } from "../../utils/burger-api";

function App() {
  const [ingredientsList, setIngridientsList] = useState([]);

  const fetchIngredients = async () => {
    const data = await getIngredients();
    setIngridientsList(data);
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  return (
    <div className="App">
      <AppHeader />
      <main>
        <h2 className="text text_type_main-large mb-3 title mt-8">
          Соберите бургер
        </h2>
        <BurgerIngredients ingredients={ingredientsList} />
        <BurgerConstructor ingredients={ingredientsList} />
      </main>
    </div>
  );
}

export default App;
