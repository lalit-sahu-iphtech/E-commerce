import "./SidebarProductsPage.css";

import { Link, useParams } from "react-router-dom";

import SidebarCard from "../../components/product/SidebarCard";

import { sidebarProducts } from "../../data/sidebarProducts";

export default function SidebarProductsPage() {
  const { categoryName } = useParams();

  const products = sidebarProducts[categoryName] || [];

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

            <SidebarCard
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