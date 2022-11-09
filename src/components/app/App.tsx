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

  const [orderList, setOrderList] = useState({ bun: {}, fillings: [] });

  const fetchIngredients = async () => {
    try {
      const { data } = await getIngredients();
      setIngridientsList(data);
    } catch (error) {
      console.error(error);
      alert("Не удалось получить список ингридиентов :(");
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
        <OrderContext.Provider value={{ orderList, setOrderList }}>
          <IngredientsContext.Provider value={{ ingredientsList }}>
            <BurgerIngredients />
          </IngredientsContext.Provider>
          <BurgerConstructor />
        </OrderContext.Provider>
      </main>
    </div>
  );
}

export default App;
