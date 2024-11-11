import {useFetchImage} from "@hooks/use-fetch-image";
import {SearchBar} from "@components/search.tsx";

interface HeaderProps {
    onSearch: (query: string) => void;
}

export function Header({ onSearch }: HeaderProps) {
    const { image, loading, error } = useFetchImage('nature');

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <header
            className="relative bg-cover bg-center h-[400px] text-white"
            style={{backgroundImage: `url(${image})`}}
        >
            <div className="absolute inset-0 bg-black bg-opacity-30">
                <div
                    className="w-full max-w-[1800px] mx-auto px-3 lg:px-5 h-14 lg:h-16 flex items-center justify-between">
                    <div className="min-w-28 text-lg lg:text-2xl">
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
                </div>
                <div className="flex flex-col items-center justify-center h-full">
                    <div className="w-full max-w-md relative">
                        <SearchBar onSearch={onSearch} placeholder="Search photos" />
                    </div>
                    {loading && <div className="text-white mt-4">Loading...</div>}
                    {error && <div className="text-red-500 mt-4">{error}</div>}
                </div>
            </div>
        </header>
    );
}