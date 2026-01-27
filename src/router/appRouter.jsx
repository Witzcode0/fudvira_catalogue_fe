import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import Categories from "../pages/Categories";
import Products from "../pages/Products";
import ProductDetail from "../pages/ProductDetail";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "category/:slug",
        element: <Products />,
      },
      {
        path: "product/:slug",
        element: <ProductDetail />,
      },
    ],
  },
]);

export default appRouter;
