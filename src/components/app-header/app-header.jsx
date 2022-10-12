import { useState } from 'react';
import { NavItem } from './nav-item/nav-item'
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo
} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css'

export const AppHeader = () => {
  const [active, setActive] = useState("Конструктор");

  return (
    <header className={styles.header}>
      <nav className={`${styles.navigation} pt-2 pb-2`}>
        <ul className={styles.list}>
          <li className={`${styles.item} pt-4 pb-4 pr-5 pl-5 mr-2`}>
            <NavItem name="Конструктор" isActive={active === "Конструктор"} update={setActive}>
              <BurgerIcon type={active === "Конструктор" ? 'primary' : 'secondary'} />
            </NavItem>
          </li>
          <li className={`${styles.item} pt-4 pb-4 pr-5 pl-5`}>
            <NavItem name="Лента заказов" isActive={active === "Лента заказов"} update={setActive}>
              <ListIcon type={active === "Лента заказов" ? 'primary' : 'secondary'} />
            </NavItem>
          </li>
          <li className={styles.logo}>
            <Logo />
          </li>
          <li className={`${styles.item} pt-4 pb-4 pr-5 pl-5`}>
            <NavItem name="Личный кабинет" isActive={active === "Личный кабинет"} update={setActive}>
              <ProfileIcon type={active === "Личный кабинет" ? 'primary' : 'secondary'} />
            </NavItem>
          </li>
        </ul>
      </nav>
    </header>
  )
}
