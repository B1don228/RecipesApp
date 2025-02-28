import { useQuery } from "@tanstack/react-query";
import { fetcAllhMeals } from "../utils/requests/requestHandlers";
import { ChangeEvent, useEffect, useState } from "react";
import { RecipeCard } from "../components/RecipeCard/RecipeCard";

import styles from "./styles.module.scss";
import { Pagination } from "@mui/material";
import { useDebounce } from "../hooks/useDebounce";
import { useSearch } from "../utils/context/searchContext";
import { ClipLoader } from "react-spinners";

export const MainPage = () => {
  const [page, setPage] = useState<number>(1);
  const [showItems, setShowItems] = useState<number>(10);

  const { search } = useSearch();
  const { data, isLoading } = useQuery(["meals"], fetcAllhMeals);

  const { debouncedValue, isDebouncing } = useDebounce({ searchValue: search });

  const handleChangePage = (_event: ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
    setShowItems(newPage * 10);
  };

  useEffect(() => {
    setPage(1);
    setShowItems(10);
  }, [debouncedValue]);

  return (
    <div className={styles.container}>
      {(isLoading || isDebouncing) && <ClipLoader loading={true} />}
      {!isDebouncing &&
        !isLoading &&
        data?.meals
          ?.filter((item) =>
            item.strMeal.toLowerCase().includes(debouncedValue.toLowerCase())
          )
          ?.slice(showItems - 10, showItems)
          ?.map((item) => <RecipeCard key={item.idMeal} {...item} />)}

      {!isDebouncing &&
        !isLoading &&
        data?.meals?.filter((item) =>
          item.strMeal.toLowerCase().includes(debouncedValue.toLowerCase())
        ).length === 0 && <div>Not found</div>}

      {isDebouncing ||
        isLoading ||
        (!isDebouncing &&
          !isLoading &&
          data?.meals?.filter((item) =>
            item.strMeal.toLowerCase().includes(debouncedValue.toLowerCase())
          ).length === 0) || (
          <Pagination
            count={Math.ceil(
              !isDebouncing &&
                !isLoading &&
                data?.meals?.filter((item) =>
                  item.strMeal
                    .toLowerCase()
                    .includes(debouncedValue.toLowerCase())
                ).length! / 10
            )}
            siblingCount={2}
            page={page}
            onChange={handleChangePage}
            color="primary"
            sx={{ marginTop: 3 }}
          />
        )}
    </div>
  );
};
