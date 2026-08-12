import "./orders.css";

import { useSelector, useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

import { addCancellation } from "../../redux/slices/cancellationSlice";

import { removeOrderItem } from "../../redux/slices/orderSlice";

import { showToast } from "../../redux/slices/toastSlice";

import { FaBoxOpen, FaTimesCircle, FaStar } from "react-icons/fa";

export default function Orders() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // ========================================
  // GET ORDERS FROM REDUX
  // ========================================

  const orders = useSelector(
    (state) => {
      const currentOrders = state.orders?.orders || [];
      return currentOrders.length > 0
        ? currentOrders
        : state.orders?.items || currentOrders;
    },
  );

  // ========================================
  // GET CANCELLATIONS
  // ========================================

  const cancellations = useSelector(
    (state) => state.cancellations?.items || [],
  );

  // ========================================
  // CANCEL SINGLE PRODUCT
  // ========================================

  const handleCancelOrder = (order, product) => {
    const cancellationId = `${order.orderId}-${product.id}`;

    // ========================================
    // CHECK ALREADY CANCELLED
    // ========================================

    const alreadyCancelled = cancellations.some(
      (item) => item.cancellationId === cancellationId,
    );

    if (alreadyCancelled) {
      dispatch(
        showToast({
          message: "Product is already cancelled.",
          type: "error",
        }),
      );

      return;
    }

    // ========================================
    // CREATE CANCELLATION
    // ========================================

    const cancellation = {
      ...product,

      cancellationId,

      orderId: order.orderId,

      cancellationStatus: "Cancelled",

      cancelledAt: new Date().toLocaleString(),
    };

    // ========================================
    // SAVE CANCELLATION
    // ========================================

    dispatch(addCancellation(cancellation));

    // ========================================
    // REMOVE ONLY SELECTED PRODUCT
    // ========================================

    dispatch(
      removeOrderItem({
        orderId: order.orderId,

        productId: product.id,
      }),
    );

    // ========================================
    // TOAST
    // ========================================

    dispatch(
      showToast({
        message: "Product cancelled successfully.",
        type: "success",
      }),
    );
  };

  return (
    <section className="orders-page">
      {/* ========================================
          BREADCRUMB
      ======================================== */}

      <div className="orders-breadcrumb">
        <Link to="/">Home</Link>

        <span>/</span>

        <span>My Orders</span>
      </div>

      {/* ========================================
          HEADER
      ======================================== */}

      <div className="orders-header">
        <div className="orders-title-wrapper">
          <div className="orders-label">
            <span></span>
            Orders
          </div>

          <h1>My Orders</h1>

          <p>Manage and track your recent orders</p>
        </div>

        <div className="orders-count">
          <FaBoxOpen />

          <span>
            {orders.reduce(
              (total, order) =>
                total + (order.products?.length || order.items?.length || 0),
              0,
            )}
          </span>

          <p>Items</p>
        </div>
      </div>

      {/* ========================================
          ORDERS
      ======================================== */}

      {orders.length > 0 ? (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-group" key={order.orderId}>
              {/* Order Header */}

              <div className="order-group-header">
                <div>
                  <strong>Order ID:</strong> {order.orderId}
                </div>

                <div>{order.orderedAt || order.orderDate}</div>
              </div>

              {/* Products */}

              {(order.products || order.items || []).map((product) => {
                const cancellationId = `${order.orderId}-${product.id}`;

                const isCancelled = cancellations.some(
                  (item) => item.cancellationId === cancellationId,
                );

                return (
                  <div
                    className={`order-card ${
                      isCancelled ? "order-cancelled" : ""
                    }`}
                    key={cancellationId}
                  >
                    {/* ========================================
                          IMAGE
                      ======================================== */}

                    <div className="order-image">
                      <img
                        src={product.image}
                        alt={product.title || product.name}
                      />
                    </div>

                    {/* ========================================
                          INFO
                      ======================================== */}

                    <div className="order-info">
                      <h3>{product.title || product.name}</h3>

                      <p className="order-price">
                        ${Number(product.price || 0).toFixed(2)}
                      </p>

                      <p className="order-quantity">
                        Quantity: {product.quantity || 1}
                      </p>
                    </div>

                    {/* ========================================
                          STATUS
                      ======================================== */}

                    <div className="order-status">
                      <span
                        className={isCancelled ? "cancelled" : "processing"}
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

                    {/* ========================================
                          ACTIONS
                      ======================================== */}

                    <div className="order-actions">
                      {!isCancelled && (
                        <>
                          <button
                            className="cancel-order-btn"
                            onClick={() => handleCancelOrder(order, product)}
                          >
                            Cancel Order
                          </button>

                          <button
                            className="write-review-btn"
                            onClick={() =>
                              navigate(`/write-review/${product.id}`)
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
                          onClick={() => navigate("/cancellations")}
                        >
                          View Cancellation
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      ) : (
        /* ========================================
            EMPTY ORDERS
        ======================================== */

        <div className="empty-orders">
          <div className="empty-orders-icon">
            <FaBoxOpen />
          </div>

          <h2>No Orders Yet</h2>

          <p>You haven't placed any orders yet.</p>

          <Link to="/products" className="shop-now-btn">
            Start Shopping
          </Link>
        </div>
      )}
    </section>
  );
}
