export const selectCommentsState = (state) => state.comments;

export const selectorCommentsIds = (state) => {
  return selectCommentsState(state).ids;
};

export const selectorCommentsAmount = (state) => {
  return selectCommentsState(state).ids.length || 0;
};

export const selectComments = (state) => {
  const data = Object.values(selectCommentsState(state).entities);
  return data;
};

export const selectCommentById = (state, id) => {
  return selectCommentsState(state).entities[id] || {};
};

export const selectCommentsIsLoading = (state) => {
  return selectCommentsState(state).status === "startLoading";
};

export const selectCommentsIsError = (state) => {
  return selectCommentsState(state).status === "failLoading";
};
