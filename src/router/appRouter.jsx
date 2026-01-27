import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Categories from "../pages/Categories";
import Products from "../pages/Products";
import CategoryProducts from "../pages/CategoryProducts";
import ProductDetail from "../pages/ProductDetail";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "categories", element: <Categories /> },
      { path: "products", element: <Products /> }, // all products
      { path: "category/:slug", element: <CategoryProducts /> }, // ✅ IMPORTANT
      { path: "product/:slug", element: <ProductDetail /> },
    ],
  },
]);

export default appRouter;
