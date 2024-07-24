import { Category } from "./Category.js";
import { ITask } from "./ITask.js";

export class Task implements ITask {
    id: string;
    name: string;
    description: string;
    priority: string;
    date: string;
    category: Category;

    constructor(name: string, description: string, priority:string, date: string, category: Category = new Category("Default"),id:string = "Task_" + Date.now().toString()) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.priority = priority;
        this.date = date;
        this.category = category;
    }

    get get_id() { return this.id; }
    get get_name() { return this.name; }
    get get_description() { return this.description; }
    get get_priority() { return this.priority; }
    get get_date() { return this.date; }
    get get_category() { return this.category; }
}