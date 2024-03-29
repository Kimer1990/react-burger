import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "../../../hooks";
import { Link } from "react-router-dom";
import { getUser } from "../../../services/actions/userActions";
import styles from "../form-pages.module.css";
import { useForm } from "../../../hooks/useForm";

export const LoginPage = () => {
  const { form, handleChange } = useForm({ email: "", password: "" });
  const dispatch = useDispatch();

  const inputsChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
  };

  const login = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(getUser(form));
    },
    [dispatch, form]
  );

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={login}>
        <h1 className={`text text_type_main-medium ${styles.title}`}>Вход</h1>

        <div className="mt-6">
          <EmailInput
            value={form.email}
            name={"email"}
            onChange={inputsChange}
          />
        </div>

        <div className="mt-6">
          <PasswordInput
            value={form.password}
            name={"password"}
            onChange={inputsChange}
          />
        </div>

        <div className={`mt-6 ${styles.submit}`}>
          <Button htmlType="submit" type="primary" size="medium">
            Войти
          </Button>
        </div>
      </form>

      <p className="text text_type_main-default text_color_inactive mt-20">
        Вы - новый пользователь?{" "}
        <Link
          className={`text text_type_main-default ${styles.link}`}
          to="/register"
        >
          Зарегистрироваться
        </Link>
      </p>

      <p className="text text_type_main-default text_color_inactive mt-4">
        Забыли пароль?{" "}
        <Link
          className={`text text_type_main-default ${styles.link}`}
          to="/forgot-password"
        >
          Восстановить пароль
        </Link>
      </p>
    </div>
  );
};
