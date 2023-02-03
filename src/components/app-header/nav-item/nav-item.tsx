import styles from "./nav-item.module.css";
import { NavLink } from "react-router-dom";
import { FC, ReactNode } from "react";

type TNavItem = {
  children: ReactNode;
  link: string;
  name: string;
};

export const NavItem: FC<TNavItem> = (props) => {
  return (
    <NavLink
      to={props.link || "#"}
      exact
      activeClassName={styles.active}
      className={`${styles.link} text text_type_main-default`}
    >
      <div className={`${styles.icon} mr-2`}>{props.children}</div>
      {props.name}
    </NavLink>
  );
};
