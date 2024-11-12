import React, {createContext, useContext, useState, ReactNode} from 'react';
import {IPhoto} from "../types/photo";

interface PhotoContextType {
    photos: IPhoto[];
    setPhotos: (photos: IPhoto[]) => void;
    scrollPosition: number;
    setScrollPosition: (position: number) => void;
}

const PhotoContext = createContext<PhotoContextType | undefined>(undefined);

export const PhotoProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [photos, setPhotos] = useState<IPhoto[]>([]);
    const [scrollPosition, setScrollPosition] = useState<number>(0);

    return (
        <PhotoContext.Provider value={{photos, setPhotos, scrollPosition, setScrollPosition}}>
            {children}
        </PhotoContext.Provider>
    );
};

export const usePhotoContext = (): PhotoContextType => {
    const context = useContext(PhotoContext);
    if (!context) {
        throw new Error('usePhotoContext must be used within a PhotoProvider');
    }
    return context;
};
