import { Category } from "./Category.js";
var Task = /** @class */ (function () {
    function Task(name, description, priority, date, category, id) {
        if (category === void 0) { category = new Category("Default"); }
        if (id === void 0) { id = "Task_" + Date.now().toString(); }
        this.id = id;
        this.name = name;
        this.description = description;
        this.priority = priority;
        this.date = date;
        this.category = category;
    }
    Object.defineProperty(Task.prototype, "get_id", {
        get: function () { return this.id; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "get_name", {
        get: function () { return this.name; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "get_description", {
        get: function () { return this.description; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "get_priority", {
        get: function () { return this.priority; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "get_date", {
        get: function () { return this.date; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "get_category", {
        get: function () { return this.category; },
        enumerable: false,
        configurable: true
    });
    return Task;
}());
export { Task };
