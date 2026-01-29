import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import appRouter from "./router/appRouter";
import { CategoryProvider } from "./store/CategoryContext";

import "./assets/css/global.css";
import "./assets/css/navbar-footer.css";
import "./assets/css/home.css";
import "./assets/css/category.css";
import "./assets/css/products.css";
import "./assets/css/product-detail.css";
import "./assets/css/notfound.css";
import "./assets/css/maintenance.css";
import "./assets/css/certificates.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CategoryProvider>
    <RouterProvider router={appRouter} />
  </CategoryProvider>
);
