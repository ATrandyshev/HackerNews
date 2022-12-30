export const selectNewsState = (state) => state.news;

export const selectNews = (state) => {
  return Object.values(selectNewsState(state).entities);
};

export const selectNewsById = (state, id) => {
  return selectNewsState(state).entities[id] || {};
};

export const selectNewsIsLoading = (state) => {
  return selectNewsState(state).status === "startLoading";
};

export const selectNewsIdsComments = (state, id) => {
  return selectNewsState(state).entities[id]?.commentIds || [];
};

export const selectNewsIds = (state) => selectNewsState(state).ids;
