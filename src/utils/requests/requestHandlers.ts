import { allMealsType } from "../types/allMealsType";

export const fetcAllhMeals = async () => {
  const urls = [
    "https://www.themealdb.com/api/json/v1/1/search.php?f=a",
    "https://www.themealdb.com/api/json/v1/1/search.php?f=b",
    "https://www.themealdb.com/api/json/v1/1/search.php?f=c",
    "https://www.themealdb.com/api/json/v1/1/search.php?f=d",
    "https://www.themealdb.com/api/json/v1/1/search.php?f=e",
    "https://www.themealdb.com/api/json/v1/1/search.php?f=f",
    "https://www.themealdb.com/api/json/v1/1/search.php?f=g",
    "https://www.themealdb.com/api/json/v1/1/search.php?f=v",
    "https://www.themealdb.com/api/json/v1/1/search.php?f=l",
    "https://www.themealdb.com/api/json/v1/1/search.php?f=m",
    "https://www.themealdb.com/api/json/v1/1/search.php?f=k",
    "https://www.themealdb.com/api/json/v1/1/search.php?f=s",
    "https://www.themealdb.com/api/json/v1/1/search.php?f=q",
  ];

  const responses = await Promise.all(urls.map((url) => fetch(url)));

  const data = await Promise.all(responses.map((response) => response.json()));

  const allMeals = data.flatMap((item) => item.meals || []);

  return { meals: allMeals } as allMealsType;
};

export const fetchMealById = async (id: number) => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
    { cache: "no-cache" }
  );
  const data = await response.json();

  return data as allMealsType;
};
