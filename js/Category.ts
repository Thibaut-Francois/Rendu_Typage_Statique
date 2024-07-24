import { ICategory } from "./ICategory.js";

export class Category implements ICategory{
    id: string;
    name: string;

    constructor(categoryName: string) {
        this.id = "Category_" + Date.now().toString();
        this.name = categoryName;
    }

    get get_name(): string {
        return this.name;
    }
}