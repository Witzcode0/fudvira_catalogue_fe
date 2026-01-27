import { createContext, useContext, useEffect, useState } from "react";
import { API_BASE } from "../services/api";

const CategoryContext = createContext([]);

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/categories/`)
      .then((res) => res.json())
      .then((data) => {
        console.log("CATEGORY API DATA:", data); // 🔍 DEBUG
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Category API error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, loading }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => useContext(CategoryContext);
