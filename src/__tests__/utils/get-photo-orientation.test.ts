
import { IPhoto } from "../../types/photo";
import {EPhotoOrientation, getPhotoOrientation} from "@components/utils/get-photo-orientation.ts";

describe("getPhotoOrientation", () => {
    const mockPhoto: Partial<IPhoto> = { width: 500, height: 500 };

    it("returns 'square' when width and height are equal", () => {
        const photo: IPhoto = { ...mockPhoto, width: 500, height: 500 } as IPhoto;
        expect(getPhotoOrientation(photo)).toBe(EPhotoOrientation.Square);
    });

    it("returns 'landscape' when width is significantly greater than height", () => {
        const photo: IPhoto = { ...mockPhoto, width: 1200, height: 500 } as IPhoto;
        expect(getPhotoOrientation(photo)).toBe(EPhotoOrientation.Landscape);
    });

    it("returns 'portrait' when height is significantly greater than width", () => {
        const photo: IPhoto = { ...mockPhoto, width: 500, height: 1200 } as IPhoto;
        expect(getPhotoOrientation(photo)).toBe(EPhotoOrientation.Portrait);
    });

    it("returns 'portrait' for minor height > width ratio", () => {
        const photo: IPhoto = { ...mockPhoto, width: 500, height: 650 } as IPhoto;
        expect(getPhotoOrientation(photo)).toBe(EPhotoOrientation.Portrait);
    });

    it("handles photos without width or height by defaulting to square", () => {
        const photo: Partial<IPhoto> = {};
        expect(getPhotoOrientation(photo as IPhoto)).toBe(EPhotoOrientation.Square);
    });
});
