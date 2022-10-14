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
  const [active, setActive] = useState(menuConst.create);

  return (
    <header className={styles.header}>
      <nav className={`${styles.navigation} pt-2 pb-2`}>
        <ul className={styles.list}>
          <li className={`${styles.item} pt-4 pb-4 pr-5 pl-5 mr-2`}>
            <NavItem
              name={menuConst.create}
              isActive={active === menuConst.create}
              update={setActive}
            >
              <BurgerIcon
                type={active === menuConst.create ? "primary" : "secondary"}
              />
            </NavItem>
          </li>
          <li className={`${styles.item} pt-4 pb-4 pr-5 pl-5`}>
            <NavItem
              name={menuConst.orders}
              isActive={active === menuConst.orders}
              update={setActive}
            >
              <ListIcon
                type={active === menuConst.orders ? "primary" : "secondary"}
              />
            </NavItem>
          </li>
          <li className={styles.logo}>
            <Logo />
          </li>
          <li className={`${styles.item} pt-4 pb-4 pr-5 pl-5`}>
            <NavItem
              name={menuConst.profile}
              isActive={active === menuConst.profile}
              update={setActive}
            >
              <ProfileIcon
                type={active === menuConst.profile ? "primary" : "secondary"}
              />
            </NavItem>
          </li>
        </ul>
      </nav>
    </header>
  );
};
