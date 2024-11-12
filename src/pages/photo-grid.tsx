import React from "react";
import { useSearchParams } from "react-router-dom";
import {Header} from "@components/header";
import {MasonryGrid} from "@components/masonry-grid";


export const  PhotoGrid = React.memo(() => {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get("query") || "nature";

    const handleSearch = (query: string) => {
        setSearchParams({ query });
    };

    return (
        <div>
            <Header onSearch={handleSearch} />
            <MasonryGrid searchQuery={searchQuery} />
        </div>
    );
});