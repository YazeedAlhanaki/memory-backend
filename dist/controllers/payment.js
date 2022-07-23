"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentController = void 0;
function paymentController(payments, newPayment) {
    const paymentIndex = payments.findIndex((el) => el.id === newPayment.id);
    if (paymentIndex === -1) {
        payments.push(newPayment);
    }
    else {
        payments[paymentIndex] = {
            ...payments[paymentIndex],
            ...newPayment,
        };
    }
    return payments;
}
exports.paymentController = paymentController;
