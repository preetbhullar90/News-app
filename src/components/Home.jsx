import React, { useEffect, useState } from "react";
import { ArticleCard } from "./ArticleCard";
import { Link } from "react-router-dom";
import "./Home.css";

export const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://news-website-0p9e.onrender.com/api/articles`)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setArticles(response.article);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  return (
    <div className="home-container">
      {articles.map((article) => (
        <ul key={article.article_id}>
          <Link to={`/article/${article.article_id}`}>
            <ArticleCard key={article.article_id} article={article} />
          </Link>
        </ul>
      ))}
    </div>
  );
};
