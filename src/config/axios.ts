import axios from 'axios';
import { store } from '@/store';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BE_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

// Add a request interceptor to include JWT token
axiosInstance.interceptors.request.use(function (config) {
    const state = store.getState();
    const token = state.auth.token;
    
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
}, function (error) {
    return Promise.reject(error);
},
);

// Add a response interceptor
axiosInstance.interceptors.response.use(function onFulfilled(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, function onRejected(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error.response.data as GetAllResponse<string>);
});

export default axiosInstance