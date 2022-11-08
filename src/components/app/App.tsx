import "./App.css";
import { AppHeader } from "../app-header/app-header";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { useState, useEffect } from "react";
import { getIngredients } from "../../utils/burger-api";
import { IngredientsContext } from "../.././services/ingredientsContext";
import { OrderContext } from "../.././services/orderContext";

function App() {
  const [ingredientsList, setIngridientsList] = useState([]);

  const [orderList, setOrderList] = useState([]);

  const fetchIngredients = async () => {
    try {
      const { data } = await getIngredients();
      setIngridientsList(data);
    } catch (error) {
      console.error(error);
    }
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
        <IngredientsContext.Provider
          value={{ ingredientsList, setIngridientsList }}
        >
          <OrderContext.Provider value={{ orderList, setOrderList }}>
            <BurgerIngredients />
            <BurgerConstructor />
          </OrderContext.Provider>
        </IngredientsContext.Provider>
      </main>
    </div>
  );
}

export default App;
