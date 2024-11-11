import { useState, useEffect } from 'react';
import apiClient from "../api/api-сlient.ts";

interface Photo {
    src: {
        large: string;
    };
}

export function useFetchImage(query: string, perPage: number = 1) {
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchImage = async () => {
            setLoading(true);
            try {
                const response = await apiClient.get<{ photos: Photo[] }>('search', {
                    params: {
                        query,
                        per_page: perPage,
                    },
                });
                const photos = response.data.photos;
                if (photos.length > 0) {
                    setImage(photos[0].src.large);
                }
                setLoading(false);
            } catch (err) {
                setError('Error fetching image');
                setLoading(false);
            }
        };

        fetchImage();
    }, [query, perPage]);

    return { image, loading, error };
}
