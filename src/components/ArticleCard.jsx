import React from 'react';
import './Article.css';


export const ArticleCard = ({ article }) => {
    console.log(article.title)
  return (
    <div className="article-container">
      <div className="article-subcontainer">
        <p>{article.author}</p>
        <h2>{article.title}</h2>

        <div className="images">
          <img src={article.article_img_url} alt="" />
        </div>
        <div className="votes-comments">
          <p className="votes">{article.votes}</p>
          <p className="comments">{article.comment_count}</p>
          <p className="share">Share</p>
        </div>
      </div>
      <div className='border'></div>
      </div>
  );
}
