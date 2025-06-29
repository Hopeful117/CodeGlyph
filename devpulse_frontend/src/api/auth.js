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
        const { data } = await api.post('/token/refresh/', {
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


export const MagicLoginRequest= async(email)=>{
   
      await api.post(`/auth/magiclink/request/`, {
        email,
      });
      

}