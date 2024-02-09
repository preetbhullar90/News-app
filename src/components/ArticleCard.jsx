import React from "react";
import "./Article.css";

export const ArticleCard = ({ article }) => {
  return (
    <div className="article-container">
      <div className="article-subcontainer">
        <div className="author-date">
          <p>{article.author}</p>
          <p>{article.created_at.slice(0, 10)}</p>
        </div>
        <h2>{article.title}</h2>

        <div className="images">
          <img src={article.article_img_url} alt="" />
        </div>
        <div className="votes-comments">
          <p className="votes">{article.votes}</p>
          <p className="comments">{article.comment_count}</p>
          <p className="share">Share</p>
        </div>
        <div className="borders"></div>
      </div>
    </div>
  );
};
