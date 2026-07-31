import SellingProducts from "./SellingProducts";
import "./sellingProduct.css";

import coat from "../../assets/products/coat.png";
import bag from "../../assets/products/bag.png";
import cooler from "../../assets/products/coller.png";
import bookself from "../../assets/products/bookself.png";
import { useSearch } from "../../context/SearchContext";
const products = [
    {
      id: 1,
      image: coat,
      title: "The North Coat",
      category: "Men's Fashion",
      subCategory:"Jackets",
      price: 260,
      oldPrice: 360,
      rating: 5,
      reviews: 65,
    },
    {
      id: 2,
      image: bag,
      title: "Gucci Duffle Bag",
      category: "Men's Fashion",
      subCategory:"Bags",

      price: 960,
      oldPrice: 1160,
      rating: 4.5,
      reviews: 65,
    },
    {
      id: 3,
      image: cooler,
      title: "RGB Liquid CPU Cooler",
      category: "Electronics",
      price: 160,
      oldPrice: 170,
      rating: 4.5,
      reviews: 65,
    },
    {
      id: 4,
      image: bookself,
      title: "Small Bookshelf",
      category: "Home & Lifestyle",
      price: 360,
      oldPrice: 400,
      rating: 5,
      reviews: 65,
    },
  ];

export default function SellingFlash() {
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
            <span className="today-text">This Month</span>
          </div>

          <h2 className="selling-title">Best Selling Products</h2>
        </div>

        <button className="view-btn">View All</button>
      </div>

      <div className="products">
        {filteredProducts.map((item) => (
          <SellingProducts key={item.id} product={item} />
        ))}
      </div>
    </section>
  );
}
