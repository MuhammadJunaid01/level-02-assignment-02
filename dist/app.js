"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const product_route_1 = require("./app/product/product.route");
const handle_errors_1 = require("./app/lib/utils/handle-errors");
const order_route_1 = require("./app/order/order.route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use("/api", product_route_1.productRouter);
app.use("/api", order_route_1.orderRouter);
app.get("/", (req, res) => {
    res.send("Server running on http://localhost:5000");
});
app.all("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});
app.use(handle_errors_1.errorHandler);
exports.default = app;
