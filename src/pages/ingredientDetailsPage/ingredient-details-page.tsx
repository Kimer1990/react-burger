import styles from "./ingredient-details-page.module.css";
import { useSelector } from "../../hooks";
import { useParams } from "react-router-dom";
import { useMemo, FC } from "react";
import { TIngredientItem } from "../../services/types/data";

type TIngredientDetailsPage = {
  title?: string;
};

export const IngredientDetailsPage: FC<TIngredientDetailsPage> = ({
  title,
}) => {
  const params = useParams<{ id: string }>();

  const ingredientsList = useSelector(
    (state) => state.allIngredients.ingredientsList
  );

  const ingredient = useMemo<TIngredientItem | any>(
    () =>
      ingredientsList.find((item: TIngredientItem) => item._id === params.id),
    [ingredientsList, params.id]
  );

  return (
    ingredient && (
      <>
        {title && (
          <span className={`${styles.title} mt-30 text text_type_main-large`}>
            {title}
          </span>
        )}
        <div className={`${styles.container} pb-15`}>
          <img
            className={styles.img}
            src={ingredient.image}
            alt={ingredient.name}
          />
          <h2 className={`${styles.title} text text_type_main-medium`}>
            {ingredient.name}
          </h2>
          <ul className={`${styles.compound} mt-8`}>
            <li className={`${styles.item} text_color_inactive`}>
              <span className="text text_type_main-small text_color_inactive">
                Калории, ккал
              </span>
              <span className="text text_type_digits-default">
                {ingredient.calories}
              </span>
            </li>
            <li className={`${styles.item} text_color_inactive`}>
              <span className="text text_type_main-small text_color_inactive">
                Белки, г
              </span>
              <span className="text text_type_digits-default">
                {ingredient.proteins}
              </span>
            </li>
            <li className={`${styles.item} text_color_inactive`}>
              <span className="text text_type_main-small text_color_inactive">
                Жиры, г
              </span>
              <span className="text text_type_digits-default">
                {ingredient.fat}
              </span>
            </li>
            <li className={`${styles.item} text_color_inactive`}>
              <span className="text text_type_main-small text_color_inactive">
                Углеводы, г
              </span>
              <span className="text text_type_digits-default">
                {ingredient.carbohydrates}
              </span>
            </li>
          </ul>
        </div>
      </>
    )
  );
};
