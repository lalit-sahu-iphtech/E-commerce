// src/data/products.js

// import gamepad from "../assets/products/gamepad.png";
// import keyboard from "../assets/products/keyboard.png";
// import monitor from "../assets/products/monitor.png";
// import chair from "../assets/products/chair.png";

// import laptop from "../assets/exploreProducts/laptop.png";
// import dogFood from "../assets/exploreProducts/dog-food.png";
// import camera from "../assets/exploreProducts/camera.png";
// import skincare from "../assets/exploreProducts/skincare.png";
// import car from "../assets/exploreProducts/car.png";
// import shoes from "../assets/exploreProducts/shoes.png";
// import jacket from "../assets/exploreProducts/jacket.png";

// import coat from "../assets/products/coat.png";
// import bag from "../assets/products/bag.png";
// import cooler from "../assets/products/coller.png";
// import bookself from "../assets/products/bookself.png";

// export const products = [
//   {
//     id: 1,
//     image: gamepad,
//     title: "HAVIT HV-G92 Gamepad",
//     category: "Gaming",
//     subCategory: "Gamepad",
//     price: 120,
//     oldPrice: 160,
//     discount: "-40%",
//     rating: 5,
//     reviews: 88,
//     description:
//       "Play comfortably with ergonomic design, responsive controls and vibration feedback. Perfect for PC gaming.",
//     colors: ["#000000", "#DB4444"],
//     sizes: ["S", "M", "L"],
//     stock: true,
//   },

//   {
//     id: 2,
//     image: keyboard,
//     title: "AK-900 Wired Keyboard",
//     category: "Electronics",
//     subCategory: "Keyboard",
//     price: 960,
//     oldPrice: 1160,
//     discount: "-35%",
//     rating: 4,
//     reviews: 75,
//     description:
//       "Mechanical gaming keyboard with RGB lighting, premium switches and comfortable typing experience.",
//     colors: ["#000000", "#DB4444"],
//     sizes: ["S", "M", "L"],
//     stock: true,
//   },

//   {
//     id: 3,
//     image: monitor,
//     title: "IPS LCD Gaming Monitor",
//     category: "Electronics",
//     subCategory: "Monitor",
//     price: 370,
//     oldPrice: 400,
//     discount: "-10%",
//     rating: 5,
//     reviews: 99,
//     description:
//       "24-inch IPS gaming monitor with vivid colors, Full HD resolution and ultra-smooth performance.",
//     colors: ["#000000", "#DB4444"],
//     sizes: ["S", "M", "L"],
//     stock: true,
//   },

//   {
//     id: 4,
//     image: chair,
//     title: "S-Series Comfort Chair",
//     category: "Furniture",
//     subCategory: "Gaming Chair",
//     price: 375,
//     oldPrice: 400,
//     discount: "-15%",
//     rating: 4.5,
//     reviews: 99,
//     description:
//       "Comfortable gaming chair with adjustable height, lumbar support and premium leather finish.",
//     colors: ["#000000", "#DB4444"],
//     sizes: ["S", "M", "L"],
//     stock: true,
//   },
//  {
//   id: 5,
//   image: coat,
//   title: "The North Coat",
//   category: "Men's Fashion",
//   subCategory: "Jackets",
//   price: 260,
//   oldPrice: 360,
//   rating: 5,
//   reviews: 65,
//   description:
//     "Premium winter coat made with high-quality fabric, providing warmth, comfort, and a stylish look for cold weather.",
//     colors: ["#000000", "#DB4444"],
//     sizes: ["S", "M", "L"],
// },

// {
//   id: 6,
//   image: bag,
//   title: "Gucci Duffle Bag",
//   category: "Men's Fashion",
//   subCategory: "Bags",
//   price: 960,
//   oldPrice: 1160,
//   rating: 4.5,
//   reviews: 65,
//   description:
//     "Luxury duffle bag crafted with premium materials, offering spacious storage and an elegant design for travel and everyday use.",
//     colors: ["#000000", "#DB4444"],
//     sizes: ["S", "M", "L"],
// },

