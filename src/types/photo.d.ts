export interface PhotoSrc {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
}

export interface IPhoto {
    id: number;
    width: number;
    height: number;
    url: string;
    photographer: string;
    photographer_id: number;
    photographer_url: string;
    avg_color: string;
    src: PhotoSrc;
    liked: boolean;
    alt: string;
}