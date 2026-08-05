import { useState } from "react";

import phone from "../../assets/category/phone.png";
import computers from "../../assets/category/computers.png";
import smartwatch from "../../assets/category/smartwatch.png";
import camera from "../../assets/category/camera.png";
import headphone from "../../assets/category/headphone.png";
import gaming from "../../assets/category/gaming.png";

import laptop from "../../assets/category/laptop.png";
import speaker from "../../assets/category/speaker.png";
import tv from "../../assets/category/tv.png";
import printer from "../../assets/category/printer.png";
import tablet from "../../assets/category/tablet.png";

import "./category.css";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Phones", icon: phone },
  { name: "Computers", icon: computers },
  { name: "SmartWatch", icon: smartwatch },
  { name: "Camera", icon: camera, active: true },
  { name: "HeadPhones", icon: headphone },
  { name: "Gaming", icon: gaming },

  { name: "Laptop", icon: laptop },
  { name: "Speaker", icon: speaker },
  { name: "Television", icon: tv },
  { name: "Printer", icon: printer },
  { name: "Tablet", icon: tablet },
];

export default function Category() {
  const navigate = useNavigate();
  const [startIndex, setStartIndex] = useState(0);

  const visibleCards = 6;

  const nextSlide = () => {
    if (startIndex + visibleCards < categories.length) {
      setStartIndex(startIndex + visibleCards);
    }
  };

  const prevSlide = () => {
    if (startIndex - visibleCards >= 0) {
      setStartIndex(startIndex - visibleCards);
    }
  };

  return (
    <section className="category-section">

      <div className="category-header">

        <div className="today">
          <span className="today-bar"></span>
          <span className="today-text">
            Categories
          </span>
        </div>

        <div className="category-top">

          <h2 className="category-title">
            Browse By Category
          </h2>

          <div className="arrows">

            <button
              className="arrow-btn"
              onClick={prevSlide}
            >
              &#8592;
            </button>

            <button
              className="arrow-btn"
              onClick={nextSlide}
            >
              &#8594;
            </button>

          </div>

        </div>

      </div>

    <div className="categories">
    {categories
      .slice(startIndex, startIndex + visibleCards)
      .map((item, index) => (
        <div
          key={index}
          className="category-card"
          onClick={() =>
            navigate(`/category/${item.name}`)
          }
        >
          <img
            src={item.icon}
            alt={item.name}
          />

          <p>{item.name}</p>
        </div>
      ))}
</div>

    </section>
  );
}