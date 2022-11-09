import "./App.css";
import { AppHeader } from "../app-header/app-header";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { useState, useEffect, useReducer } from "react";
import { getIngredients } from "../../utils/burger-api";
import { IngredientsContext } from "../.././services/ingredientsContext";
import { OrderContext } from "../.././services/orderContext";

const initialState = { bun: {}, fillings: [] };

function reducer(state, action) {
  switch (action.type) {
    case "add":
      if (action.item.type === "bun" && action.item._id !== state.bun._id) {
        state.bun = action.item;
      } else if (
        action.item.type !== "bun" &&
        !state.fillings.find((item) => item._id === action.item._id)
      ) {
        state.fillings.push(action.item);
        console.log(state.fillings);
      }
      return { ...state.bun, ...state.fillings };

    /*case "del":
      state.fillings = state.fillings.filter(
        (item) => item._id !== action.item._id
      );
      return { bun: { ...state.bun }, fillings: [...state.fillings] };*/

    default:
      return initialState;
  }
}

function App() {
  const [ingredientsList, setIngridientsList] = useState([]);

  const [state, dispatch] = useReducer(reducer, initialState);

  const addIngredient = (ingredient) => {
    console.log(ingredient);
    dispatch({ type: "add", item: ingredient });
  };

  const delIngredient = (ingredient) => {
    dispatch({ type: "del", item: ingredient });
  };

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
        <OrderContext.Provider value={{ state, addIngredient, delIngredient }}>
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
