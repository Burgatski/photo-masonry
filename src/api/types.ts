export interface Photo {
    id: number;
    width: number;
    height: number;
    url: string;
    photographer: string;
}

export interface ApiResponse<T> {
    page: number;
    per_page: number;
    photos: T[];
    total_results: number;
    next_page: string;
}