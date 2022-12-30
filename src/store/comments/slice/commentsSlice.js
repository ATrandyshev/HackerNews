import { createSlice } from "@reduxjs/toolkit";

const commentsSlice = createSlice({
  name: "comments",
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

    startLoadingSingleComment: (state) => {
      state.status = "startLoading";
    },

    failLoading: (state) => {
      state.status = "failLoading";
    },

    successLoading: (state, { payload }) => {
      state.entities = (payload || []).reduce(
        (acc, comment) => {
          acc[comment.idComment] = comment;
          return acc;
        },
        { ...state.entities }
      );

      state.ids = [
        ...state.ids,
        ...(payload || []).map(({ idComment }) => {
          return idComment;
        }),
      ];

      state.status = "successLoading";
    },

    clearState: (state) => {
      state.entities = {};
      state.ids = [];
      state.status = "notStarted";
    },
  },
});

export const {
  startLoading,
  startLoadingSingleComment,
  failLoading,
  successLoading,
  clearState,
} = commentsSlice.actions;

export default commentsSlice;
