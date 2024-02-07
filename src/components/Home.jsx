import React, { useEffect, useState } from "react";
import { ArticleCard } from "./ArticleCard";
import { Link } from "react-router-dom";
import { fetchArticle } from "../Utils/api";
import "./Home.css";


export const Home = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticle()
      .then((response) => {
        setArticles(response);
        setLoading(false);
      }).catch((error) => {
        setError(error.response.msg)
        setLoading(false)
      })
  }, []);

 
  
  return (
    <>
      {loading ? (
        <p
          style={{
            fontSize: "20px",
            color: "red",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          Loading...
        </p>
      ) : error ? (
        <p
          style={{
            fontSize: "20px",
            color: "red",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          {error}
        </p>
      ) : (
        <div className="home-container">
          {articles.map((article) => (
            <ul key={article.article_id}>
              <Link
                to={`/articles/${article.article_id}/comments`}
                className="comment"
              >
                <ArticleCard key={article.article_id} article={article} />
              </Link>

            </ul>
          ))}
        </div>
      )}
    </>
  );
};
