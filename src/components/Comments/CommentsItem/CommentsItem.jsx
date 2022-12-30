import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadComment } from "../../../store/comments/thunks/load-comment-by-id";
import { selectCommentById } from "../../../store/comments/selector/selectors";
import { CommentsList } from "../CommentsList/CommentsList";
import { Button, Comment } from "antd";
import { decodeHTML } from "../../../utils/decodeHTML/decodeHTML";
import styles from "./style.module.css";

export const CommentItem = ({ id }) => {
  const commentData = useSelector((state) => selectCommentById(state, id));
  const [commentsListMarkup, setCommentsListMarkup] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadComment(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickLoadNestedComments = (e) => {
    e.currentTarget.disabled = true;
    const markup = <CommentsList ids={commentData.idsSubComment} />;
    setCommentsListMarkup(markup);
  };

  return commentData.deleted ? null : (
    <li className={styles.comment_item}>
      <Comment
        author={commentData.author}
        datetime={commentData.date}
        content={
          <p>
            {decodeHTML(commentData.text)}

            <br />

            {commentData.idsSubComment ? (
              <Button
                className={styles.comment_loadSubComment}
                type="primary"
                size="large"
                disabled={!commentData.idsSubComment}
                onClick={handleClickLoadNestedComments}
              >
                Load nested comments
              </Button>
            ) : null}

            {commentsListMarkup}
          </p>
        }
      />
    </li>
  );
};
