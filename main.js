let titleInput = document.querySelector('#nav__input--title');
let taskInput = document.querySelector('#nav__input--task');
let btnAppendTask = document.querySelector('#nav__btn--task-append');
let btnMakeList = document.querySelector('#nav__btn--list-append');
let btnClearAll = document.querySelector('#nav__btn-clear');
let cardContainer = document.querySelector('#card__main--container');
let navTaskContainer = document.querySelector('#nav__container--tasks');
let navFormInputs = document.querySelector('#nav__form--top');

/*********** Event Listeners ***********/

btnClearAll.addEventListener('click', clearInputs);
btnMakeList.addEventListener('click', makeListItems);
btnAppendTask.addEventListener('click', runTaskCreationLoop);
taskInput.addEventListener('keyup', validateNavInputs);
navTaskContainer.addEventListener('click', deleteCreatedTaskItem);
cardContainer.addEventListener('click', cardClickEvents);
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
      <p class="card__paragraph-btns"><input class="card__footer--images card__footer--urgent" type="image" alt="Card urgent button"
        src="images/urgent.svg">URGENT</p>
      <p class="card__paragraph-btns"><input class="card__footer--images card__footer--delete" id="card__delete--btn" type="image"  alt="Card delete button"
      src="images/delete.svg"}>DELETE</p>
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

function deleteCard(e) {
  if (e.target.classList.contains("card__footer--delete" )) {
    let filterCondition = 
    e.target.closest("article").remove();
    var locatedIndex = locateIndex(e);
    var locatedId = locateId(e);
    globalArray[locatedIndex].deleteFromStorage(locatedId,globalArray);
    clearDisplayMessage();
  }
}


// locate the card,
// drill down to task checked property
// check for true 
// filter true
// return array minus true values 
// conditional 
// delete from dom 
// update global array 
// save to storage.



/****  Validation functions ********/

function validateInputs(button, input) {
  button.disabled = input.value ? false : true;
}

/*** Locate functions *****/

function locateId(e) {
  var parent = e.target.closest('article');
  var parentId = parseInt(parent.dataset.id);
  return parentId;
}

function locatedTask(e) {
  var divId = e.target.closest('.card__div--task')
  var taskId = divId.dataset.id
    return taskId;
}

function locateIndex(e) {
  var parent = e.target.closest('article');
  var parentId = parseInt(parent.dataset.id);
  var locatedIndex = globalArray.findIndex(function(list) {
    return list.id === parentId;
  });
  return locatedIndex;
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

function  makeListItems(e,checked) {
  e.preventDefault();
  var tempArray = []
  var allTaskOutputs = document.querySelectorAll('.nav__div--task-item');
  for (var i = 0; i < allTaskOutputs.length; i++) {
    var taskObject = {
      id: `1${[i]}`,
      content: allTaskOutputs[i].innerText,
      checked: checked || false
    }
    tempArray.push(taskObject)
  }
  createListObject(tempArray);
};

function taskAppendLoop(obj) {
  var string = ""
  for (var i = 0; i < obj.task.length; i++) {
    string += `<div class="card__div--task" data-id=${
      obj.task[i].id
    }><input class="card__img--task" data-id=${
      obj.task[i].id
      } type="image" src=${obj.task[i].checked ? 'images/checkbox-active.svg':'images/checkbox.svg'}><p class="card__paragraph--text">${
      obj.task[i].content
    }</p></input></div>`;
  }
  return string
};

function findTaskItem(e) {
  const locatedCardId = locateId(e);
  const cardList = globalArray.find(list => list.id === locatedCardId);
  const locatedTaskId = locatedTask(e);
  const taskItem =  cardList.task.find(task => task.id === locatedTaskId);
  taskItem.checked = !taskItem.checked
  checkTask(taskItem, e);
  cardList.saveToStorage(globalArray)
}

/****** Card List functions ****/

// function createListObject(task) {
//   if (titleInput.value && navTaskContainer.innerText) {
//     var list = new ToDoList(Date.now(),titleInput.value, false, task);
//     globalArray.push(list);
//     list.saveToStorage(globalArray);
//     navTaskContainer.innerHTML = null;
//     appendListCard(list);
//     clearDisplayMessage();
//     clearFormInput(navFormInputs);
//   }
//   return list 
// };


function createListObject(task) {
  if (titleInput.value && navTaskContainer.innerText) {
    var list = new ToDoList(Date.now(), titleInput.value, false, task);  
    helperCreateList(list)
  }
};

function helperCreateList(list) {
  globalArray.push(list);
  list.saveToStorage(globalArray);
  navTaskContainer.innerHTML = null;
  appendListCard(list);
  clearDisplayMessage();
  clearFormInput(navFormInputs);
}

function reloadToDoList() {
  if (globalArray.length !== 0) {
    const newArray = globalArray.map(listObj => {
      const newList = new ToDoList(listObj.id,listObj.title, listObj.urgent, listObj.task);
      return newList;
    });
    globalArray = newArray;
  }
}

function reloadPageDom() {
  if (globalArray.length !== 0) {
    globalArray.forEach(function (item) {
      appendListCard(item);
      clearDisplayMessage();
    })
  }
}

//locateID to find card to mark Urgent on dom based on urgent value 
function markAsUrgent(e) {
  if (e.target.classList.contains('card__footer--urgent')) {
  var locatedIndex = locateIndex(e);
    globalArray[locatedIndex].urgent = !globalArray[locatedIndex].urgent 
    localStorage[locatedIndex].updateTask(globalArray)
  if(globalArray[locatedIndex].urgent === true) {
    e.target.setAttribute('src', 'images/urgent-active.svg');
    e.target.closest('article').style.background='#ffe89d'
  }else {
    e.target.setAttribute('src', 'images/urgent.svg');
    e.target.closest('article').style.background ='#ffffff'
    }
  }  
}

function checkTask(task, e) {
    if (task.checked) {
      e.target.setAttribute('src', 'images/checkbox-active.svg')
      // e.target.classList.closest('delete-item')
      console.log('chould be tru', task.checked)
    } else {

      e.target.setAttribute('src', 'images/checkbox.svg')
      console.log("chould be false", task.checked);
    }
  }

/**** Event Helpers *******/

function cardClickEvents(e) {
  deleteCard(e);
  markAsUrgent(e);
  findTaskItem(e);
}

function loadConditions() {
  reloadPageDom();
  reloadToDoList();
}


// do masonary layout ,
//*** */ fix card mobile layout , 
//card main flex column.
// check == true or false,x
// add property to x
// persist task urgent and task 
// pass global array through to methods  
//remove delete from top input after everything 