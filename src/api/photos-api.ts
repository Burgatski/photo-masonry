import apiClient from "./api-сlient.ts";

export const getCuratedPhotos = async (page: number, perPage: number) => {
    const response = await apiClient.get('/curated', {
        params: {
            page,
            per_page: perPage,
        },
    });
    return response.data.photos;
};

export const searchPhotos = async (query: string, page: number, perPage: number) => {
    const response = await apiClient.get('/search', {
        params: {
            query,
            page,
            per_page: perPage,
        },
    });
    return response.data.photos;
};

export const getPhotoById = async (photoId: number) => {
    const response = await apiClient.get(`/photos/${photoId}`);
    return response.data;
};