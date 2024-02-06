import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchArticleById } from "../Utils/api";

import "./ArticleDetail.css";


export const ArticleDetail = () => {
  const [article, setArticle] = useState(null);
  
  const [loading, setLoading] = useState(true);
  const { article_id } = useParams();

  useEffect(() => {
    fetchArticleById(article_id)
      .then((response) => {
        setArticle(response);
        setLoading(false);
      });
    
   
    
    
  }, [article_id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="article-container">
      <div className="detail-container">
        <div className="detail-subcontainer">
          <div className="author-date">
            <p>{article.author}</p>
            <p>{article.created_at.slice(0, 10)}</p>
          </div>
          <h2>{article.title}</h2>
          <div className="images">
            <img src={article.article_img_url} alt="" />
          </div>
          <p className="body">{article.body}</p>
          <p className="detail-vote">{article.votes}</p>
      <Link to={`/articles/${article.article_id}/comments`} className="comment">View Comments</Link>
        </div>
      </div>


  
    </div>
  );
};
