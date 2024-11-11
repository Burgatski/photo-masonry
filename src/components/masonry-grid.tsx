import React, {useRef, useCallback} from 'react';
import {useFetchImages} from '@hooks/use-fetch-images';
import {PhotoCard} from '@components/photo-card.tsx';

const MasonryGrid: React.FC = () => {
    const {images, loading, error, setPage, canLoadMore} = useFetchImages(10);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);

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
        <div style={{ columnGap: '1em', marginTop: '20px' }} ref={containerRef}>
            <div
                className="photo-grid columns-2 md:px-5 gap-1 lg:columns-3 lg:gap-3 2xl:columns-4
            2xl:gap-4 3xl:columns-5 [&>div]:mb-1 [&>div]:lg:mb-3 [&>div]:2xl:mb-4"
            >
                {images.map((photo: any, index) => (
                    <div data-id={photo.id} key={photo.id + index}
                         ref={index === images.length - 1 ? lastPhotoElementRef : null}>
                        <PhotoCard photo={photo}/>
                    </div>
                ))}
            </div>
            {loading && <div className="text-center col-span-full">Loading...</div>}
            {error && <div className="text-red-500 col-span-full">{error}</div>}
        </div>
    );
};

export default MasonryGrid;