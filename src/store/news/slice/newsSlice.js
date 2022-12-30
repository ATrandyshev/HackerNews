import { createSlice } from "@reduxjs/toolkit";

const newsSlice = createSlice({
  name: "news",
  initialState: {
    entities: {},
    ids: [],
    status: "notStarted",
  },
  reducers: {
    startLoading: (state) => {
      state.entities = {};
      state.ids = [];
      state.status = "startLoading";
    },

    failLoading: (state) => {
      state.entities = {};
      state.ids = [];
      state.status = "failLoading";
    },

    successLoading: (state, { payload }) => {
      state.entities = (payload || []).reduce(
        (acc, newsItem) => {
          acc[newsItem.idNewsItem] = newsItem;
          return acc;
        },
        { ...state.entities }
      );

      state.ids = [
        ...state.ids,
        ...(payload || []).map(({ idNewsItem }) => idNewsItem),
      ];
      state.status = "successLoading";
    },
  },
});

export const { startLoading, failLoading, successLoading } = newsSlice.actions;

export default newsSlice;
