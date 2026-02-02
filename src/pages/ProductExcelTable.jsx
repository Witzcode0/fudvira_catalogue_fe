import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";

const API_URL = "https://fudviraapi.pythonanywhere.com/api/products/";
const CATEGORY_API = "https://fudviraapi.pythonanywhere.com/api/categories/";
const MEDIA_BASE = "https://fudviraapi.pythonanywhere.com";

export default function ProductExcelTable() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setProducts(data?.results || []))
      .catch(() => setProducts([]));
  }, []);

  useEffect(() => {
    fetch(CATEGORY_API)
      .then(res => res.json())
      .then(data => setCategories(data || []))
      .catch(() => setCategories([]));
  }, []);

  const filteredProducts = useMemo(() => {
    if (!categoryFilter) return products;
    return products.filter(p => p.category?.slug === categoryFilter);
  }, [products, categoryFilter]);

  const columns = useMemo(() => [
    {
      id: "sr",
      header: "#",
      cell: ({ row }) => row.index + 1,
    },
    // {
    //   accessorKey: "primary_image",
    //   header: "Image",
    //   cell: info =>
    //     info.getValue() ? (
    //       <img
    //         src={`${MEDIA_BASE}${info.getValue()}`}
    //         className="excel-product-image"
    //         alt=""
    //       />
    //     ) : "-",
    // },
    {
      accessorKey: "name",
      header: "Product Name",
    },
    {
      accessorFn: row => row.category?.name,
      id: "category",
      header: "Category",
    },
    {
      id: "action",
      header: "Details",
      cell: ({ row }) => (
        <Link
          to={`/products-excel/${row.original.slug}`}
          className="excel-view-link"
        >
          View
        </Link>
      ),
    },
  ], []);

  const table = useReactTable({
    data: filteredProducts,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="excel-page">
      <h1 className="excel-title">Products – Excel View</h1>

      <div className="excel-header">
        <input
          placeholder="Search products..."
          value={globalFilter}
          onChange={e => setGlobalFilter(e.target.value)}
        />

        <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.slug}>
              {cat.name} ({cat.product_count})
            </option>
          ))}
        </select>
      </div>

      <div className="excel-table-wrapper">
        <table className="excel-table">
          <thead>
            {table.getHeaderGroups().map(hg => (
              <tr key={hg.id}>
                {hg.headers.map(header => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
