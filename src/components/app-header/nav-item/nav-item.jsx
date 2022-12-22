import styles from "./nav-item.module.css";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

export const NavItem = (props) => {
  return (
    <NavLink
      to={props.link || "#"}
      exact
      className={`${styles.link} text_color_inactive text text_type_main-default`}
      activeClassName={styles.active}
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
