import { useState, useEffect } from 'react';
import { IPhoto } from "../types/photo";
import apiClient from "../api/api-сlient";

export const useFetchImages = (perPage: number = 10, query?: string) =>{
    const [images, setImages] = useState<IPhoto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [canLoadMore, setCanLoadMore] = useState<boolean>(true);

    useEffect(() => {
        setImages([]);
        setPage(1);
        setError(null);
        setLoading(true);
        setCanLoadMore(true);
    }, [query]);

    useEffect(() => {
        const fetchImages = async () => {
            setLoading(true);
            setError(null);

            try {
                let response;
                if (query && query.trim() !== '') {
                    response = await apiClient.get<{ photos: IPhoto[] }>('https://api.pexels.com/v1/search', {
                        params: { query, per_page: perPage, page },
                    });
                } else {
                    response = await apiClient.get<{ photos: IPhoto[] }>('/curated', {
                        params: { per_page: perPage, page },
                    });
                }

                const newPhotos = response.data.photos;

                setCanLoadMore(newPhotos.length === perPage);

                setImages((prev) => {
                    const uniquePhotos = newPhotos.filter(
                        (photo: IPhoto) => !prev.some((prevPhoto) => prevPhoto.id === photo.id)
                    );
                    return [...prev, ...uniquePhotos];
                });
            } catch (err) {
                setError(err instanceof Error ? err.message : "An unexpected error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, [query, page, perPage]);

    return { images, loading, error, canLoadMore, setPage };
}