import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./slices/cartSlice";
import wishlistReducer from "./slices/wishlistSlice";
import authReducer from "./slices/authSlice";
import searchReducer from "./slices/searchSlice";
import toastReducer from "./slices/toastSlice";
import reviewsReducer from "./slices/reviewsSlice";
import cancellationReducer from "./slices/cancellationSlice"
import orderReducer from "./slices/orderSlice";
import {
  persistStore,
  persistReducer,
} from "redux-persist";

// ========================================
// CUSTOM LOCAL STORAGE
// ========================================

const storage = {
  getItem: (key) => {
    return Promise.resolve(localStorage.getItem(key));
  },

  setItem: (key, value) => {
    localStorage.setItem(key, value);

    return Promise.resolve();
  },

  removeItem: (key) => {
    localStorage.removeItem(key);

    return Promise.resolve();
  },
};

// ========================================
// PERSIST CONFIG
// ========================================

const cartPersistConfig = {
  key: "cart",
  storage,
};

const wishlistPersistConfig = {
  key: "wishlist",
  storage,
};

const authPersistConfig = {
  key: "auth",
  storage,
};

const reviewsPersistConfig = {
  key: "reviews",
  storage,
};

const cancellationPersistConfig = {
  key : "cancellations",
  storage,
}
const orderPersistConfig = {
  key: "orders",
  storage,
};


// ========================================
// PERSIST REDUCERS
// ========================================

const persistedCartReducer = persistReducer(
  cartPersistConfig,
  cartReducer
);

const persistedWishlistReducer = persistReducer(
  wishlistPersistConfig,
  wishlistReducer
);

const persistedAuthReducer = persistReducer(
  authPersistConfig,
  authReducer
);

const persistedReviewsReducer = persistReducer(
  reviewsPersistConfig,
  reviewsReducer
);
const persistedCancellationReducer = persistReducer(
  cancellationPersistConfig,
  cancellationReducer
);
const persistedOrderReducer = persistReducer(
  orderPersistConfig,
  orderReducer
);

// ========================================
// STORE
// ========================================

export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    wishlist: persistedWishlistReducer,
    auth: persistedAuthReducer,

    // Search Redux
    search: searchReducer,

    // Toast Redux
    toast: toastReducer,
    reviews : persistedReviewsReducer,
    cancellations : persistedCancellationReducer,
    orders : persistedOrderReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
          "persist/FLUSH",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/REMOVE",
        ],
      },
    }),
});

// ========================================
// PERSISTOR
// ========================================

export const persistor = persistStore(store)