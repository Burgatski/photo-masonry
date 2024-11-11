import React, {useState} from 'react';
import { getPhotoOrientation } from './utils/get-photo-orientation.ts';

interface PhotoCardProps {
    photo: any;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({ photo }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const orientationClass = getPhotoOrientation(photo);

    const calculateRowSpan = (photoHeight: number, baseRowHeight: number = 10) => {
        return Math.ceil(photoHeight / baseRowHeight);
    };

    const rowSpan = calculateRowSpan(photo.height);

    const photoCardStyle: React.CSSProperties = {
        breakInside: 'avoid',
        marginBottom: '1em',
        boxSizing: 'border-box',
        height: `${rowSpan}`
    };

    return (
        <div className={`${orientationClass} group mb-4`} style={photoCardStyle}>
            <div className="card-body relative bg-gray-300 overflow-hidden">
                {!isLoaded && <div className="skeleton-loader w-full h-full absolute top-0 left-0 bg-gray-200"></div>}
                <a href={`/photo/${photo.id}`} className="block">
                    <img
                        src={photo.src.large || '/default.png'}
                        alt={photo.alt || photo.tags || 'Photo Image'}
                        className="w-full h-auto object-cover"
                        loading="lazy"
                        onLoad={() => setIsLoaded(true)}
                    />
                </a>
            </div>
            <div className="card-footer flex items-center justify-between bg-slate-700/50 text-white p-2">
                <div className="photographer flex items-center gap-2">
                    {photo.userImageURL && (
                        <img
                            src={photo.userImageURL}
                            alt={photo.user || 'User Photo'}
                            className="w-8 h-8 rounded-full object-cover"
                        />
                    )}
                    <span className="text-xs">{photo.photographer}</span>
                </div>
                {photo.views && <span className="text-xs">Views: {photo.views}</span>}
            </div>
        </div>
    );
};
