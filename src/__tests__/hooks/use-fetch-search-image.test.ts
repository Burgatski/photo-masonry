import { renderHook, waitFor } from "@testing-library/react";
import { useFetchSearchImage } from "@hooks/use-fetch-search-image";
import { vi } from "vitest";
import {IPhoto} from "../../types/photo";
import apiClient from "../../api/api-сlient.ts";

vi.mock("../api/api-client");

describe("useFetchSearchImage", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("returns initial state correctly", () => {
        const { result } = renderHook(() => useFetchSearchImage("nature"));
        expect(result.current.image).toBe(null);
        expect(result.current.loading).toBe(true);
        expect(result.current.error).toBe(null);
    });

    it("successfully receives image from server", async () => {
        const mockData = {
            data: {
                photos: [
                    {
                        src: { large: "https://pexels.com/image.jpg" },
                    } as IPhoto,
                ],
            },
        };
        vi.spyOn(apiClient, "get").mockResolvedValueOnce(mockData);

        const { result } = renderHook(() => useFetchSearchImage("nature"));

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.image).toBe("https://pexels.com/image.jpg");
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(null);
    });

    it("sets the error message when a request fails", async () => {
        const mockError = new Error("Network Error");
        vi.spyOn(apiClient, "get").mockRejectedValueOnce(mockError);

        const { result } = renderHook(() => useFetchSearchImage("nature"));

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.image).toBe(null);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe("Network Error");
    });

    it("returns null for image if photo not found", async () => {
        const mockData = { data: { photos: [] } };
        vi.spyOn(apiClient, "get").mockResolvedValueOnce(mockData);

        const { result } = renderHook(() => useFetchSearchImage("unknown"));

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.image).toBe(null);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(null);
    });
});
