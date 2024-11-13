import {useState, useEffect} from "react";
import apiClient from "../api/api-сlient";
import {IPhoto} from "../types/photo";

interface FetchSearchImageResult {
    image: string | null;
    loading: boolean;
    error: string | null;
}

export const useFetchSearchImage = (query: string, perPage: number = 1): FetchSearchImageResult =>{
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchImage = async () => {
            setLoading(true);
            try {
                const response = await apiClient.get<{ photos: IPhoto[] }>('search', {
                    params: {
                        query,
                        per_page: perPage,
                    },
                });
                const photos = response.data.photos;
                if (photos.length > 0) {
                    setImage(photos[0].src.large);
                } else {
                    setImage(null);
                }
                setLoading(false);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Unknown error occurred");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchImage();
    }, [query, perPage]);

    return {image, loading, error};
}
