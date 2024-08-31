import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import api from "./features/apiSlice";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