// {
//   id: 7,
//   image: cooler,
//   title: "RGB Liquid CPU Cooler",
//   category: "Electronics",
//   price: 160,
//   oldPrice: 170,
//   rating: 4.5,
//   reviews: 65,
//   description:
//     "High-performance RGB liquid CPU cooler designed to keep your processor cool while delivering quiet and efficient cooling.",
//     colors: ["#000000", "#DB4444"],
//     sizes: ["S", "M", "L"],
// },

// {
//   id: 8,
//   image: bookself,
//   title: "Small Bookshelf",
//   category: "Home & Lifestyle",
//   price: 360,
//   oldPrice: 400,
//   rating: 5,
//   reviews: 65,
//   description:
//     "Modern wooden bookshelf with multiple storage shelves, perfect for organizing books, decor items, and office essentials.",
//     colors: ["#000000", "#DB4444"],
//     sizes: ["S", "M", "L"],
// },

// {
//   id: 9,
//   image: dogFood,
//   title: "Breed Dry Dog Food",
//   category: "Groceries & Pets",
//   price: 100,
//   rating: 3,
//   reviews: 35,
//   description:
//     "Nutritious dry dog food made with high-quality ingredients to support your pet's healthy growth and active lifestyle.",
//     colors: ["#000000", "#DB4444"],
//     sizes: ["S", "M", "L"],
// },

// {
//   id: 10,
//   image: camera,
//   title: "CANON EOS DSLR Camera",
//   category: "Electronics",
//   price: 360,
//   rating: 4,
//   reviews: 95,
//   showCart: true,
//   description:
//     "Professional DSLR camera featuring high-resolution image quality, advanced autofocus, and Full HD video recording.",
//     colors: ["#000000", "#DB4444"],
//     sizes: ["S", "M", "L"],
// },

// {
//   id: 11,
//   image: laptop,
//   title: "ASUS FHD Gaming Laptop",
//   category: "Electronics",
//   price: 700,
//   rating: 5,
//   reviews: 325,
//   description:
//     "Powerful gaming laptop with Full HD display, high-speed processor, dedicated graphics, and fast SSD storage for smooth performance.",
//     colors: ["#000000", "#DB4444"],
//     sizes: ["S", "M", "L"],
// },

// {
//   id: 12,
//   image: skincare,
//   title: "Curology Product Set",
//   category: "Health & Beauty",
//   price: 500,
//   rating: 4,
//   reviews: 145,
//   description:
//     "Complete skincare kit formulated to cleanse, hydrate, and protect your skin while improving its natural glow.",
//     colors: ["#000000", "#DB4444"],
//     sizes: ["S", "M", "L"],
// },

// {
//   id: 13,
//   image: car,
//   title: "Kids Electric Car",
//   category: "Baby's & Toys",
//   price: 960,
//   rating: 5,
//   reviews: 65,
//   badge: "NEW",
//   colors: ["#FB1314", "#DB4444"],
//   description:
//     "Battery-powered ride-on electric car for kids with realistic controls, LED lights, and rechargeable battery.",
//     colors: ["#000000", "#DB4444"],
//     sizes: ["S", "M", "L"],
// },

// {
//   id: 14,
//   image: shoes,
//   title: "Jr. Zoom Soccer Cleats",
//   category: "Sports & Outdoor",
//   price: 1160,
//   rating: 5,
//   reviews: 35,
//   colors: ["#00ff66", "#DB4444"],
//   description:
//     "Lightweight soccer cleats designed for excellent grip, comfort, and stability on natural and artificial grass surfaces.",
//     colors: ["#000000", "#DB4444"],
//     sizes: ["S", "M", "L"],
// },

// {
//   id: 15,
//   image: gamepad,
//   title: "GP11 Shooter USB Gamepad",
//   category: "Electronics",
//   price: 660,
//   rating: 4.5,
//   reviews: 55,
//   badge: "NEW",
//   colors: ["#000", "#DB4444"],
//   description:
//     "USB gaming controller with responsive buttons, dual vibration feedback, and ergonomic design for an immersive gaming experience.",
//     colors: ["#000000", "#DB4444"],
//     sizes: ["S", "M", "L"],
// },

