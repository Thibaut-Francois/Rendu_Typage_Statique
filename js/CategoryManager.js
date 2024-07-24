import { Category } from './Category.js';
var CategoryManager = /** @class */ (function () {
    function CategoryManager() {
        this.categories = [];
        var savedCategories = localStorage.getItem('categories');
        if (savedCategories) {
            this.categories = JSON.parse(savedCategories);
            console.log(this.categories);
        }
    }
    CategoryManager.prototype.addCategory = function (categoryName) {
        var newCategory = new Category(categoryName);
        // -- Debugging --
        console.log(newCategory);
        this.categories.push(newCategory);
        this.saveCategoriesToLocalStorage();
    };
    CategoryManager.prototype.saveCategoriesToLocalStorage = function () {
        localStorage.setItem('categories', JSON.stringify(this.categories));
    };
    CategoryManager.prototype.updateCategoryOptions = function (selectElement) {
        selectElement.innerHTML = '';
        this.categories.forEach(function (category) {
            var option = document.createElement('option');
            option.value = category.name;
            option.textContent = category.name;
            selectElement.appendChild(option);
        });
    };
    return CategoryManager;
}());
export default CategoryManager;
