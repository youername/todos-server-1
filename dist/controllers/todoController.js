"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTodo = exports.updateTodoIsDone = exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
const todo_1 = require("../entities/todo");
const user_1 = __importDefault(require("../entities/user"));
const createTodo = async (req, res) => {
    var _a;
    const { title, isDone, subTitle, color, subTitleVisible } = req.body;
    try {
        const user = await user_1.default.findOne({ where: { id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id } });
        const todo = new todo_1.Todo();
        todo.title = title;
        todo.subTitle = subTitle;
        todo.isDone = isDone;
        todo.color = color;
        todo.subTitleVisible = subTitleVisible;
        if (user) {
            todo.user = user;
        }
        await todo.save();
        res.status(200).json({ message: "Todo created successfully", todo });
    }
    catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
};
exports.createTodo = createTodo;
const getTodos = async (req, res) => {
    var _a;
    try {
        const user = await user_1.default.findOne({ where: { id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id } });
        if (!user) {
            throw res.status(400).json({ message: "Not found user" });
        }
        const todos = await todo_1.Todo.findBy({ user, isDone: false });
        res.status(200).json({ message: "Get todos successfully", todos });
    }
    catch (error) {
        res.status(500).json({ message: "getTodos", error });
    }
};
exports.getTodos = getTodos;
const updateTodo = async (req, res) => {
    var _a;
    const { id, title, subTitle, atDate, isDone, color, subTitleVisible } = req.body;
    try {
        const user = await user_1.default.findOneBy({ id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id });
        if (!user) {
            throw res.status(400).json({ message: "Not found user" });
        }
        const todo = await todo_1.Todo.findOneBy({ id, user });
        if (!todo) {
            throw res
                .status(400)
                .json({ message: "Not found todo or don't have permission" });
        }
        const updateFields = {};
        if ((req.body, title !== undefined))
            updateFields.title = req.body.title;
        if ((req.body, subTitle !== undefined))
            updateFields.subTitle = req.body.subTitle;
        if ((req.body, atDate !== undefined))
            updateFields.atDate = req.body.atDate;
        if ((req.body, isDone !== undefined))
            updateFields.isDone = req.body.isDone;
        if ((req.body, subTitleVisible !== undefined))
            updateFields.subTitleVisible = req.body.subTitleVisible;
        if ((req.body, color !== undefined))
            updateFields.color = req.body.color;
        await todo_1.Todo.update({ id }, updateFields);
        res.status(200).json({ message: "Update todo successfully", todo });
    }
    catch (error) {
        res.status(500).json({ message: "updateTodo", error });
    }
};
exports.updateTodo = updateTodo;
const updateTodoIsDone = async (req, res) => {
    var _a;
    const { id, isDone } = req.body;
    try {
        const user = await user_1.default.findOneBy({ id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id });
        if (!user) {
            throw res.status(400).json({ message: "Not found user" });
        }
        const todo = await todo_1.Todo.findOneBy({ id, user });
        if (!todo) {
            throw res
                .status(400)
                .json({ message: "Not found todo or don't have permission" });
        }
        await todo_1.Todo.update({ id }, { isDone });
        res.status(200).json({ message: "Update isDone of todo successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "updateTodoIsDone", error });
    }
};
exports.updateTodoIsDone = updateTodoIsDone;
const removeTodo = async (req, res) => {
    var _a;
    const { id } = req.body;
    try {
        const user = await user_1.default.findOneBy({ id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id });
        if (!user) {
            throw res.status(400).json({ message: "Not found user" });
        }
        const todo = await todo_1.Todo.findOneBy({ id, user });
        if (!todo) {
            throw res
                .status(400)
                .json({ message: "Not found todo or don't have permission" });
        }
        console.log("to delete");
        await todo_1.Todo.delete({ id });
        console.log("deleted");
        res.status(200).json({ message: "deleted todo" });
    }
    catch (error) {
        res.status(500).json({ message: "removeTodo", error });
    }
};
exports.removeTodo = removeTodo;
//# sourceMappingURL=todoController.js.map