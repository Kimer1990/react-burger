import { useCallback, useEffect, ReactNode, FC } from "react";
import { useDispatch, useSelector } from "../hooks";
import { Route, Redirect, useLocation } from "react-router-dom";
import {
  getUserWithToken,
  toggleUserAuthChecked,
} from "../services/actions/userActions";
import { Preloader } from "./preloader/Preloader";

type TProtectedRoute = {
  onlyUnAuth?: boolean;
  children: ReactNode;
  path: string;
  exact?: boolean;
};

type LocationState = {
  from: {
    pathname: string;
  };
};

export const ProtectedRoute: FC<TProtectedRoute> = ({
  children,
  onlyUnAuth = false,
  ...rest
}) => {
  const isAuthChecked = useSelector((state) => state.user.isAuthChecked);
  const { loginSuccess } = useSelector((state) => state.user);
  const { recoverPassSuccess } = useSelector((state) => state.recoverPass);
  const location = useLocation<LocationState>();
  const dispatch = useDispatch();

  const init = useCallback(async () => {
    await dispatch(getUserWithToken());
    if (!isAuthChecked) {
      dispatch(toggleUserAuthChecked());
    }
  }, [dispatch, isAuthChecked]);

  useEffect(() => {
    init();
  }, [init]);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && loginSuccess) {
    console.log("to main");
    const { from } = location.state || { from: { pathname: "/" } };
    return <Redirect to={from} />;
  }

  if (
    (!onlyUnAuth && !loginSuccess) ||
    (location.pathname === "/reset-password" && !recoverPassSuccess)
  ) {
    console.log("to login");
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: { from: location },
        }}
      />
    );
  }

  return <Route {...rest}>{children}</Route>;
};
