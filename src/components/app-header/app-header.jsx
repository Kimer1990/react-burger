import { useState } from "react";
import { NavItem } from "./nav-item/nav-item";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import { menuConst } from "../../utils/constant";

export const AppHeader = () => {
  const { CREATE, ORDERS, PROFILE } = menuConst;
  const [active, setActive] = useState(CREATE);

  return (
    <header className={styles.header}>
      <nav className={`${styles.navigation} pt-2 pb-2`}>
        <ul className={styles.list}>
          <li className={`${styles.item} pt-4 pb-4 pr-5 pl-5 mr-2`}>
            <NavItem
              name={CREATE}
              isActive={active === CREATE}
              update={setActive}
            >
              <BurgerIcon type={active === CREATE ? "primary" : "secondary"} />
            </NavItem>
          </li>
          <li className={`${styles.item} pt-4 pb-4 pr-5 pl-5`}>
            <NavItem
              name={ORDERS}
              isActive={active === ORDERS}
              update={setActive}
            >
              <ListIcon type={active === ORDERS ? "primary" : "secondary"} />
            </NavItem>
          </li>
          <li className={styles.logo}>
            <Logo />
          </li>
          <li className={`${styles.item} pt-4 pb-4 pr-5 pl-5`}>
            <NavItem
              name={PROFILE}
              isActive={active === PROFILE}
              update={setActive}
            >
              <ProfileIcon
                type={active === PROFILE ? "primary" : "secondary"}
              />
            </NavItem>
          </li>
        </ul>
      </nav>
    </header>
  );
};
