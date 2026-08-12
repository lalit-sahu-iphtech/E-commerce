import "./cancellations.css";

import {
  Link,
} from "react-router-dom";

import {
  useSelector,
} from "react-redux";

export default function Cancellations() {

  // ========================================
  // GET CANCELLATIONS FROM REDUX
  // ========================================

  const cancellations =
    useSelector(
      (state) =>
        state.cancellations?.items ||
        []
    );

  return (
    <section className="cancellations-page">

      {/* ========================================
          BREADCRUMB
      ======================================== */}

      <div className="cancellations-breadcrumb">

        <Link to="/">
          Home
        </Link>

        <span>/</span>

        <span>
          My Cancellations
        </span>

      </div>

      {/* ========================================
          HEADER
      ======================================== */}

      <div className="cancellations-header">

        <div>

          <span className="cancellations-label">
            Cancellations
          </span>

          <h1>
            My Cancellations
          </h1>

        </div>

        <span className="cancellations-count">

          {cancellations.length}

          {" "}

          Orders

        </span>

      </div>

      {/* ========================================
          CANCELLATION LIST
      ======================================== */}

      {cancellations.length > 0 ? (

        <div className="cancellations-list">

          {cancellations.map(
            (item) => (

              <div
                className="cancellation-card"
                key={
                  item.cancellationId
                }
              >

                {/* ========================================
                    IMAGE
                ======================================== */}

                <div className="cancellation-image">

                  <img
                    src={
                      item.image
                    }
                    alt={
                      item.title ||
                      item.name
                    }
                  />

                </div>

                {/* ========================================
                    PRODUCT INFO
                ======================================== */}

                <div className="cancellation-info">

                  <h3>
                    {
                      item.title ||
                      item.name
                    }
                  </h3>

                  <p className="cancellation-price">

                    $
                    {Number(
                      item.price || 0
                    ).toFixed(2)}

                  </p>

                  <p className="cancellation-quantity">

                    Quantity:{" "}

                    {
                      item.quantity ||
                      1
                    }

                  </p>

                  {item.orderId && (
                    <p className="cancellation-order-id">
                      Order ID:{" "}
                      {item.orderId}
                    </p>
                  )}

                </div>

                {/* ========================================
                    STATUS
                ======================================== */}

                <div className="cancellation-status">

                  <span>
                    {
                      item.cancellationStatus ||
                      "Cancelled"
                    }
                  </span>

                </div>

                {/* ========================================
                    DATE
                ======================================== */}

                <div className="cancellation-date">

                  <p>
                    Cancelled on
                  </p>

                  <strong>
                    {
                      item.cancelledAt ||
                      "Recently"
                    }
                  </strong>

                </div>

              </div>

            )
          )}

        </div>

      ) : (

        /* ========================================
            EMPTY STATE
        ======================================== */

        <div className="empty-cancellations">

          <div className="cancel-icon">
            ✕
          </div>

          <h2>
            No Cancelled Orders
          </h2>

          <p>
            You don't have any
            cancelled orders.
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