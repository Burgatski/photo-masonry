import React, { useState } from 'react';
import { getPhotoOrientation } from './utils/get-photo-orientation';
import { Link } from "react-router-dom";
import { IPhoto } from "../types/photo";
import { calculateRowSpan } from "@components/utils/calculate-row";

interface PhotoCardProps {
    photo: IPhoto;
    onClick: () => void;
}

export const PhotoCard: React.FC<PhotoCardProps> = React.memo(({ photo, onClick }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const orientationClass = getPhotoOrientation(photo);

    const rowSpan = calculateRowSpan(photo.height);

    const photoCardStyle: React.CSSProperties = {
        breakInside: 'avoid',
        marginBottom: '1em',
        boxSizing: 'border-box',
        height: `${rowSpan}`
    };

    return (
        <div data-testid="photo-card" className={`${orientationClass} group mb-4`} style={photoCardStyle} onClick={onClick}>
            <div className="card-body relative bg-gray-300 overflow-hidden">
                {!isLoaded && <div data-testid="skeleton-loader" className="skeleton-loader w-full h-full absolute top-0 left-0 bg-gray-200"></div>}
                <Link to={`/photo/${photo.id}`} className="block" state={{ backgroundLocation: location.pathname }}>
                    <img
                        src={photo.src.large || '/default.png'}
                        alt={photo.alt || 'Photo Image'}
                        className="w-full h-auto object-cover"
                        loading="lazy"
                        onLoad={() => setIsLoaded(true)}
                    />
                </Link>
            </div>
            <div className="card-footer flex items-center justify-between bg-slate-700/50 text-white p-2">
                <div className="photographer flex items-center gap-2">
                    <span className="text-xs">{photo.photographer}</span>
                </div>
            </div>
        </div>
    );
});
