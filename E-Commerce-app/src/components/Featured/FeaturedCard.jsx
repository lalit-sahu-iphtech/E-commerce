import "./featured.css";

export default function FeaturedCard({
  image,
  title,
  description,
  large,
  wide,
}) {

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

        <button>
          Shop Now
        </button>

      </div>

    </div>

  );

}