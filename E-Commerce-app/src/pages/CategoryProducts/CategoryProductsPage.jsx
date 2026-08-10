import "./categoryProductsPage.css";

import {
  Link,
  useParams,
  useSearchParams,
} from "react-router-dom";

import CategoryCard from "../../components/product/CategoryCard";

import { categoryProducts } from "../../data/categoryProducts";

export default function CategoryProductsPage() {
  const { categoryName } = useParams();

  const [searchParams] = useSearchParams();

  // URL se search value
  const searchValue = searchParams.get("search") || "";

  const products = categoryProducts[categoryName] || [];

  // Filter products
  const filteredProducts =
    searchValue.trim() === ""
      ? products
      : products.filter((product) => {
          const value = searchValue.toLowerCase().trim();

          return (
            product.title?.toLowerCase().includes(value) ||
            product.name?.toLowerCase().includes(value) ||
            product.category?.toLowerCase().includes(value) ||
            product.subCategory?.toLowerCase().includes(value)
          );
        });

  return (
    <section className="category-products-page">

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/">Home</Link>

        <span>/</span>

        <span>{categoryName}</span>

        {searchValue && (
          <>
            <span>/</span>

            <span>
              Search: "{searchValue}"
            </span>
          </>
        )}
      </div>

      {/* Heading */}
      <div className="category-heading">
        <h2>{categoryName}</h2>

        <p>
          {filteredProducts.length} Products Found
        </p>
      </div>

      {/* Products */}
      {filteredProducts.length > 0 ? (
        <div className="category-products-grid">
          {filteredProducts.map((product) => (
            <CategoryCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="empty-products">
          <h2>No Products Found</h2>

          {searchValue && (
            <p>
              No products found for "{searchValue}"
            </p>
          )}
        </div>
      )}
    </section>
  );
}