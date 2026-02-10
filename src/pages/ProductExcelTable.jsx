import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";

const API_BASE = "https://fudviraapi.pythonanywhere.com";

/* IMAGE HANDLER */
const getImageUrl = (image) => {
  if (!image) return "/placeholder.png";
  if (image.startsWith("http")) return image;
  return `${API_BASE}${image}`;
};

export default function ProductExcelTable() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const [count, setCount] = useState(0);
  const pageSize = 6;
  const totalPages = Math.ceil(count / pageSize);

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    let url = `${API_BASE}/api/products/?page=${page}`;

    if (search) {
      url = `${API_BASE}/api/products/search/?q=${encodeURIComponent(
        search
      )}&page=${page}`;
    } else if (category) {
      url = `${API_BASE}/api/products/?category=${category}&page=${page}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.results || []);
        setCount(data.count || 0);
      })
      .catch(() => {
        setProducts([]);
        setCount(0);
      });
  }, [search, category, page]);

  /* ================= CATEGORIES ================= */
  useEffect(() => {
    fetch(`${API_BASE}/api/categories/`)
      .then((res) => res.json())
      .then((data) => setCategories(data || []))
      .catch(() => setCategories([]));
  }, []);

  /* ================= COLUMNS ================= */
  const columns = useMemo(
    () => [
      {
        header: "#",
        cell: ({ row }) => (page - 1) * pageSize + row.index + 1,
      },
      {
        accessorKey: "primary_image",
        header: "Image",
        cell: (info) => (
          <img
            src={getImageUrl(info.getValue())}
            className="excel-product-image"
            alt=""
          />
        ),
      },
      {
        accessorKey: "name",
        header: "Product Name",
      },
      {
        accessorFn: (row) => row.category?.name,
        header: "Category",
      },
      {
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
    ],
    [page]
  );

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  /* ================= UI ================= */
  return (
    <div className="excel-page">
      <h1 className="excel-title">Products – Excel View</h1>

      {/* FILTERS */}
      <div className="excel-header">
        <input
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.slug}>
              {cat.name} ({cat.product_count})
            </option>
          ))}
        </select>
      </div>

      {/* TABLE */}
      <div className="excel-table-wrapper">
        <table className="excel-table">
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            ← Prev
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
