import { Layout } from "../../Layout/Layout";
import NewsList from "../../NewsList/NewsList";

export const NewsListPage = () => {
  return (
    <Layout>
      <NewsList data-testid="newsList-page" />
    </Layout>
  );
};
