"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageController = void 0;
function imageController(images, newImage) {
    const imageIndex = images.findIndex((el) => el.id === newImage.id);
    if (imageIndex === -1) {
        images.push(newImage);
    }
    else {
        images[imageIndex] = {
            ...images[imageIndex],
            ...images,
        };
    }
    return images;
}
exports.imageController = imageController;
