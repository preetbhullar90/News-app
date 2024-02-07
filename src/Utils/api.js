export const fetchArticle = () => {
  return fetch(`https://news-website-0p9e.onrender.com/api/articles/`)
    .then((response) => {
      return response.json();
    })
    .then((data) => data.article);
};

export const fetchArticleById = (article_id) => {
  return fetch(
    `https://news-website-0p9e.onrender.com/api/articles/${article_id}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => data.article);
};

export const fetchComments = (article_id) => {
  return fetch(
    `https://news-website-0p9e.onrender.com/api/articles/${article_id}/comments`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => data.comment);
};

export const fetchVotesUpdate = (inc_votes, article_id) => {
  const num = typeof inc_votes === "number" ? inc_votes : Number(inc_votes);
  return fetch(
    `https://news-website-0p9e.onrender.com/api/articles/${article_id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inc_votes: inc_votes }),
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => data.comment);
};
