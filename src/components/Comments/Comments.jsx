import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectorCommentsAmount } from "../../store/comments/selector/selectors";
import { selectNewsIdsComments } from "../../store/news/selector/selectors";
import { CommentsList } from "./CommentsList/CommentsList";
import { Button } from "antd";
import styles from "./style.module.css";
import { refreshComments } from "../../store/comments/thunks/refresh-comments";

const FComments = ({ newsId }) => {
  const commentsAmount = useSelector(selectorCommentsAmount);
  const commentsIds = useSelector((state) =>
    selectNewsIdsComments(state, newsId)
  );

  const dispatch = useDispatch();

  const handleClickRefreshComments = () => {
    dispatch(refreshComments());
  };
  return (
    <div className={styles.comments}>
      <h3>Comments ({commentsAmount}): </h3>
      <Button type="primary" size="large" onClick={handleClickRefreshComments}>
        Refresh list comments
      </Button>
      <CommentsList ids={commentsIds} />
    </div>
  );
};

export const Comments = React.memo(FComments);
