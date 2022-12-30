import useHttp from "../../../utils/hooks/http/useHttp";
import { selectorCommentsIds } from "../selector/selectors";
import {
  startLoadingSingleComment,
  failLoading,
  successLoading,
} from "../slice/commentsSlice";

export function loadComment(id) {
  return function (dispatch, getState) {
    const commentsIds = selectorCommentsIds(getState());

    if (commentsIds.includes(id)) {
      return;
    }

    const { getComment } = useHttp();

    dispatch(startLoadingSingleComment());

    try {
      getComment(id)
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
}
