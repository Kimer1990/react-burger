import styles from "./nav-item.module.css";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

export const NavItem = (props) => {
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

NavItem.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string,
};
