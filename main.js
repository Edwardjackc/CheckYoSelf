let titleInput = document.querySelector('#nav__input--title');
let taskInput = document.querySelector('#nav__input--task');
let btnAppendTask = document.querySelector('#nav__btn--task-append');
let btnMakeList = document.querySelector('#nav__btn--list-append');
let btnClearAll = document.querySelector('#nav__btn-clear');
let cardContainer = document.querySelector('#card__main--container');
let navTaskContainer = document.querySelector('#nav__container--tasks');
let navFormInputs = document.querySelector('#nav__form--top');


/*********** Event Listeners ***********/
btnClearAll.addEventListener('click', clearInputs)
btnMakeList.addEventListener('click', makeListItems);
btnAppendTask.addEventListener('click', runTaskCreationLoop);
taskInput.addEventListener('keyup', validateNavInputs);
navTaskContainer.addEventListener('click', deleteCreatedTaskItem);
cardContainer.addEventListener('click', deleteCard);
cardContainer.addEventListener('click', markAsUrgent);
this.addEventListener('load', loadConditions);


var globalArray = JSON.parse(localStorage.getItem('savedListArr')) || [];

/********* appending functions *********/
function appendListCard(list) {
  cardContainer.innerHTML =
    `<article class="card__article--container"data-id=${list.id}>
      <header class="card__header">
        <h3 class="card__h3--title">${list.title}</h3>
      </header>
      <section class="card__section--main">
        <p class="card__paragraph">${taskAppendLoop(list)}
        </p>
      </section>
      <footer class="card__footer">
      <input class="card__footer--images card__footer--urgent" type="image" alt="Card urgent button"
        src=${
          list.urgent === true
            ? "images/urgent-active.svg"
            : "images/urgent.svg"
        }>
      <input class="card__footer--images card__footer--delete" id="card__delete--btn" type="image"  alt="Card delete button"
      src="images/delete.svg"}>
      </footer>
    </article>` + cardContainer.innerHTML;
}

function appendTaskItem() {
  navTaskContainer.innerHTML =
    ` <section class="nav__section--task">
      <div class= nav__div--task-item>
        <input type="image" class="nav__input--task-delete delete-item" id="nav__input--task-delete" src="images/delete.svg" alt="task delete button>
        <p class="nav__paragraph--text"id="nav__paragraph--text">${taskInput.value}
        </p></input>
      </div>
    </section>
  `+ navTaskContainer.innerHTML;
}

function clearDisplayMessage() {
  var hiddenMessage = document.querySelector('#card__label--message');
  if (cardContainer.contains(hiddenMessage)) {
    hiddenMessage.remove();
  }
}

/**********  Delete functions  **********/
function deleteCreatedTaskItem(e) {
  e.preventDefault()
  if( e.target.closest('#nav__input--task-delete')) {
    e.target.closest('section').remove();
  }
}

/****  Validation functions ********/

function validateInputs(button, input) {
  button.disabled = input.value ? false : true;
}

/******** Clear Functions *********/
function clearFormInput(form) {
  form.reset()
}

function clearInputs() {
  clearFormInput(navFormInputs)
}

function runTaskCreationLoop() {
  appendTaskItem();
  clearFormInput(navFormInputs);
  validateInputs(btnAppendTask,taskInput);
}

function validateNavInputs() {
  validateInputs(btnAppendTask, taskInput);
  validateInputs(btnMakeList, titleInput && taskInput);
}

/********** Item functions ************/

function  makeListItems(e) {
  e.preventDefault();
  var tempArray = []
  var allTaskOutputs = document.querySelectorAll('.nav__div--task-item');
  for (var i = 0; i < allTaskOutputs.length; i++) {
    var taskObject = {
      id:Date.now(),
      content: allTaskOutputs[i].innerText
    }
    tempArray.push(taskObject)
    console.log('tempArray', tempArray)
  }
  createListObject(tempArray);
};

function taskAppendLoop(obj) {
  var string = ""
  for (var i = 0; i < obj.task.length; i++) {
    string += `<div class="card__div--task"><input class="card__img--task" type="image" src="images/checkbox.svg"><p class="card__paragraph--text">${
      obj.task[i].content
      }</p></input></div>`;
  }
  return string
};

/******Card List functions** */
function createListObject(task) {
  console.log('hi',task)
  if (titleInput.value && navTaskContainer.innerText) {
    var list = new ToDoList(Date.now(),titleInput.value, false, task);
    globalArray.push(list);
    list.saveToStorage(globalArray);
    navTaskContainer.innerHTML = null;
    appendListCard(list);
    clearDisplayMessage();
    clearFormInput(navFormInputs);
  }
  return list 
};

function reloadToDoList() {
  console.log('global array', globalArray)
  if (globalArray.length !== 0) {
    const newArray = globalArray.map(listObj => {
      const newList = new ToDoList(listObj.id,listObj.title, listObj.urgent, listObj.task);
      console.log('new list', newList)
      return newList;
    });
    globalArray = newArray;
  }
}

function loadConditions() {
  reloadPageDom();
  reloadToDoList();
}

function reloadPageDom() {
  if (globalArray.length !== 0) {
    globalArray.forEach(function (item) {
      appendListCard(item);
      clearDisplayMessage();
    })
  }
}

function deleteCard(e) {
  if (e.target.classList.contains("card__footer--delete")) {
    e.target.closest("article").remove();
    var locatedIndex = locateIndex(e);
    var locatedId = locateId(e);
    globalArray[locatedIndex].deleteFromStorage(locatedId);
    clearDisplayMessage();
  }
}

function locateId(e) {
  var parent = e.target.closest("article");
  var parentId = parseInt(parent.dataset.id);
  return parentId;
}

function locateIndex(e) {
  var parent = e.target.closest("article");
  var parentId = parseInt(parent.dataset.id);
  var locatedIndex = globalArray.findIndex(function (list) {
    return list.id === parentId;
  });
  return locatedIndex;
}

function markAsUrgent(e) {
  if (e.target.classList.contains('card__footer--urgent')) {
  var locatedIndex = locateIndex(e);
  globalArray[locatedIndex].urgent ? globalArray[locatedIndex].urgent = false : globalArray[locatedIndex].urgent = true;
  } 
}