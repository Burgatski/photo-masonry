import { render, screen } from "@testing-library/react";
import { PhotoModal } from "@components/photo-modal/photo-modal";
import { vi } from "vitest";
import Modal from "react-modal";
import {IPhoto} from "../../types/photo";

describe("PhotoModal Component", () => {
    beforeAll(() => {
        const root = document.createElement("div");
        root.id = "root";
        document.body.appendChild(root);

        Modal.setAppElement("#root");
    });

    afterAll(() => {
        const root = document.getElementById("root");
        if (root) {
            document.body.removeChild(root);
        }
    });

    const mockPhoto: IPhoto = {
        id: 1,
        width: 800,
        height: 600,
        url: "https://pexels.com/photo.jpg",
        photographer: "Simba",
        photographer_id: 123,
        photographer_url: "https://pexels.com/photographer",
        avg_color: "#FFFFFF",
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
        alt: "Sample"
    };

    it("renders loading state when loading prop is true", () => {
        render(
            <PhotoModal
                photo={mockPhoto}
                isOpen={true}
                onRequestClose={vi.fn()}
                loading={true}
            />
        );

        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("renders error message when error prop is provided", () => {
        render(
            <PhotoModal
                photo={mockPhoto}
                isOpen={true}
                onRequestClose={vi.fn()}
                error="Failed to load photo"
            />
        );

        expect(screen.getByText("Error: Failed to load photo")).toBeInTheDocument();
    });

    it("renders photo information when photo prop is provided", () => {
        render(
            <PhotoModal
                photo={mockPhoto}
                isOpen={true}
                onRequestClose={vi.fn()}
            />
        );

        expect(screen.getByAltText("Sample")).toBeInTheDocument();
        expect(screen.getByText("Simba")).toBeInTheDocument();
    });

    it("displays 'Photo not found' when no photo is provided", () => {
        render(
            <PhotoModal
                photo={null as unknown as IPhoto}
                isOpen={true}
                onRequestClose={vi.fn()}
            />
        );

        expect(screen.getByText("Photo not found")).toBeInTheDocument();
    });

    it("calls onRequestClose when the back button is clicked", () => {
        const onRequestClose = vi.fn();
        render(
            <PhotoModal
                photo={mockPhoto}
                isOpen={true}
                onRequestClose={onRequestClose}
            />
        );

        const closeButton = screen.getByText("Back");
        closeButton.click();
        expect(onRequestClose).toHaveBeenCalled();
    });
});
