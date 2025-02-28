import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import styles from "./styles.module.scss";
import { FaCartPlus } from "react-icons/fa";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { Box } from "@mui/material";
import { COLORS } from "../../constants/COLORS";
import { mealType } from "../../utils/types/mealType";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useCart } from "../../utils/context/cartContext";

export const RecipeCard = (meal: mealType) => {
  const navigate = useNavigate();

  const [cartItemsState, setCartItemsState] = useState<mealType[]>(
    JSON.parse(localStorage.getItem("cartItems")!) || []
  );
  const { setCart } = useCart();

  const navigateHandler = () => {
    return navigate(`/${meal.idMeal}`);
  };

  const addToFavouriteHandler = (event: React.MouseEvent<SVGElement>) => {
    event.stopPropagation();

    const cartItems = JSON.parse(
      localStorage.getItem("cartItems") || "[]"
    ) as mealType[];

    cartItems.push(meal);

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    setCartItemsState(cartItems);
    setCart(cartItems);
  };

  const deleteFromFavouritesHandler = (event: React.MouseEvent<SVGElement>) => {
    event.stopPropagation();

    const cartItems = JSON.parse(
      localStorage.getItem("cartItems") || "[]"
    ) as mealType[];

    const newCartItems = cartItems.filter(
      (item) => item.idMeal !== meal.idMeal
    );

    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    setCartItemsState(newCartItems);
    setCart(newCartItems);
  };

  return (
    <Card
      sx={{
        marginTop: 5,
        width: "240px",
        borderRadius: 4,
        color: "white",
        background: COLORS.primary_blue_gradient,
        display: "flex",
        flexDirection: "column",
        gap: 15,
      }}
      onClick={navigateHandler}
    >
      <div className={styles.container_delete}>
        {!cartItemsState.find((item) => item.idMeal === meal.idMeal) ? (
          <FaCartPlus
            cursor="pointer"
            size={15}
            color="white"
            onClick={addToFavouriteHandler}
          />
        ) : (
          <MdOutlineRemoveShoppingCart
            cursor="pointer"
            size={15}
            color="white"
            onClick={deleteFromFavouritesHandler}
          />
        )}
      </div>
      <CardContent>
        <Box display={"flex"} alignItems={"center"} width={"100%"} gap={1}>
          <Box display={"flex"} flexDirection={"column"}>
            <CardMedia
              component="img"
              image={meal.strMealThumb}
              alt="Meal"
              width={90}
              height={110}
              sx={{ maxWidth: 200 }}
            />
          </Box>
          <Box display={"flex"} flexDirection={"column"} gap={1}>
            <Typography variant="inherit" style={{ fontSize: "12px" }}>
              {meal.strMeal}
            </Typography>
            <Typography variant="inherit" style={{ fontSize: "12px" }}>
              {meal.strCategory}
            </Typography>
            <Typography variant="inherit" style={{ fontSize: "12px" }}>
              {meal.strArea}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
