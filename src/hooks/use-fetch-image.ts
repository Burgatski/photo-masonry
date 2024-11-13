import { useState, useEffect } from 'react';
import apiClient from "../api/api-сlient";
import {IPhoto} from "../types/photo";

export const useFetchImage = (photoId: string) => {
    const [photo, setPhoto] = useState<IPhoto | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPhoto = async () => {
            setLoading(true);
            try {
                const response = await apiClient.get<IPhoto>(`/photos/${photoId}`);
                setPhoto(response.data);
                setLoading(false);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Error fetching photo");
                }
            } finally {
                setLoading(false);
            }
        };

        if (photoId) {
            fetchPhoto();
        }
    }, [photoId]);

    return { photo, loading, error };
}
