import React, { useEffect, useState } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
    placeholder?: string;
    initialQuery?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
                                                        onSearch,
                                                        placeholder = 'Search...',
                                                        initialQuery = ''
                                                    }) => {
    const [inputValue, setInputValue] = useState<string>(initialQuery);

    useEffect(() => {
        setInputValue(initialQuery);
    }, [initialQuery]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSearch = () => {
        onSearch(inputValue.trim());
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="w-full max-w-md relative">
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="w-full px-4 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
            <svg
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
                onClick={handleSearch}
            >
                <path
                    d="M10 2a8 8 0 105.293 14.707l4.387 4.387a1 1 0 001.414-1.414l-4.387-4.387A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z"/>
            </svg>
        </div>
    );
};
