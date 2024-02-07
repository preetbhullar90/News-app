import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchArticleById,
  fetchComments,
  fetchVotesUpdate,
} from "../Utils/api";
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from "react-icons/fa";

import "./DetailArticle.css";

export const DetailArticle = () => {
  const [comments, setComments] = useState([]);
  const [article, setArticle] = useState(null);
  const [votes, setVotes] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const { article_id } = useParams();
  const navigate = useNavigate();

  const handleVote = (inc_votes) => {
    fetchVotesUpdate(inc_votes, article_id)
      .then((data) => {
        setVotes(data);
        setLoading(false);
        window.location.reload();
      })
      .catch((error) => {
        setError(error.response.msg);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchComments(article_id)
      .then((data) => {
        setComments(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.response.msg);
        setLoading(false);
      });

    fetchArticleById(article_id)
      .then((data) => {
        setArticle(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.response.msg);
        setLoading(false);
      });
  }, [article_id]);

  if (loading) {
  }

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
        <div>
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
                  <div className="vote-section">
                    <p onClick={() => handleVote(1)}>
                      <FaArrowAltCircleUp
                        style={{
                          fontSize: "20px",
                          backgroundColor: "orange",
                          borderRadius: "21px",
                          cursor: "pointer",
                        }}
                      />
                    </p>
                    <p className="vote-count">{article.votes}</p>
                    <p onClick={() => handleVote(-1)}>
                      <FaArrowAltCircleDown
                        style={{
                          fontSize: "20px",
                          backgroundColor: "orange",
                          borderRadius: "21px",
                          cursor: "pointer",
                        }}
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="comment-container">
            <div className="comment-subcontainer">
              <p className="total-comments">Comments: {comments.length}</p>
              {comments.map((comment) => (
                <ul className="padding-all" key={comment.comment_id}>
                  <p>{comment.author}</p>
                  <p>{comment.body}</p>
                  <p className="vote">{comment.votes}</p>
                </ul>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};