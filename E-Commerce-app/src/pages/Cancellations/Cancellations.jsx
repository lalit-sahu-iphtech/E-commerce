import "./cancellations.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Cancellations() {
  const cancellations = useSelector(
    (state) => state.cancellations?.items || []
  );

  return (
    <section className="cancellations-page">

      {/* Breadcrumb */}
      <div className="cancellations-breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <span>My Cancellations</span>
      </div>

      {/* Header */}
      <div className="cancellations-header">
        <div>
          <span className="cancellations-label">
            Cancellations
          </span>

          <h1>My Cancellations</h1>
        </div>

        <span className="cancellations-count">
          {cancellations.length} Orders
        </span>
      </div>

      {/* Cancellation List */}
      {cancellations.length > 0 ? (
        <div className="cancellations-list">

          {cancellations.map((item) => (
            <div className="cancellation-card" key={item.id}>

              {/* Product Image */}
              <div className="cancellation-image">
                <img
                  src={item.image}
                  alt={item.title || item.name}
                />
              </div>

              {/* Product Info */}
              <div className="cancellation-info">

                <h3>
                  {item.title || item.name}
                </h3>

                <p className="cancellation-price">
                  ${Number(item.price || 0).toFixed(2)}
                </p>

                <p className="cancellation-quantity">
                  Quantity: {item.quantity || 1}
                </p>

              </div>

              {/* Status */}
              <div className="cancellation-status">
                <span>
                  {item.cancellationStatus || "Cancelled"}
                </span>
              </div>

              {/* Date */}
              <div className="cancellation-date">
                <p>
                  Cancelled on
                </p>

                <strong>
                  {item.cancelledAt || "Recently"}
                </strong>
              </div>

            </div>
          ))}

        </div>
      ) : (

        /* Empty State */
        <div className="empty-cancellations">

          <div className="cancel-icon">
            ✕
          </div>

          <h2>No Cancelled Orders</h2>

          <p>
            You don't have any cancelled orders.
          </p>

          <Link
            to="/products"
            className="browse-products-btn"
          >
            Browse Products
          </Link>

        </div>
      )}

    </section>
  );
}