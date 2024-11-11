export enum EPhotoOrientation {
    Landscape = "landscape",
    Portrait = "portrait",
    Square = "square",
}

export const getPhotoOrientation = (photo: any): string =>{
    const width = photo?.width || photo?.imageWidth || 500;
    const height = photo?.height || photo?.imageHeight || 500;
    const ratio = width / height;

    let photoOrientation: EPhotoOrientation = EPhotoOrientation.Square;

    if (ratio > 1.2) {
        photoOrientation = EPhotoOrientation.Landscape;
    } else if (ratio < 0.8) {
        photoOrientation = EPhotoOrientation.Portrait;
    }

    return photoOrientation;
}