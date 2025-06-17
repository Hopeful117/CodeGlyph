import axios from 'axios';


const API = axios.create({
  baseURL: 'http://localhost:8000/api', 
});



export const fetchArticles = (page = 1) =>
  API.get(`/articles/?page=${page}`);

export const fetchArticlesByTag = (tag, page = 1) =>
  API.get(`/articles/tag/${tag}/?page=${page}`);

export const fetchArticlesBySource = (source, page = 1) =>
  API.get(`/articles/source/${source}/?page=${page}`);

export const fetchSources = ()=>
  API.get('/sources')

export const fetchTag = ()=>
  API.get('/tags')

export const fetchRepos = ()=>
  API.get('/repos')



export const fetchBookmark = ()=>
  API.get('/bookmark/', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access')}`
    }})


export const saveArticle = async(url)=>{
 try {
        await API.post(`/savearticle/`, {
     "url":url,
    
    }, {
      headers: { 'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
    
    });
  }
  catch (error) {
    if (error.response) {
      throw new Error(error.response.data?.error || 'Erreur lors de l\'enregistrement');
    } else {
      throw new Error('Erreur réseau ou serveur injoignable');
    }
  }


  }

export const deleteArticle=async(url)=>{
  try {
    await API.delete('/savearticle/',{
      "url":url,},
      {
    headers: { 'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('access')}`,

      }
    })
  }
   catch (error) {
    if (error.response) {
      throw new Error(error.response.data?.error || 'Erreur lors de la suppresion');
    } else {
      throw new Error('Erreur réseau ou serveur injoignable');
    }
  }
}


  API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem('refresh');

    if (error.response?.status === 401 && refreshToken && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await axios.post('http://localhost:8000/api/token/refresh/', {
          refresh: refreshToken,
        });
        localStorage.setItem('access', data.access);
        originalRequest.headers.Authorization = `Bearer ${data.access}`;
        return API(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);