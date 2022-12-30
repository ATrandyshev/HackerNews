import useHttp from "../../../utils/hooks/http/useHttp";
import { selectNewsIds } from "../selector/selectors";
import { startLoading, failLoading, successLoading } from "../slice/newsSlice";

export const loadNewsByIdIfNotExist = (idNews) => {
  return (dispatch, getState) => {
    const { getNewsById } = useHttp();

    const newsLoading = selectNewsIds(getState());
    if (
      newsLoading.length > 0 &&
      newsLoading.every((id) => newsLoading.includes(id))
    ) {
      return;
    }

    dispatch(startLoading());

    try {
      getNewsById(idNews)
        .then((data) => {
          dispatch(successLoading(data));
        })
        .catch((e) => {
          dispatch(failLoading());
        });
    } catch {
      dispatch(failLoading());
    }
  };
};
