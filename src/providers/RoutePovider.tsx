import { createBrowserRouter, RouterProvider } from "react-router";
import App from "../App";
import { RecipeDetails } from "../layouts/RecipeDetails/RecipeDetails";
import { MainPage } from "../layouts/MainPage";
import { Cart } from "../layouts/Cart/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <MainPage /> },
      { path: "/:id", element: <RecipeDetails /> },
      { path: "/cart", element: <Cart /> },
    ],
  },
]);

export const RouteProvider = () => {
  return <RouterProvider router={router} />;
};
