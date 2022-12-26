import { Route, Switch, useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AppHeader } from "../app-header/app-header";
import { LoginPage } from "../../pages/formPages/loginPage/login-page";
import { RegisterPage } from "../../pages/formPages/registerPage/register-page";
import { ForgotPassPage } from "../../pages/formPages/forgotPassPage/forgot-pass-page";
import { ResetPassPage } from "../../pages/formPages/resetPassPage/reset-pass-page";
import { MainPage } from "../../pages/mainPage/main-page";
import { FeedPage } from "../../pages/feedPage/feed-page";
import { ProfilePage } from "../../pages/profilePage/propfile-page";
import { IngredientDetailsPage } from "../../pages/ingredientDetailsPage/ingredient-details-page";
import { OrderPage } from "../../pages/orderPage/order-page";
import { ProtectedRoute } from "../protected-route";
import { Modal } from "../modal/modal";
import { fetchIngredients } from "../../services/actions/allIngredientsActions";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state && location.state.background;
  const history = useHistory();

  const order = useSelector((state) => state.getOrder.orderContent);

  const ingredientsList = useSelector(
    (state) => state.allIngredients.ingredientsList
  );

  const closeDetails = () => {
    history.goBack();
  };

  useEffect(() => {
    if (!ingredientsList?.length) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredientsList]);

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

        <Route path="/feed/:id" exact>
          <OrderPage />
        </Route>

        <Route path="/feed" exact>
          <FeedPage />
        </Route>

        <ProtectedRoute path="/profile/orders/:id" exact>
          <OrderPage />
        </ProtectedRoute>

        <ProtectedRoute path="/profile">
          <ProfilePage />
        </ProtectedRoute>

        <Route path="/ingredients/:id" exact={true}>
          <IngredientDetailsPage title="Детали ингридиента" />
        </Route>
      </Switch>

      {background && (
        <Route
          path="/ingredients/:id"
          children={
            <Modal title="Детали ингридиента" closeModal={closeDetails}>
              <IngredientDetailsPage />
            </Modal>
          }
        />
      )}

      {background && (
        <Route
          path="/feed/:id"
          children={
            <Modal
              title={`#${order.number}`}
              titleNumber={true}
              closeModal={closeDetails}
            >
              <OrderPage />
            </Modal>
          }
        />
      )}

      {background && (
        <Route
          path="/profile/orders/:id"
          children={
            <Modal
              title={`#${order.number}`}
              titleNumber={true}
              closeModal={closeDetails}
            >
              <OrderPage />
            </Modal>
          }
        />
      )}
    </>
  );
}

export default App;
