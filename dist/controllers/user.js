"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
function userController(users, newUser) {
    const userIndex = users.findIndex((el) => el.id === newUser.id);
    if (userIndex === -1) {
        users.push(newUser);
    }
    else {
        users[userIndex] = {
            ...users[userIndex],
            ...newUser,
        };
    }
    return users;
}
exports.userController = userController;
