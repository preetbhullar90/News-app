import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  fetchArticleById,
  fetchComments,
  fetchDeleteComment,
  fetchVotesUpdate,
} from "../Utils/api";
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from "react-icons/fa";

import "./DetailArticle.css";
import { AddComment } from "./AddComment";
import UserContext from "../contexts/UserContext";

export const DetailArticle = () => {
  const [comments, setComments] = useState([]);
  const [article, setArticle] = useState(null);
  const [votes, setVotes] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deletingComment, setDeletingComment] = useState(false);
  const [reloadPage, setReloadPage] = useState(false);
  const { currentUser } = useContext(UserContext);
  const [getError, setGetError] = useState("");

  const { article_id } = useParams();

  const handleDeleteComment = (comment_id) => {
    fetchDeleteComment(comment_id)
      .then(() => {
        setLoading(false);
        setReloadPage(true);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  const handleVote = (inc_votes) => {
    fetchVotesUpdate(inc_votes, article_id)
      .then((data) => {
        setVotes(data);
        setLoading(false);
        setReloadPage(true);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchComments(article_id)
      .then((response) => {
        if (response.status === 404 || response.status === 400) {
          setGetError(response.msg + " " + response.status);
          setLoading(false);
        } else {
          setComments(response.comment);
          setLoading(false);
        }
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });

    fetchArticleById(article_id)
      .then((response) => {
        if (response.status === 404 || response.status === 400) {
          setGetError(response.msg + " " + response.status);
        } else {
          setArticle(response.article);
          setLoading(false);
        }
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
    if (reloadPage) {
      setReloadPage(false);
    }
  }, [article_id, reloadPage]);

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
      ) : getError ? (
        <p
          style={{
            fontSize: "20px",
            color: "red",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "5rem",
          }}
        >
          {getError}
        </p>
      ) : (
        <div>
          {article && (
            <>
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
                      {article.votes < 1 ? (
                        <p onClick={() => handleVote(0)}>
                          <FaArrowAltCircleDown
                            style={{
                              fontSize: "20px",
                              backgroundColor: "orange",
                              borderRadius: "21px",
                              cursor: "not-allowed",
                            }}
                          />
                        </p>
                      ) : (
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
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <AddComment
                  article_id={article.article_id}
                  currentUser={currentUser.username}
                />
              </div>
            </>
          )}
          <div className="comment-container">
            <div className="comment-subcontainer">
              <p className="total-comments">Comments: {comments.length}</p>
              {comments.map((comment) => (
                <ul className="padding-all" key={comment.comment_id}>
                  <p>{comment.author}</p>
                  <p>{comment.body}</p>
                  <div className="delete-button-and-vote">
                    <p>{comment.votes}</p>
                    {comment.author === currentUser.username && (
                      <button
                        onClick={() => handleDeleteComment(comment.comment_id)}
                      >
                        Delete Comment
                      </button>
                    )}
                  </div>
                </ul>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
