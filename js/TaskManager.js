import { Task } from "./Task.js";
var TaskManager = /** @class */ (function () {
    function TaskManager() {
        var _this = this;
        this.tasks = [];
        this.categories = [];
        this.taskContainer = document.getElementById("tasks");
        this.priorityFilter = document.getElementById("filterPriority");
        this.searchInput = document.getElementById("searchInput");
        var savedTasks = localStorage.getItem("tasks");
        if (savedTasks) {
            this.tasks = JSON.parse(savedTasks);
            this.renderTasks();
        }
        this.priorityFilter.addEventListener("change", function () {
            _this.renderTasks();
        });
        this.searchInput.addEventListener("input", function () {
            _this.renderTasks();
        });
    }
    TaskManager.prototype.addTask = function (taskName, description, date, priority, category) {
        console.log("task, caca pipi ", category);
        var newTask = new Task(taskName, description, priority, date, category);
        this.tasks.push(newTask);
        this.saveTasksToLocalStorage();
        this.renderTasks();
    };
    TaskManager.prototype.removeTask = function (id) {
        this.tasks = this.tasks.filter(function (task) { return task.id !== id; });
        this.saveTasksToLocalStorage();
        this.renderTasks();
    };
    TaskManager.prototype.editTask = function (id, newName, newDescription, newDate, newPriority, newCategory) {
        var taskIndex = this.tasks.findIndex(function (task) { return task.id === id; });
        if (taskIndex !== -1) {
            this.tasks[taskIndex] = new Task(newName, newDescription, newPriority, newDate, newCategory, id);
            this.saveTasksToLocalStorage();
            this.renderTasks();
        }
    };
    TaskManager.prototype.saveTasksToLocalStorage = function () {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    };
    // --- Display tasks ---
    TaskManager.prototype.renderTasks = function () {
        var _this = this;
        var priorityFilter = this.priorityFilter.value;
        var searchQuery = this.searchInput.value.toLowerCase();
        var filteredTasks = this.tasks.filter(function (task) {
            return (priorityFilter === "all" || task.priority === priorityFilter) &&
                (task.name.toLowerCase().includes(searchQuery) ||
                    task.description.toLowerCase().includes(searchQuery));
        });
        this.taskContainer.innerHTML = "";
        filteredTasks.forEach(function (task) {
            var taskElement = document.createElement("div");
            // --test--
            console.log(task.category);
            taskElement.innerHTML = "\n                <div><b>Nom :</b> ".concat(task.name, "</div>\n                <div><b>Description :</b> ").concat(task.description, "</div>\n                <div><b>Date :</b> ").concat(task.date, "</div>\n                <div><b>Priorit\u00E9e :</b> ").concat(task.priority, "</div>\n                <div><b>Categorie :</b> ").concat(task.category.name, "</div>\n                <button class=\"remove-btn\" data-id=\"").concat(task.id, "\">Supprimer</button>\n                <button class=\"edit-btn\" data-id=\"").concat(task.id, "\">Modifier</button>\n            ");
            _this.taskContainer.appendChild(taskElement);
        });
    };
    TaskManager.prototype.openEditForm = function (taskId) {
        var _this = this;
        var task = this.tasks.find(function (t) { return t.id === taskId; });
        var editForm = document.getElementById('editForm');
        if (task) {
            editForm.elements.namedItem('editTaskName').value = task.name;
            editForm.elements.namedItem('editTaskDescription').value = task.description;
            editForm.elements.namedItem('editTaskDate').value = task.date;
            editForm.elements.namedItem('editTaskPriority').value = task.priority;
            editForm.style.display = 'inline';
            editForm.addEventListener('submit', function (event) {
                event.preventDefault();
                var editedName = editForm.elements.namedItem('editTaskName').value;
                var editedDescription = editForm.elements.namedItem('editTaskDescription').value;
                var editedDate = editForm.elements.namedItem('editTaskDate').value;
                var editedPriority = editForm.elements.namedItem('editTaskPriority').value;
                _this.editTask(task.id, editedName, editedDescription, editedDate, editedPriority, task.category);
                editForm.style.display = 'none';
            });
        }
    };
    // --- Event listener for the form ---
    TaskManager.prototype.init = function () {
        var _this = this;
        this.renderTasks();
        this.taskContainer.addEventListener("click", function (event) {
            if (event.target && event.target.classList.contains('edit-btn')) {
                var taskId = event.target.getAttribute('data-id');
                console.log("id:", taskId);
                _this.openEditForm(taskId);
            }
            if (event.target &&
                event.target.classList.contains("remove-btn")) {
                var taskId = (event.target.getAttribute("data-id"));
                _this.removeTask(taskId);
            }
        });
    };
    return TaskManager;
}());
export { TaskManager };
export default TaskManager;
