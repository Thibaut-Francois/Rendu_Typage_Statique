import { Category } from "./Category.js";
import TaskManager from "./TaskManager.js";
import CategoryManager from "./CategoryManager.js";

const taskManager: TaskManager = new TaskManager();
taskManager.init();

const selectCategory = document.getElementById("taskCategory") as HTMLSelectElement;

const categoryManager: CategoryManager = new CategoryManager();
categoryManager.updateCategoryOptions(selectCategory);


const form = document.getElementById("taskForm") as HTMLFormElement;

// --- Event listener for the form ---

if (form) {
  form.onsubmit = (event: Event) => {
    console.log(form, event);
    event.preventDefault();
    const data = new FormData(form);
    let inputTitleChoice = data.get("taskTitle") as string; 
    let inputDescriptionChoice = data.get("taskDescription") as string;
    let inputDateChoice = data.get("taskDueDate") as string;
    let inputLevelChoice = data.get("taskPriority") as string;
    let category = new Category(data.get("taskCategory") as string);
    // --test--
    console.log("fouzqnlfuqzhsliurfqzisugfrqloisubfvvqu", data.get("taskPriority") );
    if (
      inputTitleChoice &&
      inputDescriptionChoice &&
      inputDateChoice &&
      inputLevelChoice &&
      category
    ) {
      let taskCreated = taskManager.addTask(
        inputTitleChoice,
        inputDescriptionChoice,
        inputDateChoice,
        inputLevelChoice,
        category
      );
    } else {
      console.log("Remplissez toutes les champs");
    }
  };
}

// --- Event listener for the button ---

const categoryForm = document.getElementById("categoryForm") as HTMLFormElement;
if(categoryForm){
  categoryForm.onsubmit = (event:Event)=>{
    event.preventDefault();
    const data = new FormData(categoryForm);

    let categoryName = data.get("categoryName") as string;
    categoryManager.addCategory(categoryName);
    categoryManager.updateCategoryOptions(selectCategory);

  }
}

