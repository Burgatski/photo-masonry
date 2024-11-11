import { useState, useEffect } from 'react';
import apiClient from "../api/api-сlient.ts";

interface Photo {
    id: string;
    src: {
        large: string;
        medium: string;
        small: string;
    };
    photographer: string;
    alt: string;
}

export function useFetchImages(perPage: number = 10) {
    const [images, setImages] = useState<Photo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [canLoadMore, setCanLoadMore] = useState<boolean>(false);

    useEffect(() => {
        const fetchImages = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await apiClient.get<{ photos: Photo[] }>('/curated', {
                    params: {
                        per_page: perPage,
                        page,
                    },
                });
                const newPhotos = response.data.photos;
                setCanLoadMore(newPhotos.length > 0);
                setImages((prev) => {
                    const uniquePhotos = newPhotos.filter(
                        (photo) => !prev.some((prevPhoto) => prevPhoto.id === photo.id)
                    );
                    return [...prev, ...uniquePhotos];
                });
                setLoading(false);
            } catch (err) {
                setError('Error fetching curated images');
                setLoading(false);
            }
        };

        fetchImages();
    }, [page, perPage]);

    return { images, loading, error, canLoadMore, setPage };
}