import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { recoverPass } from "../../../services/actions/recoverPassActions";
import styles from "../form-pages.module.css";
import { useForm } from "../../../hooks/useForm";

export const ForgotPassPage = () => {
  const { form, handleChange } = useForm({ email: "" });
  const history = useHistory();
  const dispatch = useDispatch();

  const inputEmailChange = (e) => {
    handleChange(e);
  };

  const isPassRecovered = useSelector(
    (state) => state.recoverPass.recoverPassSuccess
  );

  useEffect(() => {
    if (isPassRecovered) {
      history.replace({ pathname: "/reset-password" });
    }
  }, [isPassRecovered, history]);

  const updatePass = useCallback(
    async (e) => {
      e.preventDefault();
      dispatch(recoverPass(form));
    },
    [dispatch, form]
  );

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={updatePass}>
        <h1 className={`text text_type_main-medium ${styles.title}`}>
          Восстановление пароля
        </h1>

        <div className="mt-6">
          <EmailInput
            onChange={inputEmailChange}
            value={form.email}
            name={"email"}
          />
        </div>

        <div className={`mt-6 ${styles.submit}`}>
          <Button htmlType="submit" type="primary" size="medium">
            Восстановить
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
