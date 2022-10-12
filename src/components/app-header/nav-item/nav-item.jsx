import { useState } from 'react';
import styles from './nav-item.module.css'
import PropTypes from 'prop-types'

export const NavItem = props => {
  const [isHover, setIsHover] = useState(false);

   const handleMouseEnter = () => {
      setIsHover(true);
   };
   const handleMouseLeave = () => {
      setIsHover(false);
   };

   let textColor = props.isActive || isHover ? "text_color_primary" : "text_color_inactive";

  return (
    <a
      href={props.link || '#'}
      className={`${styles.link} ${textColor} text text_type_main-default`}
      onClick={() => props.update(props.name)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`${styles.icon} mr-2`}>{props.children}</div>
      {props.name}
    </a>
  )
}

NavItem.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string
}
