import { Task } from "./Task.js";
import { Category } from "./Category.js";

export class TaskManager {
    tasks: Task[];
    categories: Category[];
    taskContainer: HTMLElement;
    priorityFilter: HTMLSelectElement;
    searchInput: HTMLInputElement;

    constructor() {
        this.tasks = [];
        this.categories = [];
        this.taskContainer = document.getElementById("tasks")!;
        this.priorityFilter = document.getElementById(
            "filterPriority"
        ) as HTMLSelectElement;
        this.searchInput = document.getElementById(
            "searchInput"
        ) as HTMLInputElement;

        const savedTasks = localStorage.getItem("tasks");
        if (savedTasks) {
            this.tasks = JSON.parse(savedTasks);
            this.renderTasks();
        }

        this.priorityFilter.addEventListener("change", () => {
            this.renderTasks();
        });

        this.searchInput.addEventListener("input", () => {
            this.renderTasks();
        });
    }

    addTask(taskName: string, description: string, date: string, priority: string, category: Category
    ) {
        console.log("task, caca pipi ",category);
        const newTask: Task = new Task(taskName, description, priority, date, category);
        this.tasks.push(newTask);
        this.saveTasksToLocalStorage();
        this.renderTasks();
    }

    removeTask(id: string) {
        this.tasks = this.tasks.filter((task) => task.id !== id);
        this.saveTasksToLocalStorage();
        this.renderTasks();
    }

    editTask(id: string, newName: string, newDescription: string, newDate: string, newPriority: string, newCategory: Category) {
        const taskIndex = this.tasks.findIndex(task => task.id === id);

        if (taskIndex !== -1) {
            this.tasks[taskIndex] = new Task(
                newName,
                newDescription,
                newPriority,
                newDate,
                newCategory,
                id
            );
            this.saveTasksToLocalStorage();
            this.renderTasks();
        }
    }

    saveTasksToLocalStorage() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }

    // --- Display tasks ---

    renderTasks() {  
        const priorityFilter = this.priorityFilter.value as string;
        const searchQuery = this.searchInput.value.toLowerCase();
        const filteredTasks = this.tasks.filter(
            (task) =>
                (priorityFilter === "all" || task.priority === priorityFilter) &&
                (task.name.toLowerCase().includes(searchQuery) ||
                    task.description.toLowerCase().includes(searchQuery))
        );

        this.taskContainer.innerHTML = "";
        filteredTasks.forEach((task) => {
            const taskElement = document.createElement("div");

            // --test--
            console.log(task.category)

            taskElement.innerHTML = `
                <div><b>Nom :</b> ${task.name}</div>
                <div><b>Description :</b> ${task.description}</div>
                <div><b>Date :</b> ${task.date}</div>
                <div><b>Prioritée :</b> ${task.priority}</div>
                <div><b>Categorie :</b> ${task.category.name}</div>
                <button class="remove-btn" data-id="${task.id}">Supprimer</button>
                <button class="edit-btn" data-id="${task.id}">Modifier</button>
            `;
            this.taskContainer.appendChild(taskElement);
        });
    }

    openEditForm(taskId: string) {
        let task = this.tasks.find(t => t.id === taskId);

        const editForm = document.getElementById('editForm') as HTMLFormElement;
        if(task){
        (editForm.elements.namedItem('editTaskName') as HTMLInputElement).value = task.name;
        (editForm.elements.namedItem('editTaskDescription') as HTMLInputElement).value = task.description;
        (editForm.elements.namedItem('editTaskDate') as HTMLInputElement).value = task.date;
        (editForm.elements.namedItem('editTaskPriority') as HTMLSelectElement).value = task.priority;
        editForm.style.display = 'inline';

        editForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const editedName = (editForm.elements.namedItem('editTaskName') as HTMLInputElement).value;
            const editedDescription = (editForm.elements.namedItem('editTaskDescription') as HTMLInputElement).value;
            const editedDate = (editForm.elements.namedItem('editTaskDate') as HTMLInputElement).value;
            const editedPriority = (editForm.elements.namedItem('editTaskPriority') as HTMLSelectElement).value;
            this.editTask(task.id, editedName, editedDescription, editedDate, editedPriority, task.category);
 
            editForm.style.display = 'none';
    });
}
}

    // --- Event listener for the form ---

    init() {
        this.renderTasks();

        this.taskContainer.addEventListener("click", (event) => {

            if (event.target && (event.target as HTMLElement).classList.contains('edit-btn')) {
                const taskId = (event.target as HTMLElement).getAttribute('data-id')!;
                console.log("id:",taskId);
                this.openEditForm(taskId);
            }
            if (
                event.target &&
                (event.target as HTMLElement).classList.contains("remove-btn")
            ) {
                const taskId = ((event.target as HTMLElement).getAttribute("data-id")!);
                this.removeTask(taskId);
            }
            
        });
    }
}

export default TaskManager;
