import { Category } from './Category.js';

class CategoryManager {
    categories: Category[];

    constructor() {
        this.categories = [];
        const savedCategories = localStorage.getItem('categories');
        if (savedCategories) {
            this.categories = JSON.parse(savedCategories);
            console.log(this.categories);
        }
    }

    addCategory(categoryName: string) {
        const newCategory: Category = new Category(categoryName);
        // -- Debugging --
        console.log(newCategory);
        this.categories.push(newCategory);
        this.saveCategoriesToLocalStorage();
    }

    saveCategoriesToLocalStorage() {
        localStorage.setItem('categories', JSON.stringify(this.categories));
    }
    
    updateCategoryOptions(selectElement: HTMLSelectElement) {
        selectElement.innerHTML = '';
        this.categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.name;
            option.textContent = category.name;
            selectElement.appendChild(option);
        });
    }
}

export default CategoryManager;
