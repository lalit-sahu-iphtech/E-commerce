import "./writeReview.css";

import { useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import { FaStar } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";

import { addReview } from "../../redux/slices/reviewsSlice";

import { products } from "../../data/products";

import { showToast } from "../../redux/slices/toastSlice";

export default function WriteReview() {
  const { productId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const [comment, setComment] = useState("");

  // Product find
  const product = products.find(
    (item) => String(item.id) === String(productId)
  );

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currentUser) {
      dispatch(
        showToast({
          message: "Please login first.",
          type: "error",
        })
      );

      navigate("/signup");
      return;
    }

    if (rating === 0) {
      dispatch(
        showToast({
          message: "Please select a rating.",
          type: "error",
        })
      );

      return;
    }

    if (!comment.trim()) {
      dispatch(
        showToast({
          message: "Please write your review.",
          type: "error",
        })
      );

      return;
    }

    const reviewData = {
      id: Date.now(),

      productId: product.id,

      title: product.title || product.name,

      image: product.image,

      rating: rating,

      comment: comment.trim(),

      date: new Date().toLocaleDateString(),

      userEmail: currentUser.email,
    };

    dispatch(addReview(reviewData));

    dispatch(
      showToast({
        message: "Review added successfully.",
        type: "success",
      })
    );

    navigate("/reviews");
  };

  // Product not found
  if (!product) {
    return (
      <section className="write-review-page">
        <div className="review-not-found">
          <h2>Product Not Found</h2>

          <Link to="/orders">
            Back to Orders
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="write-review-page">

      {/* Breadcrumb */}
      <div className="write-review-breadcrumb">
        <Link to="/">Home</Link>

        <span>/</span>

        <Link to="/orders">
          My Orders
        </Link>

        <span>/</span>

        <span>Write Review</span>
      </div>

      {/* Main */}
      <div className="write-review-container">

        <div className="write-review-header">
          <span>Reviews</span>

          <h1>Write a Review</h1>
        </div>

        {/* Product */}
        <div className="review-product">

          <div className="review-product-image">
            <img
              src={product.image}
              alt={product.title || product.name}
            />
          </div>

          <div className="review-product-info">

            <h2>
              {product.title || product.name}
            </h2>

            <p>
              ${product.price}
            </p>

          </div>

        </div>

        {/* Form */}
        <form
          className="review-form"
          onSubmit={handleSubmit}
        >

          {/* Rating */}
          <div className="rating-section">

            <label>
              Your Rating
            </label>

            <div className="stars">

              {[1, 2, 3, 4, 5].map((star) => (

                <FaStar
                  key={star}

                  className={
                    star <= (hoverRating || rating)
                      ? "rating-star active"
                      : "rating-star"
                  }

                  onClick={() =>
                    setRating(star)
                  }

                  onMouseEnter={() =>
                    setHoverRating(star)
                  }

                  onMouseLeave={() =>
                    setHoverRating(0)
                  }
                />

              ))}

              {rating > 0 && (
                <span className="rating-value">
                  {rating}/5
                </span>
              )}

            </div>

          </div>

          {/* Comment */}
          <div className="comment-section">

            <label htmlFor="review">
              Your Review
            </label>

            <textarea
              id="review"
              value={comment}
              onChange={(e) =>
                setComment(e.target.value)
              }
              placeholder="Write your experience with this product..."
              rows="6"
            />

          </div>

          {/* Buttons */}
          <div className="review-actions">

            <button
              type="button"
              className="cancel-review-btn"
              onClick={() =>
                navigate("/orders")
              }
            >
              Cancel
            </button>

            <button
              type="submit"
              className="submit-review-btn"
            >
              Submit Review
            </button>

          </div>

        </form>

      </div>

    </section>
  );
}