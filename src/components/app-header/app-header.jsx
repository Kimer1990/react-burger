import { NavItem } from "./nav-item/nav-item";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import { useLocation } from "react-router-dom";

export const AppHeader = () => {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <nav className={`${styles.navigation} pt-2 pb-2`}>
        <ul className={styles.list}>
          <li className={`${styles.item} pt-4 pb-4 pr-5 pl-5 mr-2`}>
            <NavItem name="Конструктор" link="/">
              <BurgerIcon
                type={location.pathname === "/" ? "primary" : "secondary"}
              />
            </NavItem>
          </li>
          <li className={`${styles.item} pt-4 pb-4 pr-5 pl-5`}>
            <NavItem name="Лента заказов" link="/feed">
              <ListIcon
                type={location.pathname === "/feed" ? "primary" : "secondary"}
              />
            </NavItem>
          </li>
          <li className={styles.logo}>
            <Logo />
          </li>
          <li className={`${styles.item} pt-4 pb-4 pr-5 pl-5`}>
            <NavItem name="Личный кабинет" link="/profile">
              <ProfileIcon
                type={
                  location.pathname === "/profile" ? "primary" : "secondary"
                }
              />
            </NavItem>
          </li>
        </ul>
      </nav>
    </header>
  );
};
