import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./ArticleDetail.css";

export const ArticleDetail = () => {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const { article_id } = useParams();

  useEffect(() => {
    fetch(`https://news-website-0p9e.onrender.com/api/articles/${article_id}`)
      .then((response) => response.json())
      .then((response) => {
        setArticle(response.article);
        setLoading(false);
      });
  }, [article_id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="article-container">
      <div className="detail-container">
        <div className="detail-subcontainer">
          <div className="author-date">
            <p>Author: {article.author}</p>
            <p>created At: {article.created_at.slice(0, 10)}</p>
          </div>
          <h2>{article.title}</h2>
          <div className="images">
            <img src={article.article_img_url} alt="" />
          </div>
          <p className="body">{article.body}</p>
          <p>{article.votes}</p>
        </div>
      </div>

      {/* Add more details as needed */}
    </div>
  );
};
