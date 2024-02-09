import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchTopics } from '../Utils/api';
import { ArticleCard } from './ArticleCard';

export const TopicArticles = () => {
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [getError, setGetError] = useState("");
    const { topic } = useParams()
  


    useEffect(() => {
        setLoading(true)
        fetchTopics(topic)
          .then((response) => {
            if (response.status === 404 || response.status === 400) {
              setGetError(response.msg + " " + response.status);
              setLoading(false);
            } else { 

              setArticles(response.article);
              setLoading(false);
            }
          })
          .catch((error) => {
            setError(error.msg);
            setLoading(false);
          });
    },[topic])




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
            paddingTop:'5rem'
          }}
        >
            {getError}
            {console.log(getError)}
        </p>
      ) : (
        <div className="home-container">
          <h1 className="topic">Topic {topic}</h1>
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
}
