import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import {SearchBar} from "@components/search";

describe('SearchBar Component', () => {
    const onSearchMock = vi.fn();

    beforeEach(() => {
        onSearchMock.mockClear();
    });

    it('initializes with the provided initialQuery', () => {
        render(<SearchBar onSearch={onSearchMock} initialQuery="initial search" />);

        const input = screen.getByPlaceholderText('Search...');
        expect(input).toHaveValue('initial search');
    });

    it('updates input value on change', () => {
        render(<SearchBar onSearch={onSearchMock} />);

        const input = screen.getByPlaceholderText('Search...');
        fireEvent.change(input, { target: { value: 'new query' } });

        expect(input).toHaveValue('new query');
    });

    it('calls onSearch with the trimmed query when Enter is pressed', () => {
        render(<SearchBar onSearch={onSearchMock} />);

        const input = screen.getByPlaceholderText('Search...');
        fireEvent.change(input, { target: { value: 'search query ' } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

        expect(onSearchMock).toHaveBeenCalledWith('search query');
        expect(onSearchMock).toHaveBeenCalledTimes(1);
    });

    it('calls onSearch with the trimmed query when the search icon is clicked', () => {
        render(<SearchBar onSearch={onSearchMock} />);

        const input = screen.getByPlaceholderText('Search...');
        fireEvent.change(input, { target: { value: 'icon search ' } });

        const searchIcon = screen.getByTestId('search-icon');
        fireEvent.click(searchIcon);

        expect(onSearchMock).toHaveBeenCalledWith('icon search');
        expect(onSearchMock).toHaveBeenCalledTimes(1);
    });

    it('updates input value when initialQuery changes', () => {
        const { rerender } = render(<SearchBar onSearch={onSearchMock} initialQuery="initial" />);

        const input = screen.getByPlaceholderText('Search...');
        expect(input).toHaveValue('initial');

        rerender(<SearchBar onSearch={onSearchMock} initialQuery="updated query" />);
        expect(input).toHaveValue('updated query');
    });

    it('uses default placeholder when none is provided', () => {
        render(<SearchBar onSearch={onSearchMock} />);
        expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    });

    it('uses custom placeholder when provided', () => {
        render(<SearchBar onSearch={onSearchMock} placeholder="Type here..." />);
        expect(screen.getByPlaceholderText('Type here...')).toBeInTheDocument();
    });
});
