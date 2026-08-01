import SellingProducts from "../../components/sellingProducts/SellingProducts";
import { products } from "../../data/products";
import { useSearch } from "../../context/SearchContext";
// import "./allProducts.css";

import "../../components/sellingProducts/sellingProduct.css"

export default function AllProducts() {
  const { search } = useSearch();

  const filteredProducts = products.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

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
        {filteredProducts.map((item) => (
          <SellingProducts key={item.id} product={item} />
        ))}
      </div>
    </section>
  );
}