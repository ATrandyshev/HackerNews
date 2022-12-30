import { useEffect, useCallback, createElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { loadNews } from "../../store/news/thunks/load-news";
import {
  selectNews,
  selectNewsIsLoading,
} from "../../store/news/selector/selectors";
import { StarOutlined } from "@ant-design/icons";
import { Button, List, Space } from "antd";
import { Spinner } from "../Spinner/Spinner";
import { REFRESH_TIME } from "../../utils/constants/constansts";
import styles from "./style.module.css";

const getDataSource = (arrayNews) => {
  return arrayNews.map(({ idNewsItem, title, author, date, score }, i) => ({
    idNewsItem: idNewsItem,
    title: title,
    author: `Author: ${author}`,
    date: `Date: ${date}`,
    score: score,
  }));
};

const IconText = ({ icon, text }) => (
  <Space>
    {createElement(icon)}
    {text}
  </Space>
);

const NewsList = () => {
  const news = useSelector(selectNews);
  const isLoading = useSelector(selectNewsIsLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadNews());

    const idTime = refreshListNews();

    return () => {
      clearInterval(idTime);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshListNews = useCallback(() => {
    return setInterval(() => {
      dispatch(loadNews());
    }, REFRESH_TIME);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickRefresh = () => {
    dispatch(loadNews());
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <Button
        className={styles.newsList__buttonRefresh}
        type="primary"
        size="large"
        onClick={handleClickRefresh}
        data-testid="newsList-buttonRefreshList"
      >
        Refresh list news
      </Button>

      <List
        className={styles.newsList}
        itemLayout="vertical"
        size="large"
        pagination={{
          pageSize: 10,
          showSizeChanger: false,
          position: "bottom",
          defaultCurrent: 1,
        }}
        dataSource={getDataSource(news)}
        renderItem={(item) => (
          <NavLink to={`/news/${item.idNewsItem}`}>
            <List.Item
              className={`${styles.newsList__item} ${styles.newsList__item_hover}`}
              key={item.idNewsItem}
              actions={[
                <IconText
                  icon={StarOutlined}
                  text={item.score}
                  key={`list-vertical-star-${item.idNewsItem}`}
                />,
              ]}
            >
              <List.Item.Meta
                title={<h3 to={`/news/${item.idNewsItem}`}>{item.title}</h3>}
                description={
                  <div>
                    {item.author} <br /> {item.date}
                  </div>
                }
              />

              {item.content}
            </List.Item>
          </NavLink>
        )}
      />
    </>
  );
};

export default NewsList;