// {
//   id: 16,
//   image: jacket,
//   title: "Quilted Satin Jacket",
//   category: "Men's Fashion",
//   price: 660,
//   rating: 4.5,
//   reviews: 65,
//   colors: ["#000", "#DB4444"],
//   description:
//     "Stylish quilted satin jacket featuring a lightweight design, comfortable fit, and premium finish for everyday fashion.",
//     colors: ["#000000", "#DB4444"],
//     sizes: ["S", "M", "L"],
// },



   
  
// ];

// src/data/products.js

import gamepad from "../assets/products/gamepad.png";
import keyboard from "../assets/products/keyboard.png";
import monitor from "../assets/products/monitor.png";
import chair from "../assets/products/chair.png";

import laptop from "../assets/exploreProducts/laptop.png";
import dogFood from "../assets/exploreProducts/dog-food.png";
import camera from "../assets/exploreProducts/camera.png";
import skincare from "../assets/exploreProducts/skincare.png";
import car from "../assets/exploreProducts/car.png";
import shoes from "../assets/exploreProducts/shoes.png";
import jacket from "../assets/exploreProducts/jacket.png";

import coat from "../assets/products/coat.png";
import bag from "../assets/products/bag.png";
import cooler from "../assets/products/coller.png";
import bookself from "../assets/products/bookself.png";

// Category wise product data (Phones, Computers, SmartWatch, Camera, etc.)
import { categoryProducts } from "./categoryProducts";
import { sidebarProducts } from "./sidebarProducts";

