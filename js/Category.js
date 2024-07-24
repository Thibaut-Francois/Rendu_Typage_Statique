var Category = /** @class */ (function () {
    function Category(categoryName) {
        this.id = "Category_" + Date.now().toString();
        this.name = categoryName;
    }
    Object.defineProperty(Category.prototype, "get_name", {
        get: function () {
            return this.name;
        },
        enumerable: false,
        configurable: true
    });
    return Category;
}());
export { Category };
