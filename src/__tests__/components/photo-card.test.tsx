import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { IPhoto } from '../../types/photo';
import {PhotoCard} from "@components/photo-card";

vi.mock('@components/utils/calculate-row', () => ({
    calculateRowSpan: vi.fn().mockReturnValue('200px'),
}));

vi.mock('./utils/get-photo-orientation', () => ({
    getPhotoOrientation: vi.fn().mockReturnValue('portrait'),
}));

describe('PhotoCard Component', () => {
    const mockPhoto: IPhoto = {
        id: 1,
        width: 600,
        height: 800,
        url: 'https://pexels.com/photo/1',
        photographer: 'Jo',
        photographer_id: 123,
        photographer_url: 'https://pexels.com/photographer/123',
        avg_color: '#ABCDEF',
        src: {
            original: 'https://pexels.com/photo/original.jpg',
            large2x: 'https://pexels.com/photo/large2x.jpg',
            large: 'https://pexels.com/photo/large.jpg',
            medium: 'https://pexels.com/photo/medium.jpg',
            small: 'https://pexels.com/photo/small.jpg',
            portrait: 'https://pexels.com/photo/portrait.jpg',
            landscape: 'https://pexels.com/photo/landscape.jpg',
            tiny: 'https://pexels.com/photo/tiny.jpg',
        },
        liked: false,
        alt: 'Sample photo',
    };

    const onClickMock = vi.fn();

    beforeEach(() => {
        onClickMock.mockClear();
    });

    it('renders correctly with photo details', () => {
        render(
            <BrowserRouter>
                <PhotoCard photo={mockPhoto} onClick={onClickMock} />
            </BrowserRouter>
        );

        expect(screen.getByAltText('Sample photo')).toBeInTheDocument();
        expect(screen.getByText('Jo')).toBeInTheDocument();
        expect(screen.getByRole('link')).toHaveAttribute('href', '/photo/1');
    });

    it('displays skeleton loader when image is loading', () => {
        render(
            <BrowserRouter>
                <PhotoCard photo={mockPhoto} onClick={onClickMock} />
            </BrowserRouter>
        );

        expect(screen.getByTestId('skeleton-loader')).toBeInTheDocument();
    });

    it('hides skeleton loader when image is loaded', () => {
        render(
            <BrowserRouter>
                <PhotoCard photo={mockPhoto} onClick={onClickMock} />
            </BrowserRouter>
        );

        const image = screen.getByAltText('Sample photo');
        fireEvent.load(image);

        expect(screen.queryByTestId('skeleton-loader')).not.toBeInTheDocument();
    });

    it('calls onClick handler when clicked', () => {
        render(
            <BrowserRouter>
                <PhotoCard photo={mockPhoto} onClick={onClickMock} />
            </BrowserRouter>
        );

        const photoCard = screen.getByTestId('photo-card');
        fireEvent.click(photoCard);

        expect(onClickMock).toHaveBeenCalledTimes(1);
    });

    it('applies correct orientation and row span styles', () => {
        render(
            <BrowserRouter>
                <PhotoCard photo={mockPhoto} onClick={onClickMock} />
            </BrowserRouter>
        );

        const photoCard = screen.getByTestId('photo-card');
        expect(photoCard).toHaveClass('portrait');
        expect(photoCard).toHaveStyle({ height: '200px', marginBottom: '1em', boxSizing: 'border-box' });
    });
});
