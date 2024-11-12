import {IPhoto} from "../../types/photo";

export enum EPhotoOrientation {
    Landscape = "landscape",
    Portrait = "portrait",
    Square = "square",
}

export const getPhotoOrientation = (photo: IPhoto): string =>{
    const width = photo?.width || 500;
    const height = photo?.height || 500;
    const ratio = width / height;

    let photoOrientation: EPhotoOrientation = EPhotoOrientation.Square;

    if (ratio > 1.2) {
        photoOrientation = EPhotoOrientation.Landscape;
    } else if (ratio < 0.8) {
        photoOrientation = EPhotoOrientation.Portrait;
    }

    return photoOrientation;
}