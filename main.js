const allTasks = document.getElementById("all-tasks");
const taskInput = document.querySelector(".task-input");
const addTaskBtn = document.querySelector(".add-task-btn");
const clearAllBtn = document.querySelector(".clear-all-btn");
const saveTaskBtn = document.querySelector(".save-task-btn");
const saveTaskIndex = document.getElementById("save-task-index");

// Display tasks on page load
window.addEventListener("DOMContentLoaded", displayTasks);

// Add tasks
addTaskBtn.addEventListener("click", e => {
   e.preventDefault();
   if(taskInput.value === "") {
      alert("Please enter a task");
   }
   addToLocalStorage();
});

// Clear all tasks
clearAllBtn.addEventListener("click", () => {
   if(localStorage.length === 0) {
      alert("There are no tasks to delete. Create some tasks :)");
   }
   else if(localStorage.length === 1) {
      const confirmAction = confirm("Are you sure you want to delete all tasks?");
      if(confirmAction) {
         localStorage.clear();
         displayTasks();
      }
   }
});

// Set items to local storage
function setItems(tasks) {
   localStorage.setItem("local-tasks", JSON.stringify(tasks));
}

// Saving tasks on local storage
function addToLocalStorage() {
   if(taskInput.value !== "") {
      const localTasks = localStorage.getItem("local-tasks");
      
      if(localTasks === null) {
         taskObject = [];
      }
      else {
         taskObject = JSON.parse(localTasks);
      }
      
      taskObject.unshift(taskInput.value);
      setItems(taskObject);
   }
   displayTasks();
   taskInput.value = "";
}

// Display tasks from local storage
function displayTasks() {
   const localTasks = localStorage.getItem("local-tasks");
   if(localTasks === null) {
      taskObject = [];
   }
   else {
      taskObject = JSON.parse(localTasks);
   }
   
   let taskRow = '';

   taskObject.forEach((task, taskNumber) => {
      taskRow += `
         <tr id=${taskNumber + 1} class="task-row">
            <td class="task task-${taskNumber + 1}">${task}</td>
            <td>
               <button class="btn delete-btn" onclick="deleteData(${taskNumber})">
                  <i class="fa-solid fa-trash-can"></i>
               </button>
               <button class="btn edit-btn" onclick="editData(${taskNumber})">
                  <i class="fa-solid fa-pen-to-square"></i>
               </button>
            </td>
         </tr>    
      `
   });
   allTasks.innerHTML = taskRow;
   taskInput.value = ""; 
}

// Delete data
function deleteData(rowId) {
   const confirmAction = confirm("Are you sure you want to delete this task?");
   if(confirmAction) {
      const localTasks = localStorage.getItem("local-tasks");
      const taskObject = JSON.parse(localTasks);
      taskObject.splice(rowId, 1);
      setItems(taskObject);
      displayTasks();
   }
}

// Edit data
function editData(index) {
   const localTasks = localStorage.getItem("local-tasks");
   const taskObject = JSON.parse(localTasks);
   taskInput.value = taskObject[index];
   addTaskBtn.style.display = "none";
   saveTaskBtn.style.display = "block";
   saveTaskIndex.value = index; 
}

// Save edited data
saveTaskBtn.addEventListener("click", () => {
   const localTasks = localStorage.getItem("local-tasks");
   const taskObject = JSON.parse(localTasks);
   taskObject[saveTaskIndex.value] = taskInput.value;
   setItems(taskObject);
});
