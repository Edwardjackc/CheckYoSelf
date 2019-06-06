let titleInput = document.querySelector('#nav__input--title');
let taskInput = document.querySelector('#nav__input--task');
let btnAppendTask = document.querySelector('#nav__btn--task-append');
let btnMakeList = document.querySelector('#nav__btn--list-append');
let btnClearAll = document.querySelector('#nav__btn-clear');
let cardContainer = document.querySelector('#card__main--container');
let navTaskContainer = document.querySelector('#nav__container--tasks');
let navFormInputs = document.querySelector('#nav__form--top');
let btnDeleteCard = document.querySelector('#card__delete--btn');

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
    `<article class=${
      list.urgent
        ? "card__article--container--active"
        : "card__article--container"
    } data-id=${list.id}>
      <header class="card__header">
        <h3 class="card__h3--title">${list.title}</h3>
      </header>
      <section class="card__section--main">
        <p class="card__paragraph">${taskAppendLoop(list)}
        </p>
      </section>
      <footer class="card__footer">
      <p class="card__paragraph-btns"><input class="card__footer--images card__footer--urgent" type="image" alt="Card urgent button"
        src= ${
          list.urgent ? "images/urgent-active.svg" : "images/urgent.svg"
        }>URGENT</p>
      <p class="card__paragraph-btns"><input class="card__footer--images card__footer--delete" id="card__delete--btn" disabled="true" type="image"  alt="Card delete button"
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

// function deleteCard(e) {
//   if (e.target.classList.contains("card__footer--delete" )) {
//     debugger;
//     const foundCard = locateCard(e)
//     const foundCardArr = foundCard.task
//     filterCondition = foundCardArr.filter(task => task.checked === true)
//     filterCondition === foundCardArr.length ?
//     btnDeleteCard.disabled = false 
//     : btnDeleteCard.disabled = true;
//     e.target.closest("article").remove();
//     const locatedIndex = locateIndex(e);
//     foundCard.deleteFromStorage(locatedIndex,globalArray);
//     clearDisplayMessage();
//   }
// }

function deleteCard(e) {
  if (e.target.classList.contains('card__img--task')) {
  const foundCard = locateCard(e)
  const foundCardArr = foundCard.task
  console.log('array', foundCardArr)
  const filterConditionArray = foundCardArr.filter(task => task.checked === true)
  if (filterConditionArray.length === foundCardArr.length) {
    deleteCardBtnToggle(e);
    }
  }
}

function deleteCardfromStorage(e) { 
  const locatedIndex = locateIndex(e);
  foundCard.deleteFromStorage(locatedIndex, globalArray);
}

function deleteCardBtnToggle(e)  {
  var targetBtn = e.target.classList.contains('card__footer--delete')
  targetBtn ? (targetBtn.disabled = false) : (targetBtn.disabled = true);
  }


function deleteCardFromDom(e) {
    console.log(e)
  if (e.target.classList.contains('card__footer--delete')) {
    e.target.closest("article").remove();
    const locatedIndex = locateIndex(e);
    foundCard.deleteFromStorage(locatedIndex, globalArray);
    clearDisplayMessage();
  }
}

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

function locateCard(e) {
  debugger;
  const listId = locateId(e)
  const returnListObj =globalArray.find(list => list.id === listId)
  return returnListObj
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
  if (e.target.classList.contains('card__img--task')) {
    const locatedCardId = locateId(e);
    const cardList = globalArray.find(list => list.id === locatedCardId);
    const locatedTaskId = locatedTask(e);
    const taskItem =  cardList.task.find(task => task.id === locatedTaskId);
    taskItem.checked = !taskItem.checked
    checkTask(taskItem, e);
    cardList.saveToStorage(globalArray)
  }
}
/****** Card List functions ****/


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
// two differnt classes , uses ternary to swap between in card append based on urgent or not
//locateID to find card to mark Urgent on dom based on urgent value 
function markAsUrgent(e) {
  if (e.target.classList.contains('card__footer--urgent')) {
    const locatedCard = locateCard(e)
    locatedCard.updateTask(globalArray)
  if (locatedCard.urgent === true) {
    e.target.setAttribute('src', 'images/urgent-active.svg');
    e.target.closest('article').style.background='#ffe89d'
  } else {
    e.target.setAttribute('src', 'images/urgent.svg');
    e.target.closest('article').style.background ='#ffffff'
    }
  }  
}

function checkTask(task, e) {
    if (task.checked) {
      e.target.setAttribute('src', 'images/checkbox-active.svg')
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
//*** */ fix card mobile layout, x 
//card main flex column,  x
// check == true or false, x
// persist task urgent and task, x 
// pass global array through to methods, x
//remove delete from top input after everything, 