import { useNavigate } from "react-router";

import styles from "./styles.module.scss";
import { Button, Input } from "@mui/material";

import { useSearch } from "../../utils/context/searchContext";
import { ChangeEvent, useEffect, useState } from "react";

export const Header = () => {
  const { setSearch } = useSearch();
  const [showSearchInput, setShowSearchInput] = useState<boolean>(false);

  const navigate = useNavigate();

  const navigateMainPageHandler = () => {
    navigate("/");
  };
  const navigateToCartHandler = () => {
    navigate("/cart");
  };

  const searchMealHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    if (window.location.pathname === "/") {
      setShowSearchInput(true);
    } else {
      setShowSearchInput(false);
    }
  }, [window.location.pathname]);

  return (
    <header className={styles.container}>
      <div className={styles.container_content}>
        <div
          className={styles.container_content_title}
          onClick={navigateMainPageHandler}
        >
          Recipes App
        </div>
        <div className={styles.container_content_cart}>
          <Button variant="contained" onClick={navigateToCartHandler}>
            Cart
          </Button>
        </div>
      </div>
      {showSearchInput && <Input onChange={searchMealHandler} />}
    </header>
  );
};
