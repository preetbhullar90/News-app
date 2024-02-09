import React, { useEffect, useState } from "react";
import { ArticleCard } from "./ArticleCard";
import { Link, useLocation } from "react-router-dom";
import { fetchArticle } from "../Utils/api";
import "./Home.css";

export const Home = () => {
  const [articles, setArticles] = useState([]);
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("desc");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sortByParam = params.get("sortBy") || "created_at";
    const orderParam = params.get("order") || "desc";

    setSortBy(sortByParam);
    setOrder(orderParam);
  }, [location.search]);

  useEffect(() => {
    setLoading(true);
    fetchArticle(sortBy, order)
      .then((response) => {
        setArticles(response);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.msg);
        setLoading(false);
      });
  }, [sortBy, order]);

  const handleSortByChange = (e) => {
    const newSortBy = e.target.value;
    setSortBy(newSortBy);
    updateUrlParams(newSortBy, order);
  };

  const handleOrderChange = (e) => {
    const newOrder = e.target.value;
    setOrder(newOrder);
    updateUrlParams(sortBy, newOrder);
  };

  const updateUrlParams = (sortBy, order) => {
    const params = new URLSearchParams();
    params.set("sortBy", sortBy);
    params.set("order", order);
    const queryString = params.toString();
    window.history.replaceState(null, null, `?${queryString}`);
  };

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
        <div
          style={{ textAlign: "center", paddingTop: "3rem" }}
          className="home-container"
        >
          <div
            style={{
              position: "fixed",
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <div className="sort-by-subcontainer">
              <label style={{ color: "#fff" }} htmlFor="SortBy">
                Sort By:
              </label>

              <select id="SortBy" value={sortBy} onChange={handleSortByChange}>
                <option id="option" value="created_at">
                  Date
                </option>
                <option id="option" value="votes">
                  Votes
                </option>
                <option id="option" value="topic">
                  Topic
                </option>
                <option id="option" value="title">
                  Title
                </option>
              </select>
            </div>

            <div className="order-subcontainer">
              <label style={{ color: "#fff" }} htmlFor="Order">
                Order:
              </label>
              <select id="Order" value={order} onChange={handleOrderChange}>
                <option style={{ color: "#fff" }} value="desc">
                  Descending
                </option>
                <option value="asc">Ascending</option>
              </select>
            </div>
          </div>
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
};
