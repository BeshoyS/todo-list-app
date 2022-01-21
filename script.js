// Global Vars
//header
const inp = document.getElementById("taskInp");
const form = document.getElementById("form");
const errorMsg = document.getElementById("errorMsg");
//Tasks
const tasksArea = document.getElementById("tasksSec");
const taskArea = document.getElementsByClassName("task");
//Btns
const updateBtn = document.getElementsByClassName("fa-edit");
const saveBtn = document.getElementsByClassName("fa-check");
const toggleBtn = document.getElementsByClassName("toggleBtn");
//Footer (the num of tasks and the completed ones)
const allTasksNum = document.getElementById("allTasksNum");
const compTasksNum = document.getElementById("compTasksNum");

//Tasks List
let tasksList;

//calling the existing tasks if available
if (localStorage.getItem("tasks")) {
  tasksList = JSON.parse(localStorage.getItem("tasks"));
} else {
  tasksList = [];
}
//display the existing tasks and thier counts
displayTask();
tasksCount();

//add a task
function addTask(e) {
  e.preventDefault();
  //input Validation
  if (inp.value == "") {
    errorMsg.classList.remove("d-none");
  } else {
    errorMsg.classList.add("d-none");
    let task = {
      taskName: inp.value,
      completed: false,
    };
    tasksList.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasksList));
    displayTask();
    tasksCount();
    //empty the input after submitting
    inp.value = "";
  }
}
form.addEventListener("submit", addTask);

//display task/s
function displayTask() {
  let str = "";
  tasksList.forEach(({ taskName, completed }, index) => {
    //if there are tasks completed or checked, the style of the task's bg and the checked will be changed
    let checked = completed ? `fa-check-circle` : `fa-circle`;
    let taskBg = completed ? `completed` : ``;
    str += ` <div class="task ${taskBg}">
        <div class="left-side">
          <i onclick='toggleTask(${index})' id='toggleBtn' class="toggleBtn far ${checked}" aria-hidden="true"></i>
        </div>
        <div class="task-content">
          <p id="inputVal">${taskName}</p>
        </div>
        <div class="right-side">
        <i onclick='saveTask(${index})' class="d-none fas fa-check"></i>
          <i onclick='editTask(${index})' class="far fa-edit" aria-hidden="true"></i>
          <i onclick='deleteTask(${index})' class="far fa-trash-alt" aria-hidden="true"></i>
        </div>
      </div>  `;
  });
  tasksArea.innerHTML = str;
}

// delete task
function deleteTask(index) {
  tasksList.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasksList));
  displayTask();
  tasksCount();
}

//edit the task by make the p tag editable
function editTask(index) {
  let inputVal = document.querySelectorAll("#inputVal")[index];
  inputVal.setAttribute("contenteditable", "true");
  updateBtn[index].classList.add("d-none");
  saveBtn[index].classList.remove("d-none");
}

//save the edited task
function saveTask(index) {
  let inputVal = document.querySelectorAll("#inputVal")[index];
  inputVal.removeAttribute("contenteditable");
  tasksList[index].taskName = inputVal.innerHTML;
  localStorage.setItem("tasks", JSON.stringify(tasksList));
  updateBtn[index].classList.remove("d-none");
  saveBtn[index].classList.add("d-none");
  displayTask();
  tasksCount();
}

//make the task checked or unchecked
function toggleTask(index) {
  tasksList[index].completed = !tasksList[index].completed;
  if (tasksList[index].completed) {
    toggleBtn[index].classList.replace("fa-circle", "fa-check-circle");
  } else {
    toggleBtn[index].classList.replace("fa-check-circle", "fa-circle");
  }
  localStorage.setItem("tasks", JSON.stringify(tasksList));
  displayTask();
  tasksCount();
}

//tasks counts
function tasksCount() {
  allTasksNum.innerHTML = tasksList.length;
  compTasksNum.innerHTML = tasksList.filter(
    (task) => task.completed === true
  ).length;
}
