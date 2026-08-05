// ======================= PHONES =======================

// iPhone 16 Pro Max
import iphone16_1 from "../assets/products/phones/iphone16-1.png";
import iphone16_2 from "../assets/products/phones/iphone16-2.png";
import iphone16_3 from "../assets/products/phones/iphone16-3.png";
import iphone16_4 from "../assets/products/phones/iphone16-4.png";

// MacBook Pro M4
import macbook_1 from "../assets/products/computers/macbook-1.png";
import macbook_2 from "../assets/products/computers/macbook-2.png";
import macbook_3 from "../assets/products/computers/macbook-3.png";
import macbook_4 from "../assets/products/computers/macbook-4.png";

// Apple Watch Ultra 2
import watchUltra_1 from "../assets/products/smartwatch/watchultra-1.png";
import watchUltra_2 from "../assets/products/smartwatch/watchultra-2.png";
import watchUltra_3 from "../assets/products/smartwatch/watchultra-3.png";
import watchUltra_4 from "../assets/products/smartwatch/watchultra-4.png";

// ======================= CAMERA =======================

// Sony A7 IV
import sony_1 from "../assets/products/camera/sony-1.png";
import sony_2 from "../assets/products/camera/sony-2.png";
import sony_3 from "../assets/products/camera/sony-3.png";
import sony_4 from "../assets/products/camera/sony-4.png";

// Sony WH-1000XM5
import sonyHead_1 from "../assets/products/headphones/sonyhead-1.png";
import sonyHead_2 from "../assets/products/headphones/sonyhead-2.png";
import sonyHead_3 from "../assets/products/headphones/sonyhead-3.png";
import sonyHead_4 from "../assets/products/headphones/sonyhead-4.png";

// ======================= GAMING =======================

// PS5 Controller
import ps5_1 from "../assets/products/gaming/ps5-1.png";
import ps5_2 from "../assets/products/gaming/ps5-2.png";
import ps5_3 from "../assets/products/gaming/ps5-3.png";
import ps5_4 from "../assets/products/gaming/ps5-4.png";

// ======================= LAPTOP =======================

// MacBook Air M3
import macbook_1 from "../assets/products/laptop/macbook-1.png";
import macbook_2 from "../assets/products/laptop/macbook-2.png";
import macbook_3 from "../assets/products/laptop/macbook-3.png";
import macbook_4 from "../assets/products/laptop/macbook-4.png";

// ======================= SPEAKER =======================

// JBL Flip 6
import flip6_1 from "../assets/products/speaker/flip6-1.png";
import flip6_2 from "../assets/products/speaker/flip6-2.png";
import flip6_3 from "../assets/products/speaker/flip6-3.png";
import flip6_4 from "../assets/products/speaker/flip6-4.png";


// ======================= TELEVISION =======================

// Samsung Neo QLED
import samsungTv_1 from "../assets/products/television/samsung-1.png";
import samsungTv_2 from "../assets/products/television/samsung-2.png";
import samsungTv_3 from "../assets/products/television/samsung-3.png";
import samsungTv_4 from "../assets/products/television/samsung-4.png";

// ======================= PRINTER =======================

// HP LaserJet
import hpPrinter_1 from "../assets/products/printer/hp-1.png";
import hpPrinter_2 from "../assets/products/printer/hp-2.png";
import hpPrinter_3 from "../assets/products/printer/hp-3.png";
import hpPrinter_4 from "../assets/products/printer/hp-4.png";

// ======================= TABLET =======================

// iPad Air
import ipad_1 from "../assets/products/tablet/ipad-1.png";
import ipad_2 from "../assets/products/tablet/ipad-2.png";
import ipad_3 from "../assets/products/tablet/ipad-3.png";
import ipad_4 from "../assets/products/tablet/ipad-4.png";



