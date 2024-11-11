export const calculateRowSpan = (photoHeight: number, baseRowHeight: number = 10) => {
    return Math.ceil(photoHeight / baseRowHeight);
};