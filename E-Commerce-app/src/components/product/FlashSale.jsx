import ProductCard from "./ProductCard";
import "./product.css"

import gamepad from "../../assets/products/gamepad.png"
import keyboard from "../../assets/products/keyboard.png"
import monitor from "../../assets/products/monitor.png"
import chair from "../../assets/products/chair.png"

import { useSearch } from "../../context/SearchContext";
import { useCategory } from "../../context/CategoryContext";
const products = [
   {
    id : 1,
    image : gamepad,
    title:"HAVIT HV-G92 Gamepad",
    price : 120,
    category:"Electronics",
    subCategory: "Gaming",
    oldPrice : 160,
    disCount : "-40%",
    rating : 5,
    reviews : 88,
   },
   {
    id : 2,
    image : keyboard,
    title:"AK-900 WIred Keyboard",
    price : 960,
    category:"Electronics",
    subCategory: "Accessories",

    oldPrice : 1160,
    disCount : "-35%",
    rating : 4,
    reviews : 75,
   },
    {
    id : 3,
    image : monitor,
    title:"IPS LCD Gaming Monitor",
    price : 370,
    category:"Electronics",
    subCategory: "Monitors",

    oldPrice : 400,
    disCount : "-30%",
    rating : 5,
    reviews : 99,
   },
    {
    id : 4,
    image : chair,
    title:"S-Series Comfort Chair",
    price : 375,
    category:"Home & Lifestyle",
    subCategory: "Furniture",
    oldPrice : 400,
    disCount : "-25%",
    rating : 4.5,
    reviews : 99,
   }
]

export default function FlashSale(){
    const { category, subCategory } = useCategory();
    const{search} = useSearch();

    const filteredProducts = products.filter((item) => {

        const matchSearch =
          item.title.toLowerCase().includes(search.toLowerCase());
      
        const matchCategory =
          category === "All" ||
          item.category === category;
      
        const matchSubCategory =
          subCategory === "" ||
          item.subCategory === subCategory;
      
        return (
          matchSearch &&
          matchCategory &&
          matchSubCategory
        );
      
      });
    return(
        <section className="flash-sale"id="flash-sale">

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
                {
                filteredProducts.length > 0 ? (
                    filteredProducts.map((item) =>(
                        <ProductCard
                        key={item.id}
                        product = {item}
                        />
                    ))
                
                ) : (
                    <h2 className="no-product">No Product Found</h2>
                )}
              
            </div>
            <div className="view-all-wrapper">
                <button>View All Products</button>
            </div>
        </section>
    )
}