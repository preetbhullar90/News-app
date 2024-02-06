export const fetchArticle = () => {
  return fetch(
    `https://news-website-0p9e.onrender.com/api/articles/`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => data.article)
    
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
    .then((data) => data.comment)
    
};
