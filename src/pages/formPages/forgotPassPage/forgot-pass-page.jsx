import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { recoverPass } from "../../../services/actions/recoverPassActions";
import styles from "../form-pages.module.css";

export const ForgotPassPage = () => {
  const [email, setEmail] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const inputEmailChange = (e) => {
    setEmail(e.target.value);
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
      dispatch(recoverPass({ email }));
    },
    [dispatch, email]
  );

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h1 className={`text text_type_main-medium ${styles.title}`}>
          Восстановление пароля
        </h1>

        <div className="mt-6">
          <EmailInput
            onChange={inputEmailChange}
            value={email}
            name={"E-mail"}
          />
        </div>

        <div className={`mt-6 ${styles.submit}`}>
          <Button
            onClick={updatePass}
            htmlType="button"
            type="primary"
            size="medium"
          >
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
