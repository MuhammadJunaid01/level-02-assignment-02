"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.createError = void 0;
const createError = (message, statusCode) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};
exports.createError = createError;
const errorHandler = (err, req, res) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success: false,
        message: message,
    });
};
exports.errorHandler = errorHandler;
