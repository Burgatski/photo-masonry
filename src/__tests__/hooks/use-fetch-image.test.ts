import { renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { useFetchSearchImage } from "@hooks/use-fetch-search-image";
import apiClient from "../../api/api-сlient.ts";


vi.mock("../../api/api-сlient.ts", () => ({
    default: {
        get: vi.fn(),
    },
}));

describe("useFetchSearchImage", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("returns initial state correctly", () => {
        const { result } = renderHook(() => useFetchSearchImage("nature"));
        expect(result.current).toEqual({ image: null, loading: true, error: null });
    });

    it("sets image correctly on successful fetch", async () => {
        const mockData = {
            data: {
                photos: [{ src: { large: "https://pexels.com/image.jpg" } }],
            },
        };

        (apiClient.get as jest.Mock).mockResolvedValueOnce(mockData);

        const { result } = renderHook(() => useFetchSearchImage("nature"));

        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(result.current.image).toBe("https://pexels.com/image.jpg");
        expect(result.current.error).toBeNull();
    });

    it("sets error message on failed fetch", async () => {
        const mockError = new Error("Network Error");

        (apiClient.get as jest.Mock).mockRejectedValueOnce(mockError);

        const { result } = renderHook(() => useFetchSearchImage("nature"));

        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(result.current.image).toBeNull();
        expect(result.current.error).toBe("Network Error");
    });
});
