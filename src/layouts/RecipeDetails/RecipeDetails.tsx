import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { COLORS } from "../../constants/COLORS";

import styles from "./styles.module.scss";
import { useQuery } from "@tanstack/react-query";
import { fetchMealById } from "../../utils/requests/requestHandlers";
import { useState } from "react";
import { mealType } from "../../utils/types/mealType";
import { FaCartPlus } from "react-icons/fa";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { IoMdArrowBack } from "react-icons/io";
import { useCart } from "../../utils/context/cartContext";
import { ClimbingBoxLoader } from "react-spinners";

export const RecipeDetails = () => {
  const [cartItemsState, setCartItemsState] = useState<mealType[]>(
    JSON.parse(localStorage.getItem("cartItems")!) || []
  );
  const { setCart } = useCart();

  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery(["meal", id], () =>
    fetchMealById(+id!)
  );

  const addToFavouriteHandler = (event: React.MouseEvent<SVGElement>) => {
    event.stopPropagation();

    const cartItems = JSON.parse(
      localStorage.getItem("cartItems") || "[]"
    ) as mealType[];

    cartItems.push(data?.meals?.[0]!);

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
      (item) => item.idMeal !== data?.meals?.[0]!.idMeal
    );

    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    setCartItemsState(newCartItems);
    setCart(newCartItems);
  };

  const backHandler = () => {
    return navigate(-1);
  };

  return (
    <Card
      sx={{
        marginTop: 5,
        background: COLORS.primary_blue_gradient,
        color: "white",
        borderRadius: 8,
      }}
      className={styles.container}
    >
      {isError && <div>Some error occured</div>}
      {isLoading && <ClimbingBoxLoader loading color="white" />}
      {!isLoading && !isError && (
        <CardContent
          sx={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <Typography sx={{ textAlign: "start" }} variant="h4">
            <IoMdArrowBack cursor="pointer" onClick={backHandler} />
          </Typography>
          <Typography sx={{ textAlign: "start" }} variant="h4">
            {!cartItemsState.find(
              (item) => item.idMeal === data?.meals?.[0].idMeal
            ) ? (
              <FaCartPlus
                size={25}
                color="white"
                onClick={addToFavouriteHandler}
              />
            ) : (
              <MdOutlineRemoveShoppingCart
                size={25}
                color="white"
                onClick={deleteFromFavouritesHandler}
              />
            )}
          </Typography>
          <div className={styles.container_meal}>
            {data?.meals?.[0].strMeal}
          </div>
          <div className={styles.container_meal}>
            <CardMedia
              component="img"
              image={data?.meals?.[0].strMealThumb}
              alt="Meal"
              width={200}
              height={200}
              sx={{ maxWidth: 280 }}
            />
          </div>
          <div className={styles.container_meal}>
            {data?.meals?.[0].strInstructions}
          </div>
          <div className={styles.container_description}>
            {data?.meals?.[0].strCategory && (
              <div>
                <p>{data?.meals?.[0].strCategory}</p>
              </div>
            )}
            {data?.meals?.[0].strArea && (
              <div>
                <p>{data?.meals?.[0].strArea}</p>
              </div>
            )}
            {data?.meals?.[0].strTags && (
              <div>
                <p>{data?.meals?.[0].strTags}</p>
              </div>
            )}
            {data?.meals?.[0].strYoutube && (
              <div>
                <a
                  href={data?.meals?.[0].strYoutube}
                  style={{ color: "white" }}
                >
                  See Video
                </a>
              </div>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
};
