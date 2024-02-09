export const fetchArticle = (sortBy, order) => {
  let url = `https://news-website-0p9e.onrender.com/api/articles`;
  if (sortBy && order) {
    url = `${url}?sort_by=${sortBy}&order=${order}`;
  }
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      return response;
    });
};

export const fetchArticleById = (article_id) => {
  return fetch(
    `https://news-website-0p9e.onrender.com/api/articles/${article_id}`
  ).then((response) => {
    return response.json();
  });
};

export const fetchComments = (article_id) => {
  return fetch(
    `https://news-website-0p9e.onrender.com/api/articles/${article_id}/comments`
  )
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      return response;
    });
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
    .then((response) => {
      return response.comment;
    });
};

export const postComment = (article_id, username, body) => {
  return fetch(
    `https://news-website-0p9e.onrender.com/api/articles/${article_id}/comments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ article_id, username, body }),
    }
  ).then((response) => {
    return response.json();
  });
};

export const fetchUsers = () => {
  return fetch(`https://news-website-0p9e.onrender.com/api/users`)
    .then((response) => {
      return response.json();
    })
    .then((data) => data.user);
};

export const fetchDeleteComment = (comment_id) => {
  return fetch(
    `https://news-website-0p9e.onrender.com/api/comments/${comment_id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then(() => {});
};

export const fetchTopics = (topic) => {
  return fetch(
    `https://news-website-0p9e.onrender.com/api/articles?topic=${topic}`
  )
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      return response;
    });
};
