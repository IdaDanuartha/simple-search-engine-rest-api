"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
// Helper function for response formatting
const sendResponse = (res, success, data = null, message = '', statusCode = 200) => {
    res.status(statusCode).json({
        success,
        message,
        data,
    });
};
exports.sendResponse = sendResponse;
