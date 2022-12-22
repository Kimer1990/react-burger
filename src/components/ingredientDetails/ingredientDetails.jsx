import styles from "./ingredient-details.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { fetchIngredients } from "../../services/actions/allIngredientsActions";

export const IngredientDetails = ({ title }) => {
  const dispatch = useDispatch();
  const params = useParams();

  const ingredientsList = useSelector(
    (state) => state.allIngredients.ingredientsList
  );

  useEffect(() => {
    if (!ingredientsList.length) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredientsList.length]);

  const ingredient = useMemo(
    () => ingredientsList.find((item) => item._id === params.id),
    [ingredientsList, params.id]
  );

  console.log(ingredientsList);
  console.log(ingredient);
  console.log(params);

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
