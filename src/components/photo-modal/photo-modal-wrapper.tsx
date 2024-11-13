import React from 'react';
import {useParams, useNavigate, useLocation} from 'react-router-dom';
import {PhotoModal} from '@components/photo-modal/photo-modal';
import { usePhotoContext } from "../../context/photo-context";
import {useFetchImage} from "@hooks/use-fetch-image";

export const PhotoModalWrapper: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { photos } = usePhotoContext();
    const navigate = useNavigate();
    const location = useLocation();
    const existingPhoto = photos.find((p) => p.id === Number(id));
    const { photo, loading, error } = useFetchImage(id || '');

    const handleCloseModal = () => {
        if (location.state && location.state.backgroundLocation) {
            navigate(location.state.backgroundLocation, { replace: true });
        } else {
            navigate('/');
        }
    };
    const displayedPhoto = existingPhoto || photo;

    return (
        <PhotoModal
            photo={displayedPhoto!}
            isOpen={!!displayedPhoto || loading}
            onRequestClose={handleCloseModal}
            loading={loading}
            error={error}
        />
    );
};