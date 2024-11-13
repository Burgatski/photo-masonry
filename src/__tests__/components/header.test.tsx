import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Header } from "@components/header";
import { vi } from "vitest";
import { useFetchSearchImage } from "@hooks/use-fetch-search-image";

vi.mock("@hooks/use-fetch-search-image", () => ({
    useFetchSearchImage: vi.fn(),
}));

describe("Header Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("displays loading state when fetching image", () => {
        (useFetchSearchImage as jest.Mock).mockReturnValue({
            image: null,
            loading: true,
            error: null,
        });

        render(
            <BrowserRouter>
                <Header onSearch={vi.fn()} />
            </BrowserRouter>
        );

        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("displays error message if image fetch fails", () => {
        (useFetchSearchImage as jest.Mock).mockReturnValue({
            image: null,
            loading: false,
            error: "Failed to fetch image",
        });

        render(
            <BrowserRouter>
                <Header onSearch={vi.fn()} />
            </BrowserRouter>
        );

        expect(screen.getByText("Failed to fetch image")).toBeInTheDocument();
    });

    it("initializes SearchBar with query from URL parameters", () => {
        (useFetchSearchImage as jest.Mock).mockReturnValue({
            image: "https://pexels.com/image.jpg",
            loading: false,
            error: null,
        });

        render(
            <BrowserRouter>
                <Header onSearch={vi.fn()} />
            </BrowserRouter>
        );

        const searchInput = screen.getByPlaceholderText("Search photos") as HTMLInputElement;
        expect(searchInput.value).toBe("");
    });

    it("calls onSearch when search is submitted", () => {
        (useFetchSearchImage as jest.Mock).mockReturnValue({
            image: "https://pexels.com/image.jpg",
            loading: false,
            error: null,
        });

        const onSearchMock = vi.fn();
        render(
            <BrowserRouter>
                <Header onSearch={onSearchMock} />
            </BrowserRouter>
        );

        const searchInput = screen.getByPlaceholderText("Search photos") as HTMLInputElement;
        fireEvent.change(searchInput, { target: { value: "landscape" } });
        fireEvent.keyDown(searchInput, { key: "Enter", code: "Enter" });

        expect(onSearchMock).toHaveBeenCalledWith("landscape");
    });
});
