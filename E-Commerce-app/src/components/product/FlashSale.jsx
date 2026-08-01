import ProductCard from "./ProductCard";
import "./product.css";

import { useSearch } from "../../context/SearchContext";
import { useCategory } from "../../context/CategoryContext";
import { useNavigate } from "react-router-dom";

import { products } from "../../data/products";

export default function FlashSale() {
  const navigate = useNavigate();

  const { category, subCategory } = useCategory();
  const { search } = useSearch();

  // Sirf pehle 4 products
  const flashProducts = products.slice(0, 4);

  const filteredProducts = flashProducts.filter((item) => {
    const matchSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "All" || item.category === category;

    const matchSubCategory =
      subCategory === "" || item.subCategory === subCategory;

    return (
      matchSearch &&
      matchCategory &&
      matchSubCategory
    );
  });

  return (
    <section className="flash-sale" id="flash-sale">
      <div className="flash-sale-header">
        <div className="today">
          <span className="today-bar"></span>
          <span className="today-text">Today's</span>
        </div>

        <div className="flash-sale-top">
          <h2 className="flash-sale-title">Flash Sales</h2>

          <div className="timer">
            <div className="timer-box">
              <span className="timer-label">Days</span>
              <span className="timer-value">03</span>
            </div>

            <span className="timer-colon">:</span>

            <div className="timer-box">
              <span className="timer-label">Hours</span>
              <span className="timer-value">23</span>
            </div>

            <span className="timer-colon">:</span>

            <div className="timer-box">
              <span className="timer-label">Minutes</span>
              <span className="timer-value">19</span>
            </div>

            <span className="timer-colon">:</span>

            <div className="timer-box">
              <span className="timer-label">Seconds</span>
              <span className="timer-value">56</span>
            </div>
          </div>
        </div>
      </div>

      <div className="products">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
            />
          ))
        ) : (
          <h2 className="no-product">
            No Product Found
          </h2>
        )}
      </div>

      <div className="view-all-wrapper">
        <button
          className="view-btn"
          onClick={() => navigate("/products")}
        >
          View All Products
        </button>
      </div>
    </section>
  );
}