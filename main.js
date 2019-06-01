let titleInput = document.querySelector('#nav__input--title');
let taskInput = document.querySelector('#nav__input--task');

let btnAppendTask = document.querySelector('#nav__btn--task-append');
let btnMakeList = document.querySelector('#nav__btn-list-append');
let btnClearAll = document.querySelector('#nav__btn-clear');

let cardContainer = document.querySelector('#card__main--container');
let navTaskContainer = document.querySelector('#nav__container--tasks');
let navFormInputs = document.querySelector('#nav__form--top');


// btnMakeList.addEventListener('click', runListCreationLoop);
btnAppendTask.addEventListener('click', runTaskCreationLoop);
// btnDeleteTask.addEventListener('click',)
taskInput.addEventListener('keyup', validateTaskInputs);

navTaskContainer.addEventListener("click", deleteCreatedTaskItem);

// this.addEventListener('load', pageReloadConditions);

var globalArray = JSON.parse(localStorage.getItem('savedListArr')) || [];

function makeList() {
  var list = new ToDoList(Date.now(),titleInput.value, false, taskArray);
    globalArray.push(list)
    list.saveToStorage(globalArray)
    runTaskCreationLoop();
}

function appendTaskListCard(listObj) {
  cardContainer.innerHTML =
    `<article class="card__article--container">
      <header class="card__header">
        <h3 class="card__h3--title">${listObj.title}</h3>
      </header>
      <section class="card__section--main">
        <p class="card__paragraph">Fam pug williamsburg PBR&B
        </p>
      </section>
      <footer class="card__footer">
      <input class="card__footer--images card__footer--urgent" type="image" alt="Card urgent button"
        src=${
        listObj.urgent === true
        ? "images/urgent-active.svg"
        : "images/urgent.svg"}>
      <input class="card__footer--images card__footer--delete" type="image" alt="Card delete button"
      src="images/delete.svg">
      </footer>
    </article>` +cardContainer.innerHTML;
}

function appendCreatedTaskItem() {
  navTaskContainer.innerHTML =
    ` <section class="nav__section--task">
      <input type="image" class="nav__input--task-delete delete-item"id="nav__input--task-delete" src='images/delete.svg' width=25px height=20px alt="task delete button>
      <p class="nav__paragraph--text">${taskInput.value}
      </p></input>
    </section>
  `+ navTaskContainer.innerHTML;
};

function deleteCreatedTaskItem(e) {
  e.preventDefault()
  if( e.target.closest("#nav__input--task-delete")) {
    e.target.closest("section").remove();
  }
}

function clearFormInput(form) {
  form.reset()
}

function runListCreationLoop() {
  validateInputs(btnMakeList, titleInputValue);
  appendTaskListCard();
  clearFormInput(navFormInputs);
}

function runTaskCreationLoop() {
  appendCreatedTaskItem();
  clearFormInput(navFormInputs);
  validateTaskInputs();
}

function validateTaskInputs() {
  validateInputs(btnAppendTask, taskInput);
}

function validateInputs(button, input) {
  button.disabled = input.length > 0  ? true : false;
}