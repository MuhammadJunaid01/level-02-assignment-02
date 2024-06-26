"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const zod_1 = require("zod");
const validateRequest = (schema) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield schema.parseAsync(req);
        next();
        //eslint-disable-next-line
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            res.status(400).json({
                error: "Invalid Data",
                details: error.errors.map((err) => err.message),
            });
        }
        else {
            next(error);
        }
    }
});
exports.validateRequest = validateRequest;
