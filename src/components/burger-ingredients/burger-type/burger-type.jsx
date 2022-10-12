import { BurgerItem } from '../burger-item/burger-item'
import styles from './burger-type.module.css'
import PropTypes from 'prop-types'
import { burgerListItemPropTypes } from '../../../utils/prop-types'

export const BurgerType = props => {
  return (
    <div>
      <h2 className={styles.title}>{props.title}</h2>
      <ul className={`pt-6 pb-10 pl-4 pr-4 ${styles.items}`}>
        {props.list.map(item => (
          <BurgerItem menuItem={item} key={item._id} amount={1}></BurgerItem>
        ))}
      </ul>
    </div>
  )
}

BurgerType.propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(burgerListItemPropTypes)
}
