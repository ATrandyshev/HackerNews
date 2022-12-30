import { configureStore } from "@reduxjs/toolkit";
import commentsSlice from "./comments/slice/commentsSlice";
import newsSlice from "./news/slice/newsSlice";

const rootReducer = (state, action) => ({
  news: newsSlice.reducer(state?.news, action),
  comments: commentsSlice.reducer(state?.comments, action),
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
});
