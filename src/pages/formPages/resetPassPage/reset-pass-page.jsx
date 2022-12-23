import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { resetPass } from "../../../services/actions/resetPassActions";
import styles from "../form-pages.module.css";
import { useForm } from "../../../hooks/useForm";

export const ResetPassPage = () => {
  const { form, handleChange } = useForm({ password: "", token: "" });
  const history = useHistory();
  const dispatch = useDispatch();

  const inputsChange = (e) => {
    handleChange(e);
  };

  const isPassReseted = useSelector(
    (state) => state.resetPass.resetPassSuccess
  );

  useEffect(() => {
    if (isPassReseted) {
      history.replace({ pathname: "/" });
    }
  }, [isPassReseted, history]);

  const dropPass = useCallback(
    async (e) => {
      e.preventDefault();
      dispatch(resetPass(form));
    },
    [dispatch, form]
  );

  return (
    <div className={styles.container}>
      <form className={styles["auth-form"]} onSubmit={dropPass}>
        <h1 className={`text text_type_main-medium ${styles.title}`}>
          Восстановление пароля
        </h1>

        <div className="mt-6">
          <PasswordInput
            onChange={inputsChange}
            value={form.password}
            name={"password"}
          />
        </div>

        <div className="mt-6">
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            size={"default"}
            name={"token"}
            value={form.token}
            onChange={inputsChange}
          />
        </div>

        <div className={`mt-6 ${styles.submit}`}>
          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      </form>

      <p className="text text_type_main-default text_color_inactive mt-20">
        Вспомнили пароль?{" "}
        <Link
          className={`text text_type_main-default ${styles.link}`}
          to="/login"
        >
          Войти
        </Link>
      </p>
    </div>
  );
};
