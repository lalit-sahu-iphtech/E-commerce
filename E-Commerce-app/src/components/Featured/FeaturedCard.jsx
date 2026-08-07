import { useNavigate } from "react-router-dom";
import "./featured.css";

export default function FeaturedCard({
  image,
  title,
  description,
  large,
  wide,
}) {

  const navigate = useNavigate();

  return (

    <div
      className={`featured-card
      ${large ? "large-card" : ""}
      ${wide ? "wide-card" : ""}`}
    >

      <img
        src={image}
        alt={title}
      />

      <div className="overlay">

        <h3>{title}</h3>

        <p>{description}</p>

        <button onClick={() => navigate("/products")}>
          Shop Now
        </button>

      </div>

    </div>

  );

}