export const products = [
  {
    id: 1,
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
  },

  {
    id: 2,
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

  {
    id: 3,
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
    sizes: ["S", "M", "L"],
    stock: true,
  },

  {
    id: 4,
    image: chair,
    title: "S-Series Comfort Chair",
    category: "Furniture",
    subCategory: "Gaming Chair",
    price: 375,
    oldPrice: 400,
    discount: "-15%",
    rating: 4.5,
    reviews: 99,
    description:
      "Comfortable gaming chair with adjustable height, lumbar support and premium leather finish.",
    colors: ["#000000", "#DB4444"],
    sizes: ["S", "M", "L"],
    stock: true,
  },
 {
  id: 5,
  image: coat,
  title: "The North Coat",
  category: "Men's Fashion",
  subCategory: "Jackets",
  price: 260,
  oldPrice: 360,
  rating: 5,
  reviews: 65,
  description:
    "Premium winter coat made with high-quality fabric, providing warmth, comfort, and a stylish look for cold weather.",
    colors: ["#000000", "#DB4444"],
    sizes: ["S", "M", "L"],
},

{
  id: 6,
  image: bag,
  title: "Gucci Duffle Bag",
  category: "Men's Fashion",
  subCategory: "Bags",
  price: 960,
  oldPrice: 1160,
  rating: 4.5,
  reviews: 65,
  description:
    "Luxury duffle bag crafted with premium materials, offering spacious storage and an elegant design for travel and everyday use.",
    colors: ["#000000", "#DB4444"],
    sizes: ["S", "M", "L"],
},

{
  id: 7,
  image: cooler,
  title: "RGB Liquid CPU Cooler",
  category: "Electronics",
  price: 160,
  oldPrice: 170,
  rating: 4.5,
  reviews: 65,
  description:
    "High-performance RGB liquid CPU cooler designed to keep your processor cool while delivering quiet and efficient cooling.",
    colors: ["#000000", "#DB4444"],
    sizes: ["S", "M", "L"],
},

{
  id: 8,
  image: bookself,
  title: "Small Bookshelf",
  category: "Home & Lifestyle",
  price: 360,
  oldPrice: 400,
  rating: 5,
  reviews: 65,
  description:
    "Modern wooden bookshelf with multiple storage shelves, perfect for organizing books, decor items, and office essentials.",
    colors: ["#000000", "#DB4444"],
    sizes: ["S", "M", "L"],
},

{
  id: 9,
  image: dogFood,
  title: "Breed Dry Dog Food",
  category: "Groceries & Pets",
  price: 100,
  rating: 3,
  reviews: 35,
  description:
    "Nutritious dry dog food made with high-quality ingredients to support your pet's healthy growth and active lifestyle.",
    colors: ["#000000", "#DB4444"],
    sizes: ["S", "M", "L"],
},

{
  id: 10,
  image: camera,
  title: "CANON EOS DSLR Camera",
  category: "Electronics",
  price: 360,
  rating: 4,
  reviews: 95,
  showCart: true,
  description:
    "Professional DSLR camera featuring high-resolution image quality, advanced autofocus, and Full HD video recording.",
    colors: ["#000000", "#DB4444"],
    sizes: ["S", "M", "L"],
},

{
  id: 11,
  image: laptop,
  title: "ASUS FHD Gaming Laptop",
  category: "Electronics",
  price: 700,
  rating: 5,
  reviews: 325,
  description:
    "Powerful gaming laptop with Full HD display, high-speed processor, dedicated graphics, and fast SSD storage for smooth performance.",
    colors: ["#000000", "#DB4444"],
    sizes: ["S", "M", "L"],
},

{
  id: 12,
  image: skincare,
  title: "Curology Product Set",
  category: "Health & Beauty",
  price: 500,
  rating: 4,
  reviews: 145,
  description:
    "Complete skincare kit formulated to cleanse, hydrate, and protect your skin while improving its natural glow.",
    colors: ["#000000", "#DB4444"],
    sizes: ["S", "M", "L"],
},

{
  id: 13,
  image: car,
  title: "Kids Electric Car",
  category: "Baby's & Toys",
  price: 960,
  rating: 5,
  reviews: 65,
  badge: "NEW",
  colors: ["#FB1314", "#DB4444"],
  description:
    "Battery-powered ride-on electric car for kids with realistic controls, LED lights, and rechargeable battery.",
    colors: ["#000000", "#DB4444"],
    sizes: ["S", "M", "L"],
},

{
  id: 14,
  image: shoes,
  title: "Jr. Zoom Soccer Cleats",
  category: "Sports & Outdoor",
  price: 1160,
  rating: 5,
  reviews: 35,
  colors: ["#00ff66", "#DB4444"],
  description:
    "Lightweight soccer cleats designed for excellent grip, comfort, and stability on natural and artificial grass surfaces.",
    colors: ["#000000", "#DB4444"],
    sizes: ["S", "M", "L"],
},

{
  id: 15,
  image: gamepad,
  title: "GP11 Shooter USB Gamepad",
  category: "Electronics",
  price: 660,
  rating: 4.5,
  reviews: 55,
  badge: "NEW",
  colors: ["#000", "#DB4444"],
  description:
    "USB gaming controller with responsive buttons, dual vibration feedback, and ergonomic design for an immersive gaming experience.",
    colors: ["#000000", "#DB4444"],
    sizes: ["S", "M", "L"],
},

{
  id: 16,
  image: jacket,
  title: "Quilted Satin Jacket",
  category: "Men's Fashion",
  price: 660,
  rating: 4.5,
  reviews: 65,
  colors: ["#000", "#DB4444"],
  description:
    "Stylish quilted satin jacket featuring a lightweight design, comfortable fit, and premium finish for everyday fashion.",
    colors: ["#000000", "#DB4444"],
    sizes: ["S", "M", "L"],
},

  // ======================= CATEGORY PRODUCTS =======================
  // Phones, Computers, SmartWatch, Camera, Headphones, Gaming,
  // Laptop, Speaker, Television, Printer, Tablet — sab categoryProducts.js se
  ...Object.values(categoryProducts).flat(),

  ...Object.values(sidebarProducts).flat(),

];