import { useRef, FC } from "react";
import styles from "./fillings-item.module.css";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { delIngredient } from "../../../services/actions/orderIngredientsActions";
import { useDispatch, useSelector } from "../../../hooks";
import { useDrop, useDrag } from "react-dnd";
import { updateIngredientOrder } from "../../../services/actions/orderIngredientsActions";
import { TIngredientItem } from "../../../services/types/data";

type TFillingsItem = {
  filling: TIngredientItem;
  index: number;
};

export const FillingsItem: FC<TFillingsItem> = ({ filling, index }) => {
  const dispatch = useDispatch();

  const { fillings } = useSelector((state) => state.orderIngredients);

  const ref = useRef<HTMLLIElement>(null);

  const [{ handlerId }, dropFillings] = useDrop({
    accept: "fillings",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: any, monitor) {
      if (!ref.current) {
        return;
      }
      if (item.index === index) {
        return;
      }

      const dropRect = ref.current.getBoundingClientRect();
      const dropMiddleY = (dropRect.bottom + dropRect.top) / 2;
      const clientOffsetY = monitor.getClientOffset()!.y;

      if (
        (dropMiddleY < clientOffsetY &&
          item.filling.unicId !== filling.unicId &&
          !(index - item.index === -1)) ||
        (dropMiddleY > clientOffsetY &&
          item.filling.unicId !== filling.unicId &&
          !(index - item.index === 1))
      ) {
        fillings.splice(item.index, 1);
        fillings.splice(index, 0, item.filling);
        dispatch(updateIngredientOrder(fillings));
        item.index = index;
      }
    },
  });

  const [, dragFillings] = useDrag({
    type: "fillings",
    item: () => ({ filling, index }),
  });

  dragFillings(dropFillings(ref));

  return (
    <li
      ref={ref}
      className={styles.li}
      key={filling.unicId}
      data-handler-id={handlerId}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        isLocked={false}
        text={filling.name}
        price={filling.price}
        thumbnail={filling.image}
        handleClose={() => dispatch(delIngredient(filling))}
      />
    </li>
  );
};
