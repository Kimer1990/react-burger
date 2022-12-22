import "./App.css";
import { Route, Switch, useLocation, useHistory } from "react-router-dom";
import { LoginPage } from "../../pages/formPages/loginPage/login-page";
import { RegisterPage } from "../../pages/formPages/registerPage/register-page";
import { ForgotPassPage } from "../../pages/formPages/forgotPassPage/forgot-pass-page";
import { ResetPassPage } from "../../pages/formPages/resetPassPage/reset-pass-page";
import { MainPage } from "../../pages/mainPage/main-page";
import { AppHeader } from "../app-header/app-header";
import { ProfilePage } from "../../pages/profilePage/propfile-page";
import { ProtectedRoute } from "../protected-route";
import { Modal } from "../modal/modal";
import { IngredientDetails } from "../ingredientDetails/ingredientDetails";

function App() {
  const location = useLocation();
  let background = location.state && location.state.background;
  const history = useHistory();

  const closeDetails = () => {
    history.goBack();
  };

  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
        <ProtectedRoute exact={true} path="/login" onlyUnAuth="true">
          <LoginPage />
        </ProtectedRoute>

        <ProtectedRoute exact={true} path="/register" onlyUnAuth="true">
          <RegisterPage />
        </ProtectedRoute>

        <ProtectedRoute exact={true} path="/forgot-password" onlyUnAuth="true">
          <ForgotPassPage />
        </ProtectedRoute>

        <ProtectedRoute exact={true} path="/reset-password" onlyUnAuth="true">
          <ResetPassPage />
        </ProtectedRoute>

        <Route exact={true} path="/">
          <MainPage />
        </Route>

        <ProtectedRoute path="/profile">
          <ProfilePage />
        </ProtectedRoute>

        <Route path="/ingredients/:id" exact={true}>
          <IngredientDetails title="Детали ингридиента" />
        </Route>
      </Switch>

      {background && (
        <Route
          path="/ingredients/:id"
          children={
            <Modal title="Детали ингридиента" closeModal={closeDetails}>
              <IngredientDetails />
            </Modal>
          }
        />
      )}
    </>
  );
}

export default App;
