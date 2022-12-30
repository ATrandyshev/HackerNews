import { CommentItem } from "../CommentsItem/CommentsItem";
import styles from "./style.module.css";

export const CommentsList = ({ ids }) => {
  return (
    <ul className={styles.comments_list}>
      {ids.map((id) => (
        <CommentItem key={id} id={id} />
      ))}
    </ul>
  );
};
