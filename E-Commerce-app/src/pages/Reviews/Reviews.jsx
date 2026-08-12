import "./reviews.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaStar, FaRegStar } from "react-icons/fa";

export default function Reviews() {
  const reviews = useSelector(
    (state) => state.reviews?.items || []
  );

  return (
    <section className="reviews-page">

      {/* Breadcrumb */}
      <div className="reviews-breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <span>My Reviews</span>
      </div>

      {/* Header */}
      <div className="reviews-header">
        <div>
          <span className="reviews-label">
            Reviews
          </span>

          <h1>My Reviews</h1>
        </div>

        <span className="reviews-count">
          {reviews.length} Reviews
        </span>
      </div>

      {/* Reviews */}
      {reviews.length > 0 ? (

        <div className="reviews-list">

          {reviews.map((review) => (

            <div
              className="review-card"
              key={review.id}
            >

              {/* Product Image */}
              <div className="review-image">
                <img
                  src={review.image}
                  alt={review.title || review.name}
                />
              </div>

              {/* Review Content */}
              <div className="review-content">

                <h3>
                  {review.title || review.name}
                </h3>

                {/* Rating */}
                <div className="review-rating">

                  {[1, 2, 3, 4, 5].map((star) =>
                    star <= review.rating ? (
                      <FaStar
                        key={star}
                        className="star-filled"
                      />
                    ) : (
                      <FaRegStar
                        key={star}
                        className="star-empty"
                      />
                    )
                  )}

                  <span>
                    {review.rating}/5
                  </span>

                </div>

                {/* Review Text */}
                <p className="review-text">
                  {review.comment}
                </p>

                {/* Date */}
                {review.date && (
                  <p className="review-date">
                    Reviewed on {review.date}
                  </p>
                )}

              </div>

            </div>

          ))}

        </div>

      ) : (

        /* Empty Reviews */
        <div className="empty-reviews">

          <div className="review-empty-icon">
            ★
          </div>

          <h2>No Reviews Yet</h2>

          <p>
            You haven't reviewed any products yet.
          </p>

          <Link
            to="/products"
            className="review-shop-btn"
          >
            Browse Products
          </Link>

        </div>

      )}

    </section>
  );
}