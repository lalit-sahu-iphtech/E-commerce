import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import "./featured.css";

export default function ScrollTop() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={`scroll-top ${showButton ? "show" : ""}`}
      onClick={scrollToTop}
    >
      <FaArrowUp />
    </button>
  );
}