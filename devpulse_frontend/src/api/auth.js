import axios from 'axios';


const api = axios.create({
  baseURL: 'http://localhost:5000/api/',
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem('refresh');

    if (error.response?.status === 401 && refreshToken && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await axios.post('/api/token/refresh/', {
          refresh: refreshToken,
        });
        localStorage.setItem('access', data.access);
        originalRequest.headers.Authorization = `Bearer ${data.access}`;
        return api(originalRequest);
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


export const registerUser = async (username, password) => {
  try {
    const response = await api.post(`/register/`,{
      username,
      password,
    }, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data?.error || 'Erreur lors de l\'enregistrement');
    } else {
      throw new Error('Erreur réseau ou serveur injoignable');
    }
  }
};

export const loginUser=async (username,password)=>{
    try{
        const response = await api.post(`/token/`,{
            username,password
        },{
              headers: { 'Content-Type': 'application/json' }
        })
        
         
    localStorage.setItem('access', response.data.access);
    localStorage.setItem('refresh', response.data.refresh);
    }
    catch (error) {
    if (error.response) {
      throw new Error(error.response.data?.error || 'Erreur lors de la connexion');
    } else {
      throw new Error('Erreur réseau ou serveur injoignable');
    }
  }
}