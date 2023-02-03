import { Route, Switch, useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "../../hooks";
import { useEffect } from "react";
import { AppHeader } from "../app-header/app-header";
import { LoginPage } from "../../pages/formPages/loginPage/login-page";
import { RegisterPage } from "../../pages/formPages/registerPage/register-page";
import { ForgotPassPage } from "../../pages/formPages/forgotPassPage/forgot-pass-page";
import { ResetPassPage } from "../../pages/formPages/resetPassPage/reset-pass-page";
import { MainPage } from "../../pages/mainPage/main-page";
import { FeedPage } from "../../pages/feedPage/feed-page";
import { ProfilePage } from "../../pages/profilePage/profile-page";
import { IngredientDetailsPage } from "../../pages/ingredientDetailsPage/ingredient-details-page";
import { OrderPage } from "../../pages/orderPage/order-page";
import { ProtectedRoute } from "../protected-route";
import { Modal } from "../modal/modal";
import { fetchIngredients } from "../../services/actions/allIngredientsActions";
import {
  feedWsConnectionStart,
  feedWsConnectionClose,
} from "../../services/actions/feedWsActions";
import {
  profileWsConnectionStart,
  profileWsConnectionClose,
} from "../../services/actions/profileWsActions";

function App() {
  interface ILocation {
    from?: string;
    background?: any;
    pathname?: string;
  }

  const dispatch = useDispatch();
  const location = useLocation<ILocation>();
  const background = location.state && location.state.background;
  const history = useHistory();

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

  const feedWsIsCreated = useSelector((state) => state.feedWs.isCreated);
  const feedWsIsConnected = useSelector((state) => state.feedWs.isOpen);
  const feedWsList = useSelector((state) => state.feedWs.orders);

  const profileWsIsCreated = useSelector((state) => state.profileWs.isCreated);
  const profileWsIsConnected = useSelector((state) => state.profileWs.isOpen);
  const profileWsList = useSelector((state) => state.profileWs.orders);

  useEffect(() => {
    if (location.pathname.search("/profile/orders/") !== -1) {
      if (!profileWsIsCreated && !profileWsIsConnected) {
        dispatch(profileWsConnectionStart("/all"));
      }

      return () => {
        if (profileWsIsConnected) {
          dispatch(profileWsConnectionClose());
        }
      };
    } else if (location.pathname.search("/feed/") !== -1) {
      if (
        location.pathname.search("/feed/") !== -1 &&
        !feedWsIsCreated &&
        !feedWsIsConnected
      ) {
        dispatch(feedWsConnectionStart("/all"));
      }

      return () => {
        if (feedWsIsConnected) {
          dispatch(feedWsConnectionClose());
        }
      };
    }
  }, [
    dispatch,
    profileWsIsCreated,
    profileWsIsConnected,
    feedWsIsConnected,
    feedWsIsCreated,
    location.pathname,
  ]);

  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
        <ProtectedRoute exact={true} path="/login" onlyUnAuth={true}>
          <LoginPage />
        </ProtectedRoute>

        <ProtectedRoute exact={true} path="/register" onlyUnAuth={true}>
          <RegisterPage />
        </ProtectedRoute>

        <ProtectedRoute exact={true} path="/forgot-password" onlyUnAuth={true}>
          <ForgotPassPage />
        </ProtectedRoute>

        <ProtectedRoute exact={true} path="/reset-password" onlyUnAuth={true}>
          <ResetPassPage />
        </ProtectedRoute>

        <Route exact={true} path="/">
          <MainPage />
        </Route>

        <Route exact={true} path="/feed/:id">
          <OrderPage orders={feedWsList} withTitle={true} />
        </Route>

        <Route exact={true} path="/feed">
          <FeedPage />
        </Route>

        <ProtectedRoute exact={true} path="/profile/orders/:id">
          <OrderPage orders={profileWsList} withTitle={true} />
        </ProtectedRoute>

        <ProtectedRoute path="/profile">
          <ProfilePage />
        </ProtectedRoute>

        <Route path="/ingredients/:id">
          <IngredientDetailsPage title="Детали ингридиента" />
        </Route>
      </Switch>

      {background && (
        <Route
          path="/ingredients/:id"
          children={
            <Modal
              title="Детали ингридиента"
              titleNumber={false}
              closeModal={closeDetails}
            >
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
              title={`#${location.pathname.replace(/[^0-9]/g, "")}`}
              titleNumber={true}
              closeModal={closeDetails}
            >
              <OrderPage orders={feedWsList} withTitle={false} />
            </Modal>
          }
        />
      )}

      {background && (
        <Route
          path="/profile/orders/:id"
          children={
            <Modal
              title={`#${location.pathname.replace(/[^0-9]/g, "")}`}
              titleNumber={true}
              closeModal={closeDetails}
            >
              <OrderPage orders={profileWsList} withTitle={false} />
            </Modal>
          }
        />
      )}
    </>
  );
}

export default App;
