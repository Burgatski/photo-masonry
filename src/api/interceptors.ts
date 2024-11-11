import apiClient from "./api-сlient.ts";

apiClient.interceptors.response.use(
    response => response,
    error => {
        console.error('Error API:', error);
        return Promise.reject(error);
    }
);