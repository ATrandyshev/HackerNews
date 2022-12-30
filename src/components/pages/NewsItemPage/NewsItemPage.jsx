import { Layout } from "../../Layout/Layout";
import { NewsItem } from "../../NewsItem/NewsItem";

export const NewsItemPage = () => {
  return (
    <Layout>
      <NewsItem data-testid="newsItem-page" />
    </Layout>
  );
};
