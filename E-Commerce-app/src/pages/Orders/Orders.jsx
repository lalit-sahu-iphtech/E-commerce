import "./orders.css";

import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import {
  addCancellation,
} from "../../redux/slices/cancellationSlice";

import { showToast } from "../../redux/slices/toastSlice";

import {
  FaBoxOpen,
  FaTimesCircle,
  FaStar,
} from "react-icons/fa";

export default function Orders() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector(
    (state) => state.cart?.items || []
  );

  const cancellations = useSelector(
    (state) => state.cancellations?.items || []
  );

  const handleCancelOrder = (item) => {
    const alreadyCancelled = cancellations.some(
      (cancelledItem) => cancelledItem.id === item.id
    );

    if (alreadyCancelled) {
      dispatch(
        showToast({
          message: "Order is already cancelled.",
          type: "error",
        })
      );

      return;
    }

    dispatch(addCancellation(item));

    dispatch(
      showToast({
        message: "Order cancelled successfully.",
        type: "success",
      })
    );
  };

  return (
    <section className="orders-page">

      {/* Breadcrumb */}
      <div className="orders-breadcrumb">
        <Link to="/">Home</Link>

        <span>/</span>

        <span>My Orders</span>
      </div>

      {/* Header */}
      <div className="orders-header">

        <div className="orders-title-wrapper">

          <div className="orders-label">
            <span></span>
            Orders
          </div>

          <h1>My Orders</h1>

          <p>
            Manage and track your recent orders
          </p>

        </div>

        <div className="orders-count">
          <FaBoxOpen />
          <span>{cart.length}</span>
          <p>Items</p>
        </div>

      </div>

      {/* Orders */}
      {cart.length > 0 ? (

        <div className="orders-list">

          {cart.map((item) => {

            const isCancelled = cancellations.some(
              (cancelledItem) =>
                cancelledItem.id === item.id
            );

            return (
              <div
                className={`order-card ${
                  isCancelled ? "order-cancelled" : ""
                }`}
                key={item.id}
              >

                {/* Product Image */}
                <div className="order-image">

                  <img
                    src={item.image}
                    alt={item.title || item.name}
                  />

                </div>

                {/* Product Info */}
                <div className="order-info">

                  <h3>
                    {item.title || item.name}
                  </h3>

                  <p className="order-price">
                    $
                    {Number(
                      item.price || 0
                    ).toFixed(2)}
                  </p>

                  <p className="order-quantity">
                    Quantity: {item.quantity || 1}
                  </p>

                </div>

                {/* Status */}
                <div className="order-status">

                  <span
                    className={
                      isCancelled
                        ? "cancelled"
                        : "processing"
                    }
                  >
                    {isCancelled ? (
                      <>
                        <FaTimesCircle />
                        Cancelled
                      </>
                    ) : (
                      <>
                        <FaBoxOpen />
                        Processing
                      </>
                    )}
                  </span>

                </div>

                {/* Actions */}
                <div className="order-actions">

                  {!isCancelled && (
                    <>
                      <button
                        className="cancel-order-btn"
                        onClick={() =>
                          handleCancelOrder(item)
                        }
                      >
                        Cancel Order
                      </button>

                      <button
                        className="write-review-btn"
                        onClick={() =>
                          navigate(
                            `/write-review/${item.id}`
                          )
                        }
                      >
                        <FaStar />
                        Write Review
                      </button>
                    </>
                  )}

                  {isCancelled && (
                    <button
                      className="view-cancellation-btn"
                      onClick={() =>
                        navigate("/cancellations")
                      }
                    >
                      View Cancellation
                    </button>
                  )}

                </div>

              </div>
            );
          })}

        </div>

      ) : (

        /* Empty Orders */
        <div className="empty-orders">

          <div className="empty-orders-icon">
            <FaBoxOpen />
          </div>

          <h2>No Orders Yet</h2>

          <p>
            You haven't placed any orders yet.
          </p>

          <Link
            to="/products"
            className="shop-now-btn"
          >
            Start Shopping
          </Link>

        </div>

      )}

    </section>
  );
}