"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carsController = void 0;
function carsController(cars, newCar) {
    const carIndex = cars.findIndex((el) => el.id === newCar.id);
    if (carIndex === -1) {
        cars.push(newCar);
    }
    else {
        cars[carIndex] = {
            ...cars[carIndex],
            ...newCar,
        };
    }
    return cars;
}
exports.carsController = carsController;
