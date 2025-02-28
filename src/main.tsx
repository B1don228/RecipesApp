import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import { QueryProvider } from "./providers/QueryProvider.tsx";
import { RouteProvider } from "./providers/RoutePovider.tsx";
import { CartProvider } from "./utils/context/cartContext.tsx";
import { SearchProvider } from "./utils/context/searchContext.tsx";

const cartItems = localStorage.getItem("cartItems");
if (!cartItems) {
  localStorage.setItem("cartItems", JSON.stringify([]));
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartProvider>
      <SearchProvider>
        <QueryProvider>
          <RouteProvider />
        </QueryProvider>
      </SearchProvider>
    </CartProvider>
  </StrictMode>
);
