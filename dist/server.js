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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./app/config"));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dbUri = config_1.default.database_url;
        if (!dbUri) {
            throw new Error("Database URL is not defined.");
        }
        yield mongoose_1.default.connect(dbUri);
        app_1.default.listen(config_1.default.port, () => {
            // console.log(`Server running on http://localhost:${config.port}`);
        });
    }
    catch (error) {
        // console.error("Error during MongoDB connection setup:", error);
        process.exit(1);
    }
});
main();
