import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import Categories from "../pages/Categories";
import Products from "../pages/Products";
import ProductDetail from "../pages/ProductDetail";
import TermsConditions from "../pages/TermsConditions";
import NotFound from "../pages/NotFound";
import UnderMaintenance from "../pages/UnderMaintenance";
import Certificates from "../pages/Certificates";
import ProductPriceList from "../pages/ProductPriceList";
import ProductExcelTable from "../pages/ProductExcelTable";
import ProductDetailExcel from "../pages/ProductDetailExcel";


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "categories", element: <Categories /> },
      {
        path: "/products",
        element: <Products />,
        key: "products"
      },
      {
        path:"/products-excel",
        element: <ProductExcelTable />
      },
      {
        path:"/products-excel/:slug",
        element: <ProductDetailExcel /> 
      },
      { path: "product/:slug", element: <ProductDetail /> },
      {
        path: "/coming-soon",
        element: <UnderMaintenance />,
      },
      { path: "terms-and-conditions", element: <TermsConditions /> },
      { path: "certificates", element: <Certificates /> },
      { path: "price-list", element: <ProductPriceList /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default appRouter;
