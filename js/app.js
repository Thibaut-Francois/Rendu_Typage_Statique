import { Category } from "./Category.js";
import TaskManager from "./TaskManager.js";
import CategoryManager from "./CategoryManager.js";
var taskManager = new TaskManager();
taskManager.init();
var selectCategory = document.getElementById("taskCategory");
var categoryManager = new CategoryManager();
categoryManager.updateCategoryOptions(selectCategory);
var form = document.getElementById("taskForm");
// --- Event listener for the form ---
if (form) {
    form.onsubmit = function (event) {
        console.log(form, event);
        event.preventDefault();
        var data = new FormData(form);
        var inputTitleChoice = data.get("taskTitle");
        var inputDescriptionChoice = data.get("taskDescription");
        var inputDateChoice = data.get("taskDueDate");
        var inputLevelChoice = data.get("taskPriority");
        var category = new Category(data.get("taskCategory"));
        // --test--
        console.log("fouzqnlfuqzhsliurfqzisugfrqloisubfvvqu", data.get("taskPriority"));
        if (inputTitleChoice &&
            inputDescriptionChoice &&
            inputDateChoice &&
            inputLevelChoice &&
            category) {
            var taskCreated = taskManager.addTask(inputTitleChoice, inputDescriptionChoice, inputDateChoice, inputLevelChoice, category);
        }
        else {
            console.log("Remplissez toutes les champs");
        }
    };
}
// --- Event listener for the button ---
var categoryForm = document.getElementById("categoryForm");
if (categoryForm) {
    categoryForm.onsubmit = function (event) {
        event.preventDefault();
        var data = new FormData(categoryForm);
        var categoryName = data.get("categoryName");
        categoryManager.addCategory(categoryName);
        categoryManager.updateCategoryOptions(selectCategory);
    };
}
