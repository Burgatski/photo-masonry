import {Header} from "@components/header";
import {Footer} from "@components/footer.tsx";
import MasonryGrid from "@components/masonry-grid.tsx";
import {useState} from "react";

export function PhotoGrid() {
    const [searchQuery, setSearchQuery] = useState<string>('nature');

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    return (
        <div>
            <Header onSearch={handleSearch} />
            <MasonryGrid />
            <Footer />
        </div>
    );
}