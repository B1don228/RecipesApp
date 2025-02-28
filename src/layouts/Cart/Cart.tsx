import { ChangeEvent, useState } from "react";
import { RecipeCard } from "../../components/RecipeCard/RecipeCard";
import { Pagination } from "@mui/material";
import styles from "./styles.module.scss";
import { useCart } from "../../utils/context/cartContext";

export const Cart = () => {
  const { cart } = useCart();

  const [page, setPage] = useState<number>(1);
  const [showItems, setShowItems] = useState<number>(10);

  const handleChangePage = (_event: ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
    setShowItems(newPage * 10);
  };

  return (
    <div className={styles.container}>
      {cart.slice(showItems - 10, showItems)?.map((item) => (
        <RecipeCard key={item.idMeal} {...item} />
      ))}

      <Pagination
        count={Math.ceil(cart?.length! / 10)}
        siblingCount={2}
        page={page}
        onChange={handleChangePage}
        color="primary"
        sx={{ marginTop: 3 }}
      />
    </div>
  );
};
