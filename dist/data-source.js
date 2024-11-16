"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const user_1 = __importDefault(require("./entities/user"));
const todo_1 = require("./entities/todo");
const AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "yoochanhyeon",
    password: "yoochanhyeon",
    database: "todos",
    synchronize: true,
    logging: false,
    entities: [user_1.default, todo_1.Todo],
    migrations: [],
    subscribers: [],
});
exports.default = AppDataSource;
//# sourceMappingURL=data-source.js.map