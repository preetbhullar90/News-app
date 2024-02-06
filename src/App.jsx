import { useState } from "react";
import { Header } from "./components/Header";
import "./App.css";
import { Home } from "./components/Home";
import { Navigation } from "./components/Navigation";
import { Route, Routes } from "react-router-dom";
import { ArticleDetail } from "./components/ArticleDetail";

function App() {
  return (
    <>
      <Navigation />
      <div>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article/:article_id" element={<ArticleDetail />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
