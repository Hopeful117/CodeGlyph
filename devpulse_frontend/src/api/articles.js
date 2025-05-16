import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', 
});

export const fetchArticles = (page = 1) =>
  API.get(`/articles/?page=${page}`);

export const fetchArticlesByTag = (tag, page = 1) =>
  API.get(`/articles/tag/${tag}/?page=${page}`);

export const fetchArticlesBySource = (source, page = 1) =>
  API.get(`/articles/source/${source}/?page=${page}`);
