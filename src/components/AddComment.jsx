import React, { useEffect, useState } from "react";
import "./AddComment.css";
import { postComment } from "../Utils/api";
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";

export const AddComment = ({ article_id, currentUser }) => {
  const [username, setAuthor] = useState("");
  const [body, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [rightUser, setRightUser] = useState(false);
  const [getError, setGetError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    postComment(article_id, username, body)
      .then((response) => {
        if (username !== currentUser) {
          setGetError(response.msg + " " + response.status);
          setRightUser(true);
          setSuccess(false);
        } else {
          setCommentText("");
          setAuthor("");
          setSuccess(true);
          setRightUser(false);
          setGetError("");
        }
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <div className="comment-expend">
        {getError && (
          <p
            style={{
              fontSize: "20px",
              color: "red",
            }}
          >
            {getError}
          </p>
        )}

        {success && (
          <h2
            style={{
              fontSize: "17px",
              color: "green",
            }}
          >
            Comment posted successfully!
          </h2>
        )}

        <div className="comment-expend" onClick={() => setExpanded(!expanded)}>
          <h2>Post a Comment</h2>

          {expanded ? (
            <FaMinusCircle
              style={{
                fontSize: "30px",
                backgroundColor: "orange",
                borderRadius: "21px",
                cursor: "pointer",
              }}
            />
          ) : (
            <FaPlusCircle
              style={{
                fontSize: "30px",
                backgroundColor: "orange",
                borderRadius: "21px",
                cursor: "pointer",
              }}
            />
          )}
        </div>

        {currentUser ? (
          <>
            {expanded && (
              <div>
                <div className="comments-subcontainer">
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      value={username}
                      placeholder="name"
                      onChange={(e) => setAuthor(e.target.value)}
                    />

                    <div className="text-area">
                      <textarea
                        placeholder="What are your thoughts?"
                        value={body}
                        onChange={(e) => setCommentText(e.target.value)}
                        required
                      ></textarea>
                    </div>
                    <div className="add-comment-button">
                      <button type="submit" disabled={loading}>
                        {loading ? "Submitting..." : "Comment"}
                      </button>
                    </div>
                  </form>

                  {error && (
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
                  )}
                </div>
              </div>
            )}
          </>
        ) : (
          <p style={{ color: "red" }}>Please Login</p>
        )}
      </div>
    </div>
  );
};
