import { BurgerItem } from "../burger-item/burger-item";
import styles from "./burger-type.module.css";
import { FC } from "react";
import { TIngredientItem } from "../../../services/types/data";

type TBurgerType = {
  title: string;
  list: Array<TIngredientItem>;
  id: string;
};

export const BurgerType: FC<TBurgerType> = ({ title, list, id }) => {
  return (
    <div id={id}>
      <h2 className={styles.title}>{title}</h2>
      <ul className={`pt-6 pb-10 pl-4 pr-2 ${styles.items}`}>
        {list.map((item) => (
          <BurgerItem ingredient={item} key={item._id}></BurgerItem>
        ))}
      </ul>
    </div>
  );
};
