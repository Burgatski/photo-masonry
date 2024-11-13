export const generateMockPhotos = (count: number, startId: number = 1) => {
    return Array.from({ length: count }, (_, i) => ({
        id: startId + i,
        width: 800,
        height: 600,
        url: `https://pexels.com/photo${startId + i}`,
        photographer: `Photographer ${startId + i}`,
        photographer_id: startId + i + 100,
        photographer_url: `https://pexels.com/photographer${startId + i}`,
        avg_color: "#000000",
        src: {
            original: `https://pexels.com/photo${startId + i}-original`,
            large2x: `https://pexels.com/photo${startId + i}-large2x`,
            large: `https://pexels.com/photo${startId + i}-large`,
            medium: `https://pexels.com/photo${startId + i}-medium`,
            small: `https://pexels.com/photo${startId + i}-small`,
            portrait: `https://pexels.com/photo${startId + i}-portrait`,
            landscape: `https://pexels.com/photo${startId + i}-landscape`,
            tiny: `https://pexels.com/photo${startId + i}-tiny`,
        },
        liked: false,
        alt: `Photo ${startId + i}`,
    }));
}