import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById,fetchComments } from "../Utils/api";
import './Comments.css';


export const Comments = () => {
    
    const [comments, setComments] = useState([]);
    const [article, setArticle] = useState(null)
    const [loading, setLoading] = useState(true);
  const { article_id } = useParams();

  useEffect(() => {
    fetchComments(article_id)
        .then((data) => {
            setComments(data);
            setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });

fetchArticleById(article_id)
  .then((data) => {
      setArticle(data);
      setLoading(false);
  })
  .catch((error) => {
    console.error("Error fetching article:", error);
  });

     
  }, [article_id]);
    
    if (loading) return <p>Loading...</p>;

  return (
    <>
      {article && (
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
            </div>
          </div>
        </div>
      )}
      <div className="comment-container">
        <div className="comment-subcontainer">
            <p className="total-comments">Comments: { comments.length}</p>
          {comments.map((comment) => (
              <ul className="padding-all" key={comment.comment_id}>
              <p>{comment.author}</p>
              <p>{comment.body}</p>
              <p className="vote">{comment.votes}</p>
            </ul>
          ))}
        </div>
      </div>
    </>
  );
};

