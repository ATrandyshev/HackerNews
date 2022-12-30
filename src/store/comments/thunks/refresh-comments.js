import { useSelector } from "react-redux";
import useHttp from "../../../utils/hooks/http/useHttp";
import { selectorCommentsIds } from "../selector/selectors";
import {
  startLoading,
  failLoading,
  successLoading,
} from "../slice/commentsSlice";

export const refreshComments = () => {
  return (dispatch, getState) => {
    const { getComments } = useHttp();
    const commentsIds = selectorCommentsIds(getState());

    dispatch(startLoading());

    try {
      getComments(commentsIds)
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
