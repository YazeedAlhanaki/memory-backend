"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rentalController = void 0;
function rentalController(rentals, newRental) {
    const rentalIndex = rentals.findIndex((el) => el.id === newRental.id);
    if (rentalIndex === -1) {
        rentals.push(newRental);
    }
    else {
        rentals[rentalIndex] = {
            ...rentals[rentalIndex],
            ...newRental,
        };
    }
    return rentals;
}
exports.rentalController = rentalController;
