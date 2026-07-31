import { createContext, useContext, useState } from "react";

const CategoryContext = createContext();

export function CategoryProvider({ children }) {
  const [category, setCategory] = useState("All");
  const [subCategory, setSubCategory] = useState("");


  return (
    <CategoryContext.Provider
      value={{ category, setCategory, subCategory, setSubCategory }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export const useCategory = () => useContext(CategoryContext);