import styles from "./nav-item.module.css";
import PropTypes from "prop-types";

export const NavItem = ({ isActive, ...props }) => {
  return (
    <a
      href={props.link || "#"}
      className={`${styles.link} ${
        isActive ? "text_color_primary" : "text_color_inactive"
      } text text_type_main-default`}
      onClick={() => props.update(props.name)}
    >
      <div className={`${styles.icon} mr-2`}>{props.children}</div>
      {props.name}
    </a>
  );
};

NavItem.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string,
};
