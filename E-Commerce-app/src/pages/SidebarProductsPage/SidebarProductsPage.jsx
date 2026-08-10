import "./sidebarProductsPage.css";

import { Link, useParams, useSearchParams } from "react-router-dom";

import SidebarCard from "../../components/product/SidebarCard";

import { sidebarProducts } from "../../data/sidebarProducts";

export default function SidebarProductsPage() {
  const { categoryName } = useParams();

  const [searchParams] = useSearchParams();

  // URL se search value get karega
  const searchValue = searchParams.get("search") || "";

  const products = sidebarProducts[categoryName] || [];

  // Search ke according products filter
  const filteredProducts =
    searchValue.trim() === ""
      ? products
      : products.filter((product) => {
          const value = searchValue.toLowerCase().trim();

          return (
            product.name?.toLowerCase().includes(value) ||
            product.title?.toLowerCase().includes(value) ||
            product.category?.toLowerCase().includes(value) ||
            product.subCategory?.toLowerCase().includes(value)
          );
        });

  return (
    <section className="sidebar-products-page">

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/">Home</Link>

        <span>/</span>

        <span>{categoryName}</span>

        {searchValue && (
          <>
            <span>/</span>
            <span>Search: "{searchValue}"</span>
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
            <SidebarCard
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