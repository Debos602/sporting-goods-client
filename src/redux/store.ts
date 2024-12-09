import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Use localStorage as default storage
import { combineReducers } from "redux";

// Define the persist configuration
const persistConfig = {
    key: "root", // Key to persist in localStorage
    storage, // Storage method (localStorage)
    whitelist: ["cart", "auth"], // Reducers to persist
};

// Combine your reducers
const rootReducer = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
    cart: cartReducer,
    auth: authReducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
    reducer: persistedReducer, // Use the persisted reducer
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable serializable check for redux-persist
        }).concat(baseApi.middleware),
});

// Create a persistor
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
