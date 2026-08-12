import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "orders",

  initialState,

  reducers: {
    // ========================================
    // PLACE ORDER
    // ========================================

    addOrder: (state, action) => {
      // Migrate orders saved by the previous `items` schema before adding one.
      if (state.orders.length === 0 && Array.isArray(state.items)) {
        state.orders = state.items;
        delete state.items;
      }

      state.orders.push(action.payload);
    },

    // ========================================
    // REMOVE ONLY ONE PRODUCT FROM AN ORDER
    // ========================================

    removeOrderItem: (state, action) => {
      const { orderId, productId } = action.payload;

      const orderCollection = state.orders.length > 0 ? state.orders : state.items;

      if (!Array.isArray(orderCollection)) return;

      const orderIndex = orderCollection.findIndex(
        (order) => order.orderId === orderId
      );

      if (orderIndex === -1) return;

      const order = orderCollection[orderIndex];
      const productsKey = Array.isArray(order.products) ? "products" : "items";

      if (!Array.isArray(order[productsKey])) return;

      // Remove only selected product
      order[productsKey] = order[productsKey].filter(
        (product) => String(product.id) !== String(productId)
      );

      // If no products are left, remove complete order
      if (order[productsKey].length === 0) {
        orderCollection.splice(orderIndex, 1);
      }
    },

    // ========================================
    // CLEAR ALL ORDERS
    // ========================================

    clearOrders: (state) => {
      state.orders = [];
      state.items = [];
    },
  },
});

export const {
  addOrder,
  removeOrderItem,
  clearOrders,
} = orderSlice.actions;

export default orderSlice.reducer;
