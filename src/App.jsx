import { Header } from "./components/Header";
import "./App.css";
import { Home } from "./components/Home";
import { Navigation } from "./components/Navigation";
import { Route, Routes } from "react-router-dom";
import { DetailArticle } from "./components/DetailArticle";

function App() {
  return (
    <>
      <div>
      <Navigation />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles/:article_id/comments" element={<DetailArticle />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
