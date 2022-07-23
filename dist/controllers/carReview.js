"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewController = void 0;
function reviewController(reviews, newReview) {
    const reviewIndex = reviews.findIndex((el) => el.id === newReview.id);
    if (reviewIndex === -1) {
        reviews.push(newReview);
    }
    else {
        reviews[reviewIndex] = {
            ...reviews[reviewIndex],
            ...newReview,
        };
    }
    return reviews;
}
exports.reviewController = reviewController;
