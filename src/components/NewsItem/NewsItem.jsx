import { Button } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import {
  selectNewsById,
  selectNewsIsLoading,
} from "../../store/news/selector/selectors";
import { decodeHTML } from "../../utils/decodeHTML/decodeHTML";
import { Comments } from "../Comments/Comments";
import { Spinner } from "../Spinner/Spinner";
import { loadNewsByIdIfNotExist } from "../../store/news/thunks/load-news-by-id";
import styles from "./style.module.css";
import { clearState } from "../../store/comments/slice/commentsSlice";

export const NewsItem = () => {
  const { id } = useParams();
  const {
    url = null,
    author = null,
    date = null,
    text = "Not text",
    title = null,
  } = useSelector((state) => selectNewsById(state, id));

  const isLoading = useSelector(selectNewsIsLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadNewsByIdIfNotExist(id));

    return () => {
      dispatch(clearState());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <div className={styles.newsItem}>
      <div className={styles.newsItem__titleWrapper}>
        <h1>{title}</h1>

        <div>
          <Button
            type="primary"
            href={url}
            size="large"
            className={styles.newsItem__button}
          >
            Original news
          </Button>

          <NavLink to="/">
            <Button
              type="primary"
              size="large"
              className={styles.newsItem__button}
            >
              RETURN
            </Button>
          </NavLink>
        </div>
      </div>

      <div className={styles.newsItem__content}>
        <div className={styles.newsItem__contentAuthor}>
          <p>Author: {author}</p>

          <p>Create date: {date}</p>
        </div>

        <div className={styles.newsItem__contenText}>
          <p>{decodeHTML(text)}</p>
        </div>
      </div>

      <Comments newsId={id} />
    </div>
  );
};
