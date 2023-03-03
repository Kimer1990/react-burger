import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useCallback, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "../../../hooks";
import { Link, useHistory } from "react-router-dom";
import { register } from "../../../services/actions/registerActions";
import styles from "../form-pages.module.css";
import { useForm } from "../../../hooks/useForm";

export const RegisterPage = () => {
  const { form, handleChange } = useForm({ name: "", email: "", password: "" });
  const history = useHistory();
  const dispatch = useDispatch();

  const inputsChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
  };

  const isRegistered = useSelector((state) => state.register.registerSuccess);

  useEffect(() => {
    if (isRegistered) {
      history.replace({ pathname: "/" });
    }
  }, [isRegistered, history]);

  const registerUser = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await dispatch(register(form));
      if (!isRegistered) {
        history.replace({ pathname: "/login" });
      }
    },
    [dispatch, form, isRegistered, history]
  );

  return (
    <div className={styles.container}>
      <form className={styles["auth-form"]} onSubmit={registerUser}>
        <h1 className={`text text_type_main-medium ${styles.title}`}>
          Регистрация
        </h1>

        <div className="mt-6">
          <Input
            type={"text"}
            placeholder={"Имя"}
            size={"default"}
            value={form.name}
            name={"name"}
            onChange={inputsChange}
          />
        </div>

        <div className="mt-6">
          <EmailInput
            onChange={inputsChange}
            value={form.email}
            name={"email"}
          />
        </div>

        <div className="mt-6">
          <PasswordInput
            onChange={inputsChange}
            value={form.password}
            name={"password"}
          />
        </div>

        <div className={`mt-6 ${styles.submit}`}>
          <Button htmlType="submit" type="primary" size="medium">
            Зарегистрироваться
          </Button>
        </div>
      </form>

      <p className="text text_type_main-default text_color_inactive mt-20">
        Уже заригстрированы?{" "}
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
