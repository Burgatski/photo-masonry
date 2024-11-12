import { useState, useEffect } from 'react';
import apiClient from "../api/api-сlient.ts";
import {IPhoto} from "../types/photo";

export function useFetchImages(perPage: number = 10, query?: string) {
    const [images, setImages] = useState<IPhoto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [canLoadMore, setCanLoadMore] = useState<boolean>(false);

    useEffect(() => {
        setImages([]);
        setPage(1);
        setCanLoadMore(true);
    }, [query]);


    useEffect(() => {
        const fetchImages = async () => {
            setLoading(true);
            setError(null);

            try {
                let response: { data: { photos: IPhoto[] } };
                if (query && query.trim() !== '') {
                    response = await apiClient.get<{ photos: IPhoto[] }>('https://api.pexels.com/v1/search', {
                        params: {
                            query,
                            per_page: perPage,
                            page,
                        }
                    });
                } else {
                    response = await apiClient.get<{ photos: IPhoto[] }>('/curated', {
                        params: {
                            per_page: perPage,
                            page,
                        },
                    });
                }

                const newPhotos = response.data.photos;

                if (newPhotos.length < perPage) {
                    setCanLoadMore(false);
                }


                setCanLoadMore(newPhotos.length > 0);
                setImages((prev) => {
                    const uniquePhotos = newPhotos.filter(
                        (photo: IPhoto) => !prev.some((prevPhoto) => prevPhoto.id === photo.id)
                    );
                    return [...prev, ...uniquePhotos];
                });
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unexpected error occurred");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, [query, page, perPage]);

    return { images, loading, error, canLoadMore, setPage };
}