import React, { useEffect, useState } from "react";
import { ArticleCard } from "./ArticleCard";
import { Link } from "react-router-dom";
import { fetchArticle } from "../Utils/api";
import "./Home.css";

export const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticle()
      .then((response) => {
        setArticles(response);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  return (
    <div className="home-container">
      {articles.map((article) => (
        <ul key={article.article_id}>
          <Link to={`/articles/${article.article_id}`}>
            <ArticleCard key={article.article_id} article={article} />
          </Link>
        </ul>
      ))}
    </div>
  );
};
