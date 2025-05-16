import React, { useEffect, useState } from 'react';
import { fetchArticles } from '../api/articles';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  const loadArticles = async (page = 1) => {
    const res = await fetchArticles(page);
    setArticles(res.data.results);
    setNextPage(res.data.next);
    setPrevPage(res.data.previous);
  };

  useEffect(() => {
    loadArticles();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Articles</h1>
      {articles.map((article) => (
        <div key={article.id} className="mb-4">
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            <h2 className="text-lg font-semibold">{article.title}</h2>
          </a>
          <p className="text-sm text-gray-600">{article.source} • {article.language}</p>
        </div>
      ))}

      <div className="mt-4 flex gap-2">
        {prevPage && <button onClick={() => loadArticles(new URL(prevPage).searchParams.get('page'))}>Précédent</button>}
        {nextPage && <button onClick={() => loadArticles(new URL(nextPage).searchParams.get('page'))}>Suivant</button>}
      </div>
    </div>
  );
};

export default ArticleList;
