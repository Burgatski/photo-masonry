import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useFetchSearchImage } from "@hooks/use-fetch-search-image";
import { SearchBar } from "@components/search";

interface HeaderProps {
    onSearch: (query: string) => void;
}

export const Header = ({ onSearch }: HeaderProps) => {
    const { image, loading, error } = useFetchSearchImage('nature');
    const headerRef = useRef<HTMLDivElement>(null);
    const [isSticky, setIsSticky] = useState(false);
    const [searchParams] = useSearchParams();
    const initialQuery = searchParams.get("query") || "";
    const [searchValue, setSearchValue] = useState(initialQuery);

    useEffect(() => {
        const handleScroll = () => {
            if (headerRef.current) {
                const headerBottom = headerRef.current.getBoundingClientRect().bottom;
                setIsSticky(headerBottom <= 0);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleSearchSubmit = (query: string) => {
        setSearchValue(query);
        onSearch(query);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <header
                ref={headerRef}
                className="relative bg-cover bg-center h-[300px] text-white"
                style={{ backgroundImage: `url(${image})` }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-30">
                    <div className="w-full h-full flex flex-col items-center justify-center">
                        <div
                            className="w-full max-w-[1800px] px-3 lg:px-5 flex justify-end items-start pt-4 pr-4 absolute top-0 right-0">
                            <a href="/" className="font-oswald font-bold text-gradient py-2">
                                <svg
                                    width="40"
                                    height="40"
                                    className="DisplayNone_mobile-tablet__3vbtV spacing_noMargin__F5u9R spacing_omr50__lktke spacing_dmr30__rqEuC spacing_mmr15__ntge_ spacing_tmr15__EyVWJ"
                                    viewBox="0 0 50 50"
                                >
                                    <g transform="translate(-3894 2762)">
                                        <rect
                                            width="50"
                                            height="50"
                                            rx="8"
                                            transform="translate(3894 -2762)"
                                            fill="#07a081"
                                        ></rect>
                                        <path
                                            d="M32.671,44.73h7.091V37.935H41.9a5.657,5.657,0,1,0,0-11.314H32.671Zm10.763,3.622H29V23H41.9a9.271,9.271,0,0,1,1.53,18.435Z"
                                            transform="translate(3880 -2773)"
                                            fill="#fff"
                                        ></path>
                                    </g>
                                </svg>
                            </a>
                        </div>
                        <div className="w-full max-w-md relative flex justify-center">
                            <SearchBar
                                initialQuery={searchValue}
                                onSearch={handleSearchSubmit}
                                placeholder="Search photos"
                            />
                        </div>
                        {loading && <div className="text-white mt-4">Loading...</div>}
                        {error && <div className="text-red-500 mt-4">{error}</div>}
                    </div>
                </div>
            </header>
            {isSticky && (
                <div
                    className="fixed top-0 left-0 w-full bg-black text-white flex items-center justify-center"
                    style={{
                        height: '100px',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        zIndex: 1000,
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <div className="w-full max-w-md px-3 lg:px-5">
                        <SearchBar
                            initialQuery={searchValue}
                            onSearch={handleSearchSubmit}
                            placeholder="Search photos"
                        />
                    </div>
                </div>
            )}
        </>
    );
}
