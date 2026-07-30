
import dogFood from "../../assets/exploreProducts/dog-food.png"
import camera from "../../assets/exploreProducts/camera.png"
import laptop from "../../assets/exploreProducts/laptop.png"
import skincare from "../../assets/exploreProducts/skincare.png"
import car from "../../assets/exploreProducts/car.png"
import shoes from "../../assets/exploreProducts/shoes.png"
import gamepad from "../../assets/exploreProducts/gamepad.png"
import jacket from "../../assets/exploreProducts/jacket.png"

import "./exploreProducts.css"
import ExploreCard from "./ExploreCard"

const products = [

    {
        id : 1,
        image : dogFood,
        title : "Breed Dry Dog Food",
        price : 100,
        rating:3,
        reviews : 35,
    },
    {
        id : 2,
        image : camera,
        title : "CANON EOS DSLR Camera",
        price : 360,
        rating:4,
        reviews : 95,
        showCart: true,

    },
    {
        id : 3,
        image : laptop,
        title : "ASUS FHD Gaming Laptop",
        price : 700,
        rating:5,
        reviews : 325,
    },
    {
        id : 4,
        image : skincare,
        title : "Curology Product Set",
        price : 500,
        rating:4,
        reviews : 145,
    },
    {
        id : 5,
        image : car,
        title : "Kids Electric Car",
        price : 960,
        rating:5,
        reviews : 65,
        badge: "NEW",
        colors: ["#FB1314", "#DB4444"],

    },
  
    {
        id : 6,
        image : shoes,
        title : "Jr. Zoom Soccer Cleats",
        price : 1160,
        rating:5,
        review : 35,
        colors: ["#00ff66", "#DB4444"],

    },
    {
        id : 7,
        image : gamepad,
        title : "Gp11 Shooter USB Gamepad",
        price : 660,
        rating:4.5,
        reviews : 55,
        badge: "NEW",
        colors: ["#000", "#DB4444"],
    },
    {
        id : 8,
        image : jacket,
        title : "Quilted Satin Jacket",
        price : 660,
        rating:4.5,
        reviews : 65,
        colors: ["#000", "#DB4444"],

    },
];

export default function ExploreProducts(){
    return(
        <section className="explore-section">
            <div className="today">
                <span className="today-bar"></span>
                <span className="today-text">Our Products</span>
            </div>
            <div className="explore-top">
                <h2 className="explore-title">Explore Our Products</h2>

                <div className="arrows">
                    <button className="arrow-btn">&#8592;</button>
                    <button className="arrow-btn">&#8594;</button>

                </div>
            </div>
            <div className="products-grid">
                {products.map((item)=>(
                    <ExploreCard key={item.id} product = {item}/>
                ))}
            </div>
            <div className="view-all-wrapper">
                <button className="view-btn">View All Products</button>
            </div>
        </section>
    )
}