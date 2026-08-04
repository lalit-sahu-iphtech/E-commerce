// src/data/products.js


import laptop from "../assets/exploreProducts/laptop.png";
import monitor from "../assets/products/monitor.png";
import gamepad from "../assets/products/gamepad.png";
import keyboard from "../assets/products/keyboard.png";


export const products = [
  {
  id: 1,
  image: laptop,
  discount:"-35%",
  title: "ASUS FHD Gaming Laptop",
  category: "Electronics",
  price: 700,
  oldPrice : 1160,
  rating: 5,
  reviews: 325,
  description:
    "Powerful gaming laptop with Full HD display, high-speed processor, dedicated graphics, and fast SSD storage for smooth performance.",
    

},
  {
    id: 2,
    image: monitor,
    title: "IPS LCD Gaming Monitor",
    category: "Electronics",
    subCategory: "Monitor",
    price: 370,
    oldPrice: 400,
    discount: "-10%",
    rating: 5,
    reviews: 99,
    description:
      "24-inch IPS gaming monitor with vivid colors, Full HD resolution and ultra-smooth performance.",
    colors: ["#000000", "#DB4444"],
    sizes: ["24 Inch"],
    stock: true,
  },

  {
    id: 3,
    image: gamepad,
    title: "HAVIT HV-G92 Gamepad",
    category: "Gaming",
    subCategory: "Gamepad",
    price: 120,
    oldPrice: 160,
    discount: "-40%",
    rating: 5,
    reviews: 88,
    description:
      "Play comfortably with ergonomic design, responsive controls and vibration feedback. Perfect for PC gaming.",
    colors: ["#000000", "#DB4444"],
    sizes: ["S", "M", "L"],
    stock: true,
    new:true,
  },

  {
    id: 4,
    image: keyboard,
    title: "AK-900 Wired Keyboard",
    category: "Electronics",
    subCategory: "Keyboard",
    price: 960,
    oldPrice: 1160,
    discount: "-35%",
    rating: 4,
    reviews: 75,
    description:
      "Mechanical gaming keyboard with RGB lighting, premium switches and comfortable typing experience.",
    colors: ["#000000", "#DB4444"],
    sizes: ["S", "M", "L"],
    stock: true,
  },






   
  
];