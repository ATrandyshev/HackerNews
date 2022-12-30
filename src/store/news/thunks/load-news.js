import useHttp from "../../../utils/hooks/http/useHttp";
import { startLoading, failLoading, successLoading } from "../slice/newsSlice";

export const loadNews = () => {
  return (dispatch, getState) => {
    const { getNews } = useHttp();

    dispatch(startLoading());

    try {
      getNews()
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
