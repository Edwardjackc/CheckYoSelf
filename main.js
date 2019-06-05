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
navTaskContainer.addEventListener("click", deleteCreatedTaskItem);
this.addEventListener("load", loadConditions)


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



function clearDisplayMessage(e) {
  e.preventDefault()
  var hiddenMessage = document.querySelector("#main__label--message");
  if (bottomContainer.contains(hiddenMessage)) {
    bottomContainer.removeChild(hidden);
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

// function runListCreationLoop() {
//   validateInputs(btnMakeList, titleInput)
//   appendListCard();
//   clearFormInput(navFormInputs);
// }

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

// function taskAppendLoop(array) {
//   // var task= array.obj.task
//   var string = ""
//   for (var i = 0; i < array.length; i++) {
//     string += `<input class="card__img--task" type="image" src="images/checkbox.svg"><p class="card__paragraph--text">${
//       obj.task[i].content
//     }</p></input>`;
//   }
//   return string
// };

function taskAppendLoop(obj) {
  var string = ""
  for (var i = 0; i < obj.task.length; i++) {
    string += `<input class="card__img--task" type="image" src="images/checkbox.svg"><p class="card__paragraph--text">${
      obj.task[i].content
      }</p></input>`;
  }
  return string
};

/******Card List functions** */
function createListObject(task) {
  console.log('hi',task)
  if (titleInput.value && navTaskContainer.innerText) {
    var list = new ToDoList(Date.now(),titleInput.value, false, task);
    console.log('list', list)

    globalArray.push(list);
    list.saveToStorage(globalArray);
    navTaskContainer.innerHTML = null;
    appendListCard(list);
    clearFormInput(navFormInputs);
  }
  return list 
};

// function createListObject() {
//   var list = new ToDoList({
//     id: Date.now(),
//     title: titleInput.value,
//     urgent: false,
//     task:task
//   });

//   globalArray.push(list);
//   list.saveToStorage(globalArray);
//   navTaskContainer.innerHTML = null;
//   appendListCard(list);
//   clearFormInput(navFormInputs);
// }

function reloadToDoList() {
  debugger;
  console.log('global array', globalArray)
  if (globalArray.length !== 0) {
    const newArray = globalArray.map(listObj => {
      const newList = new ToDoList(listObj.id,listObj.title, false, listObj.task);
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
    })
  }
}

function locateIndex(e) {
  var parent = e.target.closest('article');
  var parentId = parseInt(parent.dataset.id);
  var locatedIndex = globalArray.findIndex(function (list) {
    return list.id === parentId
  })
  return locatedIndex
};


function deleteCard(e) {
  if (e.target.classList.contains("card__delete--btn")) {
    e.target.closest('article').remove();
    // var locatedId = locateId(e);
    // globalArray[locatedId].deleteFromStorage(locatedId);
  }
}
// map items and append to card
// function based on dom interations that returns an array of the adjusted items then pushes to
// storage 


// Goals, exceptional Comp, JS, HTML, CSS, and advance beginner func 
//Monday --- card appending with correct style of items
// --------- card persisting 
// --------- 