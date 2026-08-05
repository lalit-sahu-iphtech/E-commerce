import "./categoryProductsPage.css";

import { Link, useParams } from "react-router-dom";

import CategoryCard from "../../components/product/CategoryCard";

import { categoryProducts } from "../../data/categoryProducts";

export default function CategoryProductsPage() {
  const { categoryName } = useParams();

  const products = categoryProducts[categoryName] || [];

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

        <p>{products.length} Products Found</p>

      </div>

      {/* Products */}

      {products.length > 0 ? (

        <div className="category-products-grid">

          {products.map((product) => (

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