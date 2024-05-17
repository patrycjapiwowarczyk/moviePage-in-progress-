import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistToken = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(persistToken, authReducer),
  },
  middleware: (GetDefaultMiddleware) => GetDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
