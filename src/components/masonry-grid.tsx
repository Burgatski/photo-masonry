import React, {useRef, useCallback, useEffect} from 'react';
import {useFetchImages} from '@hooks/use-fetch-images';
import {PhotoCard} from '@components/photo-card.tsx';
import {usePhotoContext} from "../context/photo-context.tsx";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {IPhoto} from "../types/photo";

interface MasonryGridProps {
    searchQuery?: string;
}

export const MasonryGrid: React.FC<MasonryGridProps> = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query") || "";
    const {photos, setPhotos, scrollPosition, setScrollPosition} = usePhotoContext();
    const {
        images,
        loading,
        error,
        setPage,
        canLoadMore
    } = useFetchImages(10, query);
    const location = useLocation();
    const navigate = useNavigate();
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        if (photos.length === 0 && images.length > 0) {
            setPhotos(images);
        }
    }, [images, photos.length, setPhotos]);

    useEffect(() => {
        if (scrollPosition !== null) {
            window.scrollTo(0, scrollPosition);
        }
    }, [scrollPosition]);

    const handleScroll = () => {
        if (location.pathname === '/') {
            setScrollPosition(window.scrollY);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [location.pathname]);

    const handlePhotoClick = (photoId: number) => {
        navigate(`/photo/${photoId}`, {state: {backgroundLocation: location.pathname}});
    };

    const lastPhotoElementRef = useCallback(
        (node: HTMLElement | null) => {
            if (loading) return;
            if (observerRef.current) observerRef.current.disconnect();

            observerRef.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && canLoadMore) {
                    setPage((prevPage) => prevPage + 1);
                }
            });

            if (node) observerRef.current.observe(node);
        },
        [loading, canLoadMore, setPage]
    );

    return (
        <div style={{columnGap: '1em', marginTop: '20px'}}>
            <div
                className="photo-grid columns-2 md:px-5 gap-1 lg:columns-3 lg:gap-3 2xl:columns-4
            2xl:gap-4 3xl:columns-5 [&>div]:mb-1 [&>div]:lg:mb-3 [&>div]:2xl:mb-4"
            >
                {images.map((photo: IPhoto, index) => (
                    <div data-id={photo.id} key={photo.id + index}
                         ref={index === images.length - 1 ? lastPhotoElementRef : null}
                    >
                        <PhotoCard photo={photo} onClick={() => handlePhotoClick(photo.id)}/>
                    </div>
                ))}
            </div>
            {!loading && images.length === 0 && (
                <div className="flex flex-col items-center justify-center h-[300px] text-center">
                    <p className="text-gray-600">No results found for your search.</p>
                </div>
            )}
            {loading && <div className="text-center col-span-full">Loading...</div>}
            {error && <div className="text-red-500 col-span-full">{error}</div>}
        </div>
    );
};