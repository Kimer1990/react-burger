import './app.css'
import { AppHeader } from './components/app-header/app-header'
import { BurgerConstructor } from './components/burger-constructor/burger-constructor'
import { BurgerIngredients } from './components/burger-ingredients/burger-ingredients'

function App() {
  return (
    <div className='App'>
      <AppHeader />
      <main>
        <h2 className='text text_type_main-large mb-3 title mt-8'>Соберите бургер</h2>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </div>
  )
}

export default App
