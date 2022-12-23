import styles from "./profile-page.module.css";
import { NavLink, Route, Switch } from "react-router-dom";
import {
  Button,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut, patchData } from "../../utils/burger-api";
import { useForm } from "../../hooks/useForm";
import {
  getUserWithToken,
  toggleUserAuthChecked,
} from "../../services/actions/userActions";

export const ProfilePage = () => {
  const isAuthChecked = useSelector((state) => state.user.isAuthChecked);
  const dispatch = useDispatch();
  const history = useHistory();
  const [hasControls, setControls] = useState(false);

  const { email, name } = useSelector((state) => state.user.userInfo);
  const { form, handleChange, setForm } = useForm({
    name: name,
    email: email,
    password: "",
  });

  useEffect(() => {
    setForm({ name: name, email: email, password: "" });
  }, [dispatch, name, email, setForm]);

  const inputsChange = (e) => {
    console.log(e.target);
    handleChange(e);
    if (!hasControls) {
      setControls(true);
    }
  };

  const postUserData = useCallback(
    async (e) => {
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
    async (event) => {
      event.preventDefault();
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
                  type={"email"}
                  placeholder={"Логин"}
                  size={"default"}
                  value={form.email}
                  name={"email"}
                  icon="EditIcon"
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
      </div>

      <div className={`${styles.navigation} mr-15`}></div>
    </section>
  );
};
