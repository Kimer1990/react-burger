import styles from "./profile-page.module.css";
import {
  NavLink,
  Route,
  Switch,
  useLocation,
  useHistory,
} from "react-router-dom";
import {
  Button,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  useCallback,
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
  SyntheticEvent,
} from "react";
import { useSelector, useDispatch } from "../../hooks";
import { logOut, patchData } from "../../utils/burger-api";
import { useForm } from "../../hooks/useForm";
import {
  getUserWithToken,
  toggleUserAuthChecked,
} from "../../services/actions/userActions";
import {
  profileWsConnectionStart,
  profileWsConnectionClose,
} from "../../services/actions/profileWsActions";
import { getCookie } from "../../utils/cookie-helper";
import { OrdersList } from "../../components/ordersList/orders-list";
import { ProtectedRoute } from "../../components/protected-route";

export const ProfilePage = () => {
  const isAuthChecked = useSelector((state) => state.user.isAuthChecked);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [hasControls, setControls] = useState(false);

  const { email, name } = useSelector((state) => state.user.userInfo);
  const { form, handleChange, setForm } = useForm({
    name: name,
    email: email,
    password: "",
  });

  const isCreated = useSelector((state) => state.profileWs.isCreated);
  const isConnected = useSelector((state) => state.profileWs.isOpen);
  const userOrdersList = useSelector((state) => state.profileWs.orders);

  useEffect(() => {
    if (location.pathname === "/profile/orders" && !isCreated && !isConnected) {
      dispatch(profileWsConnectionStart(`?token=${getCookie("accessToken")}`));
    }

    return () => {
      if (isConnected) {
        dispatch(profileWsConnectionClose());
      }
    };
  }, [dispatch, isConnected, isCreated, location]);

  useEffect(() => {
    setForm({ name: name, email: email, password: "" });
  }, [name, email, setForm]);

  const inputsChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    if (!hasControls) {
      setControls(true);
    }
  };

  const postUserData = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (form.email === "" || form.name === "") {
        alert("Введены неверные данные");
        returnUserData();
        return;
      }
      await patchData("auth/user", form);
      await dispatch(getUserWithToken());
      setControls(false);
    },
    // eslint-disable-next-line
    [form, dispatch, name, email]
  );

  const returnUserData = useCallback(() => {
    setForm({ ...form, email, name });
    setControls(false);
  }, [form, email, name, setForm]);

  const logoutUser = useCallback(
    async (e: SyntheticEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      await logOut();
      if (isAuthChecked) {
        dispatch(toggleUserAuthChecked());
      }
      history.replace({ pathname: "/login", state: { from: "/login" } });
    },
    [history, dispatch, isAuthChecked]
  );

  return (
    <section className={styles.container}>
      <div className={`${styles.navigation} mr-15`}>
        <NavLink
          to="/profile"
          exact
          className={`text text_type_main-medium text_color_inactive ${styles.link}`}
          activeClassName={styles.active}
        >
          Профиль
        </NavLink>
        <NavLink
          to="/profile/orders"
          exact
          className={`text text_type_main-medium text_color_inactive ${styles.link}`}
          activeClassName={styles.active}
        >
          История заказов
        </NavLink>
        <NavLink
          to="/login"
          exact
          onClick={logoutUser}
          className={`text text_type_main-medium text_color_inactive ${styles.link}`}
          activeClassName={styles.active}
        >
          Выход
        </NavLink>

        <p className={`text text_type_main-default text_color_inactive mt-20`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>

      <div className={styles.content}>
        <Switch>
          <Route path="/profile" exact={true}>
            <form onSubmit={postUserData} onReset={returnUserData}>
              <div className="mt-6">
                <Input
                  type={"text"}
                  placeholder={"Имя"}
                  size={"default"}
                  value={form.name}
                  name={"name"}
                  icon="EditIcon"
                  autoComplete="off"
                  onChange={inputsChange}
                />
              </div>

              <div className="mt-6">
                <EmailInput
                  placeholder={"Логин"}
                  size={"default"}
                  value={form.email}
                  name={"email"}
                  isIcon={true}
                  autoComplete="off"
                  onChange={inputsChange}
                />
              </div>

              <div className="mt-6">
                <Input
                  type={"password"}
                  placeholder={"Пароль"}
                  size={"default"}
                  value={form.password}
                  name={"password"}
                  icon="EditIcon"
                  autoComplete="off"
                  onChange={inputsChange}
                />
              </div>

              {hasControls && (
                <div className={`mt-6 ${styles.controls}`}>
                  <Button htmlType="reset" type="secondary" size="large">
                    Отмена
                  </Button>
                  <Button htmlType="submit" type="primary" size="large">
                    Сохранить
                  </Button>
                </div>
              )}
            </form>
          </Route>
        </Switch>

        <Switch>
          <ProtectedRoute path="/profile/orders" exact={true}>
            <OrdersList ordersList={userOrdersList} route="/profile/orders" />
          </ProtectedRoute>
        </Switch>
      </div>

      <div className={`${styles.navigation} mr-15`}></div>
    </section>
  );
};
