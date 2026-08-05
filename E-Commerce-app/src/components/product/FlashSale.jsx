import ProductCard from "./ProductCard";
import "./product.css";

import { useSearch } from "../../context/SearchContext";
import { useCategory } from "../../context/CategoryContext";
import { useNavigate } from "react-router-dom";

import { products } from "../../data/products";

import { useState, useEffect } from "react";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function FlashSale() {
  const navigate = useNavigate();

  const { category, subCategory } = useCategory();
  const { search } = useSearch();

  // ================= Products Slider =================

  const productsPerPage = 4;

  const filteredProducts = products.filter((item) => {
    const matchSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "All" || item.category === category;

    const matchSubCategory =
      subCategory === "" ||
      item.subCategory === subCategory;

    return (
      matchSearch &&
      matchCategory &&
      matchSubCategory
    );
  });

  const [currentIndex, setCurrentIndex] =
    useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [search, category, subCategory]);

  const nextProducts = () => {
    if (
      currentIndex + productsPerPage >=
      filteredProducts.length
    ) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(
        currentIndex + productsPerPage
      );
    }
  };

  const prevProducts = () => {
    if (currentIndex === 0) {
      const lastIndex =
        Math.floor(
          (filteredProducts.length - 1) /
            productsPerPage
        ) * productsPerPage;

      setCurrentIndex(lastIndex);
    } else {
      setCurrentIndex(
        currentIndex - productsPerPage
      );
    }
  };

  // ================= Timer =================

  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 3);

  const calculateTimeLeft = () => {
    const difference =
      targetDate - new Date();

    if (difference <= 0) {
      return {
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
      };
    }

    return {
      days: String(
        Math.floor(
          difference /
            (1000 * 60 * 60 * 24)
        )
      ).padStart(2, "0"),

      hours: String(
        Math.floor(
          (difference /
            (1000 * 60 * 60)) %
            24
        )
      ).padStart(2, "0"),

      minutes: String(
        Math.floor(
          (difference / (1000 * 60)) %
            60
        )
      ).padStart(2, "0"),

      seconds: String(
        Math.floor(
          (difference / 1000) % 60
        )
      ).padStart(2, "0"),
    };
  };

  const [timeLeft, setTimeLeft] =
    useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="flash-sale"
      id="flash-sale"
    >
      <div className="flash-sale-header">
        <div className="today">
          <span className="today-bar"></span>

          <span className="today-text">
            Today's
          </span>
        </div>

        <div className="flash-sale-top">
          <h2 className="flash-sale-title">
            Flash Sales
          </h2>

          <div className="timer">
            <div className="timer-box">
              <span className="timer-label">
                Days
              </span>

              <span className="timer-value">
                {timeLeft.days}
              </span>
            </div>

            <span className="timer-colon">
              :
            </span>

            <div className="timer-box">
              <span className="timer-label">
                Hours
              </span>

              <span className="timer-value">
                {timeLeft.hours}
              </span>
            </div>

            <span className="timer-colon">
              :
            </span>

            <div className="timer-box">
              <span className="timer-label">
                Minutes
              </span>

              <span className="timer-value">
                {timeLeft.minutes}
              </span>
            </div>

            <span className="timer-colon">
              :
            </span>

            <div className="timer-box">
              <span className="timer-label">
                Seconds
              </span>

              <span className="timer-value">
                {timeLeft.seconds}
              </span>
            </div>
          </div>

          <div className="flash-arrows">
            <button
              className="arrow-btn"
              onClick={prevProducts}
            >
              <FaArrowLeft />
            </button>

            <button
              className="arrow-btn"
              onClick={nextProducts}
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>

      <div className="products">
        {filteredProducts.length > 0 ? (
          filteredProducts
            .slice(
              currentIndex,
              currentIndex +
                productsPerPage
            )
            .map((item) => (
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
          onClick={() =>
            navigate("/products")
          }
        >
          View All Products
        </button>
      </div>
    </section>
  );
}