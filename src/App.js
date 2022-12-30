import "./App.css";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { NewsListPage } from "./components/pages/NewsListPage/NewsListPage";
import { NewsItemPage } from "./components/pages/NewsItemPage/NewsItemPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/news/:id">
          <NewsItemPage />
        </Route>
        <Route path="/">
          <NewsListPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
