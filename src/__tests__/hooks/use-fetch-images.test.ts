import { renderHook, act, waitFor } from "@testing-library/react";
import { useFetchImages } from "@hooks/use-fetch-images";
import { vi } from "vitest";
import { generateMockPhotos } from "../utils.mock";
import apiClient from "../../api/api-сlient.ts";

describe("useFetchImages", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("returns initial state correctly", () => {
        const { result } = renderHook(() => useFetchImages());
        expect(result.current.images).toEqual([]);
        expect(result.current.loading).toBe(true);
        expect(result.current.error).toBe(null);
        expect(result.current.canLoadMore).toBe(true);
    });

    it("fetches images successfully with a query", async () => {
        const mockData = { data: { photos: generateMockPhotos(10) } };
        vi.spyOn(apiClient, 'get').mockResolvedValue(mockData);

        const { result } = renderHook(() => useFetchImages(10, "nature"));

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.images).toEqual(mockData.data.photos);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(null);
        expect(result.current.canLoadMore).toBe(true);
    });

    it("sets error message on failed fetch", async () => {
        const mockError = new Error("Network Error");
        vi.spyOn(apiClient, 'get').mockRejectedValue(mockError);

        const { result } = renderHook(() => useFetchImages(10, "nature"));

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.images).toEqual([]);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe("Network Error");
        expect(result.current.canLoadMore).toBe(true);
    });

    it("appends new images on subsequent pages", async () => {
        const mockInitialData = { data: { photos: generateMockPhotos(10) } };
        const mockAdditionalData = { data: { photos: generateMockPhotos(5, 11) } };

        vi.spyOn(apiClient, 'get')
            .mockResolvedValueOnce(mockInitialData)
            .mockResolvedValueOnce(mockAdditionalData);

        const { result } = renderHook(() => useFetchImages(10, "nature"));

        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(result.current.images).toEqual(mockInitialData.data.photos);

        act(() => {
            result.current.setPage(2);
        });

        await waitFor(() => expect(result.current.images.length).toBe(15));
        expect(result.current.images).toEqual([
            ...mockInitialData.data.photos,
            ...mockAdditionalData.data.photos,
        ]);
    });

    it("does not set canLoadMore when fetched photos are less than perPage", async () => {
        const mockData = { data: { photos: generateMockPhotos(5) } };
        vi.spyOn(apiClient, 'get').mockResolvedValue(mockData);

        const { result } = renderHook(() => useFetchImages(10, "nature"));

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.images).toEqual(mockData.data.photos);
        expect(result.current.canLoadMore).toBe(false);
    });
});
