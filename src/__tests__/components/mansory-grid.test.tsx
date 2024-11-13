import { describe, it, beforeEach, vi, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useFetchImages } from '@hooks/use-fetch-images';
import { usePhotoContext } from '../../context/photo-context';
import { MasonryGrid } from '@components/masonry-grid';
import '@testing-library/jest-dom';

vi.mock('@hooks/use-fetch-images');
vi.mock('../../context/photo-context');

describe('MasonryGrid Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();

        vi.mocked(usePhotoContext).mockReturnValue({
            photos: [],
            setPhotos: vi.fn(),
            scrollPosition: 0,
            setScrollPosition: vi.fn(),
        });
    });

    it('displays loading state initially', () => {
        vi.mocked(useFetchImages).mockReturnValue({
            images: [],
            loading: true,
            error: null,
            setPage: vi.fn(),
            canLoadMore: false,
        });

        render(
            <BrowserRouter>
                <MasonryGrid />
            </BrowserRouter>
        );

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('displays error message when there is an error', () => {
        vi.mocked(useFetchImages).mockReturnValue({
            images: [],
            loading: false,
            error: 'Error fetching data',
            setPage: vi.fn(),
            canLoadMore: false,
        });

        render(
            <BrowserRouter>
                <MasonryGrid />
            </BrowserRouter>
        );

        expect(screen.getByText('Error fetching data')).toBeInTheDocument();
    });

    it('displays "No results found" when images array is empty', () => {
        vi.mocked(useFetchImages).mockReturnValue({
            images: [],
            loading: false,
            error: null,
            setPage: vi.fn(),
            canLoadMore: false,
        });

        render(
            <BrowserRouter>
                <MasonryGrid />
            </BrowserRouter>
        );

        expect(screen.getByText('No results found for your search.')).toBeInTheDocument();
    });

    it('renders images correctly when images array is not empty', () => {
        const mockPhotos = [
            {
                id: 1,
                width: 800,
                height: 1000,
                url: 'photo-url-1',
                photographer: 'Rick Sanchez',
                photographer_id: 123,
                photographer_url: 'photographer-url-1',
                avg_color: '#000000',
                src: {
                    original: 'url1-original',
                    large2x: 'url1-large2x',
                    large: 'url1-large',
                    medium: 'url1-medium',
                    small: 'url1-small',
                    portrait: 'url1-portrait',
                    landscape: 'url1-landscape',
                    tiny: 'url1-tiny',
                },
                liked: false,
                alt: 'Photo Image 1'
            },
            {
                id: 2,
                width: 800,
                height: 1000,
                url: 'photo-url-2',
                photographer: 'Morti',
                photographer_id: 124,
                photographer_url: 'photographer-url-2',
                avg_color: '#111111',
                src: {
                    original: 'url2-original',
                    large2x: 'url2-large2x',
                    large: 'url2-large',
                    medium: 'url2-medium',
                    small: 'url2-small',
                    portrait: 'url2-portrait',
                    landscape: 'url2-landscape',
                    tiny: 'url2-tiny',
                },
                liked: true,
                alt: 'Photo Image 2'
            },
        ];

        vi.mocked(useFetchImages).mockReturnValue({
            images: mockPhotos,
            loading: false,
            error: null,
            setPage: vi.fn(),
            canLoadMore: true,
        });

        render(
            <BrowserRouter>
                <MasonryGrid />
            </BrowserRouter>
        );

        const images = screen.getAllByAltText(/Photo Image/i);
        expect(images).toHaveLength(2);
        expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
        expect(screen.getByText('Morti')).toBeInTheDocument();
    });

    it('loads more images when scrolled near the end of the list', async () => {
        const setPageMock = vi.fn();

        vi.mocked(useFetchImages).mockReturnValue({
            images: Array.from({ length: 10 }, (_, i) => ({
                id: i + 1,
                width: 800,
                height: 1000,
                url: `photo-url-${i + 1}`,
                photographer: `Photographer ${i + 1}`,
                photographer_id: i + 100,
                photographer_url: `photographer-url-${i + 1}`,
                avg_color: '#000000',
                src: {
                    original: `url${i + 1}-original`,
                    large2x: `url${i + 1}-large2x`,
                    large: `url${i + 1}-large`,
                    medium: `url${i + 1}-medium`,
                    small: `url${i + 1}-small`,
                    portrait: `url${i + 1}-portrait`,
                    landscape: `url${i + 1}-landscape`,
                    tiny: `url${i + 1}-tiny`,
                },
                liked: false,
                alt: `Photo Image ${i + 1}`,
            })),
            loading: false,
            error: null,
            setPage: setPageMock,
            canLoadMore: true,
        });

        render(
            <BrowserRouter>
                <MasonryGrid />
            </BrowserRouter>
        );

        fireEvent.scroll(window, { target: { scrollY: 1000 } });

        await waitFor(() => {
            expect(setPageMock).toHaveBeenCalled();
        });
    });
});
