
import { products } from "../../data/products";
// import { useSearch } from "../../context/SearchContext";
import "./allProducts.css";
import ProductCard from "../../components/product/ProductCard";

import "../../components/sellingProducts/sellingProduct.css";
import { useSearchParams } from "react-router-dom";

export default function AllProducts() {
  // const { search } = useSearch();
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search")?.toLowerCase() || "";

  const filteredProducts = search
    ? products.filter((item) => {
        return (
          item.title?.toLowerCase().includes(search) ||
          item.name?.toLowerCase().includes(search) ||
          item.category?.toLowerCase().includes(search)
        );
      })
    : products;

  return (
    <section className="selling-section">
      <div className="selling-header">
        <div>
          <div className="today">
            <span className="today-bar"></span>
            <span className="today-text">Products</span>
          </div>

          <h2 className="selling-title">All Products</h2>
        </div>
      </div>

      <div className="products">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <h2>No Products Found</h2>
        )}
      </div>
    </section>
  );
}
