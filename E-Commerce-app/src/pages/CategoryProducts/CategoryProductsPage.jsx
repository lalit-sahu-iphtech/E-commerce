import "./categoryProductsPage.css";

import { Link, useParams } from "react-router-dom";

import CategoryCard from "../../components/product/CategoryCard";

import { categoryProducts } from "../../data/categoryProducts";
import { useSearch } from "../../context/SearchContext";

export default function CategoryProductsPage() {
  const { categoryName } = useParams();
  const{search} = useSearch();

  const products = categoryProducts[categoryName] || [];

  const filteredProducts =
  search.trim() === ""
    ? products
    : products.filter((product) =>
        product.title
          .toLowerCase()
          .includes(search.toLowerCase())
      );

  return (
    <section className="category-page">

      {/* Breadcrumb */}

      <div className="breadcrumb">

        <Link to="/">Home</Link>

        <span>/</span>

        <span>{categoryName}</span>

      </div>

      {/* Heading */}

      <div className="category-heading">

        <h2>{categoryName}</h2>

        <p>{filteredProducts.length} Products Found</p>

      </div>

      {/* Products */}

      {products.length > 0 ? (

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

        </div>

      )}

    </section>
  );
}