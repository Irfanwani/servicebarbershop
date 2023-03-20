import { configureStore } from "@reduxjs/toolkit";
import authApiSlice from "./apislices/authapislices";
import {
  persistStore,
  persistCombineReducers,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authReducer } from "./slice";

const config = {
  key: "root",
  storage: AsyncStorage,
};

const reducer = persistCombineReducers(config, {
  [authApiSlice.reducerPath]: authApiSlice.reducer,
  authSlice: authReducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authApiSlice.middleware),
});

export const persistor = persistStore(store);
