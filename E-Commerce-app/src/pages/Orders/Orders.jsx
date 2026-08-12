import "./orders.css";

import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import {
  addCancellation,
} from "../../redux/slices/cancellationSlice";

import {
  showToast,
} from "../../redux/slices/toastSlice";

import {
  FaBoxOpen,
  FaTimesCircle,
  FaStar,
} from "react-icons/fa";

export default function Orders() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // =========================
  // ORDERS FROM REDUX
  // =========================

  const orders = useSelector(
    (state) => state.orders?.items || []
  );

  // =========================
  // CANCELLATIONS
  // =========================

  const cancellations = useSelector(
    (state) => state.cancellations?.items || []
  );

  // =========================
  // CANCEL ORDER
  // =========================

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

      {/* =========================
          BREADCRUMB
      ========================= */}

      <div className="orders-breadcrumb">
        <Link to="/">Home</Link>

        <span>/</span>

        <span>My Orders</span>
      </div>

      {/* =========================
          HEADER
      ========================= */}

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

          <span>
            {orders.length}
          </span>

          <p>Orders</p>

        </div>

      </div>

      {/* =========================
          ORDERS
      ========================= */}

      {orders.length > 0 ? (

        <div className="orders-list">

          {orders.map((order) => {

            /*
             * One order can contain
             * multiple products.
             */

            return order.items.map((item) => {

              const isCancelled = cancellations.some(
                (cancelledItem) =>
                  cancelledItem.id === order.id
              );

              return (
                <div
                  className={`order-card ${
                    isCancelled
                      ? "order-cancelled"
                      : ""
                  }`}
                  key={`${order.id}-${item.id}`}
                >

                  {/* =========================
                      PRODUCT IMAGE
                  ========================= */}

                  <div className="order-image">

                    <img
                      src={item.image}
                      alt={
                        item.title ||
                        item.name
                      }
                    />

                  </div>

                  {/* =========================
                      PRODUCT INFO
                  ========================= */}

                  <div className="order-info">

                    <h3>
                      {item.title ||
                        item.name}
                    </h3>

                    <p className="order-price">

                      $
                      {Number(
                        item.price || 0
                      ).toFixed(2)}

                    </p>

                    <p className="order-quantity">

                      Quantity:{" "}
                      {item.quantity || 1}

                    </p>

                    <p className="order-date">

                      Ordered:{" "}
                      {order.orderedAt}

                    </p>

                  </div>

                  {/* =========================
                      STATUS
                  ========================= */}

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
                          {order.status ||
                            "Processing"}
                        </>
                      )}

                    </span>

                  </div>

                  {/* =========================
                      ACTIONS
                  ========================= */}

                  <div className="order-actions">

                    {!isCancelled && (
                      <>

                        <button
                          className="cancel-order-btn"
                          onClick={() =>
                            handleCancelOrder(
                              order
                            )
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
                          navigate(
                            "/cancellations"
                          )
                        }
                      >
                        View Cancellation
                      </button>

                    )}

                  </div>

                </div>
              );
            });
          })}

        </div>

      ) : (

        /* =========================
            EMPTY ORDERS
        ========================= */

        <div className="empty-orders">

          <div className="empty-orders-icon">
            <FaBoxOpen />
          </div>

          <h2>
            No Orders Yet
          </h2>

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