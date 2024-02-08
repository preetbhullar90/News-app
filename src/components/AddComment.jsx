import React, { useState } from 'react';
import './AddComment.css';
import { postComment } from '../Utils/api';
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";




export const AddComment = ({article_id,currentUser}) => {
    console.log(currentUser,article_id)
    
const [username, setAuthor] = useState("");
const [body, setCommentText] = useState("");
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [success, setSuccess] = useState(false);
const [expanded, setExpanded] = useState(false);

const handleSubmit = (event) => {
  event.preventDefault();
  setLoading(true);
  setError(null);

  postComment(article_id,username, body)
    .then(() => {
        setCommentText("");
        setAuthor('')
      setSuccess(true);
    })
    .catch((error) => {
      setError("Failed to post comment. Please try again.");
    })
    .finally(() => {
      setLoading(false);
    });
};


    
  return (
    <div>
      <div className="comment-expend">
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
                  {success && (
                    <p
                      style={{
                        fontSize: "20px",
                        color: "green",
                        position: "absolute",
                        top: "88%",
                        left: "55%",
                        transform: "translate(-50%,-50%)",
                      }}
                    >
                      Comment posted successfully!
                    </p>
                  )}
                </div>
              </div>
            )}
          </>
        ) : (
          <p style={{color:'red'}}>Please Login</p>
        )}
      </div>
    </div>
  );
}
