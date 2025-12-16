import axios from "axios";

const apiInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://18.198.197.248:5000/",
    withCredentials: false
})

apiInstance.interceptors.request.use(
    (config) => {
        // const accessToken = localStorage.getItem('accessToken');
        // const language = localStorage.getItem('language') || 'en';
        // if (accessToken) {
        //     config.headers['Authorization'] = `Bearer ${accessToken}`;
        // }
        // config.headers['Accept-Language'] = language;
        config.headers["Content-Type"] = "application/json";
        return config;
    },
    (error) => Promise.reject(error)
);

apiInstance.interceptors.response.use(
    
    (response) => response,
    async (error) => {
        // const originalRequest = error.config;
        // if (error.response.status === 401 && !originalRequest._retry) {
        //     originalRequest._retry = true;
        //     const refreshToken = localStorage.getItem('refreshToken');
        //     try {
        //         const { data } = await apiInstance.post('/auth/refresh-token', { token: refreshToken });
        //         localStorage.setItem('accessToken', data.accessToken);
        //         apiInstance.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
        //         return apiInstance(originalRequest);
        //     } catch (refreshError) {
        //         // Handle token refresh error (e.g., redirect to login)
        //     }
        // }
        return Promise.reject(error);
    }
);

export default apiInstance;
