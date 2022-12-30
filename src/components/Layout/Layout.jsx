import { Layout as LayoutAntd } from "antd";
import styles from "./style.module.css";

const { Header, Footer, Content } = LayoutAntd;

export const Layout = ({ children }) => (
  <LayoutAntd className={styles.layout}>
    <Header className={styles.layout_header}>Hacker News</Header>

    <Content className={styles.layout_content}>{children} </Content>

    <Footer className={styles.layout_footer}>Hacker News ©2022</Footer>
  </LayoutAntd>
);