export const categoryProducts = {

  Phones: [

    {
      id: 101,
      category: "Phones",
      title: "iPhone 16 Pro Max",

      images: [
        iphone16_1,
        iphone16_2,
        iphone16_3,
        iphone16_4,
      ],

      price: 1499,
      oldPrice: 1699,
      discount: "-12%",
      rating: 4.9,
      reviews: 254,
      badge: "New",

      description:
        "Apple iPhone 16 Pro Max with A18 Pro chip, Super Retina XDR display, titanium design and advanced camera system.",
    },

   
  ],

  Computers: [

    {
      id: 201,
      category: "Computers",
      title: "MacBook Pro M4",

      images: [
        macbook_1,
        macbook_2,
        macbook_3,
        macbook_4,
      ],

      price: 2299,
      oldPrice: 2499,
      discount: "-8%",
      rating: 4.9,
      reviews: 188,
      badge: "New",

      description:
        "Apple MacBook Pro with M4 chip, Liquid Retina XDR display and all-day battery life.",
    },
  ],

SmartWatch: [

    {
    id:301,
    category:"SmartWatch",
    title:"Apple Watch Ultra 2",
    
    images:[
    watchUltra_1,
    watchUltra_2,
    watchUltra_3,
    watchUltra_4,
    ],
    
    price:899,
    oldPrice:999,
    discount:"-10%",
    rating:4.9,
    reviews:210,
    badge:"New",
    
    description:
    "Premium Apple smartwatch with titanium case, GPS and health tracking.",
    },

],

Camera:[

 {
    id:401,
    category:"Camera",
    title:"Sony A7 IV",
    
    images:[sony_1,sony_2,sony_3,sony_4],
    
    price:2499,
    oldPrice:2699,
    discount:"-8%",
    rating:4.9,
    reviews:232,
    
    description:"Sony full-frame mirrorless camera with 33MP sensor.",
    },
],

HeadPhones: [

    {
    id:501,
    category:"HeadPhones",
    title:"Sony WH-1000XM5",
    
    images:[sonyHead_1,sonyHead_2,sonyHead_3,sonyHead_4],
    
    price:399,
    oldPrice:449,
    discount:"-11%",
    rating:4.9,
    reviews:286,
    
    description:"Industry-leading noise cancelling wireless headphones.",
    },
],
Gaming:[

  {
    id:601,
    category:"Gaming",
    title:"PS5 DualSense Controller",
    
    images:[ps5_1,ps5_2,ps5_3,ps5_4],
    
    price:79,
    oldPrice:99,
    discount:"-20%",
    rating:4.9,
    reviews:321,
    
    description:"Sony DualSense wireless controller with adaptive triggers.",
    },
],
Laptop: [

    {
    id:701,
    category:"Laptop",
    title:"MacBook Air M3",
    
    images:[macbook_1,macbook_2,macbook_3,macbook_4],
    
    price:1299,
    oldPrice:1399,
    discount:"-8%",
    rating:4.9,
    reviews:312,
    
    description:"Apple MacBook Air with M3 chip and Liquid Retina display.",
    },


],
Speaker:[

    {
    id:801,
    category:"Speaker",
    title:"JBL Flip 6",
    
    images:[flip6_1,flip6_2,flip6_3,flip6_4],
    
    price:149,
    oldPrice:179,
    discount:"-17%",
    rating:4.8,
    reviews:189,
    
    description:"Portable waterproof Bluetooth speaker with powerful bass.",
    },
],
Television:[

    {
    id:901,
    category:"Television",
    title:"Samsung Neo QLED",
    
    images:[samsungTv_1,samsungTv_2,samsungTv_3,samsungTv_4],
    
    price:1599,
    oldPrice:1799,
    discount:"-11%",
    rating:4.9,
    reviews:258,
    
    description:"65-inch Samsung Neo QLED 4K Smart TV.",
    },
],
Printer:[

    {
    id:1001,
    category:"Printer",
    title:"HP LaserJet Pro",
    
    images:[hpPrinter_1,hpPrinter_2,hpPrinter_3,hpPrinter_4],
    
    price:299,
    oldPrice:349,
    discount:"-14%",
    rating:4.8,
    reviews:134,
    
    description:"Wireless monochrome laser printer.",
    },

],
Tablet:[

    {
    id:1101,
    category:"Tablet",
    title:"Apple iPad Air",
    
    images:[ipad_1,ipad_2,ipad_3,ipad_4],
    
    price:699,
    oldPrice:749,
    discount:"-7%",
    rating:4.9,
    reviews:221,
    
    description:"Apple iPad Air with M2 chip.",
    },

],



  

}