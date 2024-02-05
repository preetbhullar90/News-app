import React, { useEffect, useState } from 'react'
import { ArticleCard } from './ArticleCard'

export const Home = () => {

const [articles,setArticles]=useState([])

    useEffect(() => {
        fetch(`https://news-website-0p9e.onrender.com/api/articles`).then((response) => {
        return response.json()
        }).then((response) => {
            console.log(response.article)
        setArticles(response.article)
    })
},[])



  return (
      <div>
          {articles.map((article) => (
              <ul>
                  <ArticleCard key={article.article_id} article={article } />
              </ul>
          ))}
    </div>
  )
}
