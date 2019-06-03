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

// this.addEventListener("load", instantiateIdeas)


var globalArray = JSON.parse(localStorage.getItem('savedListArr')) || [];

function appendListCard(listObj) {
  cardContainer.innerHTML =
    `<article class="card__article--container">
      <header class="card__header">
        <h3 class="card__h3--title">${listObj.title}</h3>
      </header>
      <section class="card__section--main">
        <p class="card__paragraph">${taskAppendLoop(listObj)}
        </p>
      </section>
      <footer class="card__footer">
      <input class="card__footer--images card__footer--urgent" type="image" alt="Card urgent button"
        src=${
          listObj.urgent === true
            ? "images/urgent-active.svg"
            : "images/urgent.svg"
        }>
      <input class="card__footer--images card__footer--delete" type="image" alt="Card delete button"
      src="images/delete.svg">
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

function deleteCreatedTaskItem(e) {
  e.preventDefault()
  if( e.target.closest('#nav__input--task-delete')) {
    e.target.closest('section').remove();
  }
}
/****  Validation functions */
function validateInputs(button, input) {
  button.disabled = input.value ? false : true;
}

/*** Clear Functions  */
function clearFormInput(form) {
  form.reset()
}

function clearInputs() {
  clearFormInput(navFormInputs)
}

// function hiddenMessage() {
//   if (cardContainer.innerHTML = false) {

//   }
// }

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


/***Item functions *****/

function  makeListItems(e) {
  e.preventDefault();
  var tempArray = []
  var allTaskOutputs = document.querySelectorAll('.nav__div--task-item');
  for (var i = 0; i < allTaskOutputs.length; i++) {
    var taskObject = {
      id: Date.now(),
      content: allTaskOutputs[i].innerText
    }
    tempArray.push(taskObject)
  }
  createListObject(tempArray);
};

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
  if (titleInput.value && navTaskContainer.innerText) {
    var list = new ToDoList(Date.now(), titleInput.value, false, task);
    globalArray.push(list);
    list.saveToStorage(globalArray);
    navTaskContainer.innerHTML = "";
    appendListCard(list);
    clearFormInput(navFormInputs);
  }
};

// function instantiateIdeas() {
//   if (globalArray.length !== 0) {
//     const newArray = globalArray.map(ideaObj => {
//       const newList = new ToDoList({ ...ideaObj });
//       return newList;
//     });
//     globalArray = newArray;
//     appendListCard(globalArray)
//   }
// }


// map items and append to card
// function based on dom interations that returns an array of the adjusted items then pushes to
// storage 


// Goals, exceptional Comp, JS, HTML, CSS, and advance beginner func 
//Monday --- card appending with correct style of items
// --------- card persisting 
// --------- 