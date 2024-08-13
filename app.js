let inputToDo = document.querySelectorAll('.add-todo-input')[0];
const toDoListDiv = document.querySelectorAll('.todo-list')[0];

let alltoDos = [];

function add() {

  let newToDo = inputToDo.value.trim(); 
  if(newToDo) { // Only add if the input is not empty
    alltoDos.push(newToDo);
    printAllToDos();
    inputToDo.value = '';
  }
  else {
    displayError('<p style="color: red;">Input cannot be empty</p>');
  }
}

function printAllToDos() {
  toDoListDiv.innerHTML = "";
  for(let i = 0; i <alltoDos.length; i++) {
    toDoListDiv.innerHTML += `
    <div class="list-group-item d-flex justify-content-between align-items-center">
        <span id="${i}">${alltoDos[i]}</span>
        <div>
          <button class="btn btn-warning btn-sm mr-2" onclick='editToDo(${i})'>Edit</button>
          <button class="btn btn-danger btn-sm" onclick='deleteToDo(${i})'>Delete</button>
        </div>
      </div>`;
  }
}

function deleteToDo(id) {
  alltoDos.splice(id, 1);
  printAllToDos();
}


let addToDoDiv = document.querySelectorAll('.add-todo-container')[0];
let editToDoDiv = document.querySelectorAll('.edit-todo-container')[0];
let editInputToDo = document.querySelectorAll('.edit-todo-input')[0];
let editIndex;

function editToDo(id) {
  console.log(alltoDos[id]);
  if(isEditing) {
    displayError('<p style="color: red;">Please save current todo First</p>');
  }
  else {
    toggleInputToDo();
    editInputToDo.value = alltoDos[id];
    editIndex = id;
  }
}

function updateToDo() {

  let updatedToDo = editInputToDo.value.trim();
  if(updatedToDo) { // Only update if the input is not empty
    alltoDos.splice(editIndex, 1, updatedToDo);
    printAllToDos();
    toggleInputToDo();
  }
  else {
    displayError('<p style="color: red;">Edit Input cannot be empty</p>');
  }
}

let isEditing = false;
function toggleInputToDo(){
  if(isEditing) {
    addToDoDiv.className = '';
    editToDoDiv.className += ' hide';
  }
  else {
    addToDoDiv.className += ' hide';
    editToDoDiv.className = '';
  }
  isEditing = !isEditing
}

let errorEl = document.querySelectorAll('.error')[0];

function displayError(str) {
  errorEl.innerHTML = `${str}`;
  setTimeout(() => {
    errorEl.innerHTML = '';
  }, 3000);
}