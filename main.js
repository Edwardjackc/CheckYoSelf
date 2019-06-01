let cardTitle = document.querySelector('#nav__input--title');
let cardTask = document.querySelector('#nav__input--task');
let btnMakeList = document.querySelector('#nav__input--btn-submit-task');
let btnClearAll = document.querySelector('#nav__input--btn-clear');
let cardContainer = document.querySelector('#card__main--container');

btnMakeList.addEventListener('click', appendCard);
btnClearAll.addEventListener('click', taskList);
deleteItem.addEventListener('click', deleteAnItem)
this.addEventListener('load', pageReloadConditions);

var globalArray = JSON.parse(localStorage.getItem('savedListArr')) || [];

function makeList() {
  var list = new ToDoList(Date.now(), cardTitle.value, false, taskArray);
    globalArray.push(list)
    list.saveToStorage(globalArray)
    appendCard(list)
}

function validateInputs(button, input) {
  button.disabled = input.length > 0 ? false : true;
}

function appendCard(obj) {
  cardContainer.innerHTML =
    `<article class="card__article--container">
      <header class="card__header">
        <h3 class="card__h3--title">${obj.title}</h3>
      </header>
      <section class="card__section--main">
        <p class="card__paragraph">Fam pug williamsburg PBR&B
        </p>
      </section>
      <footer class="card__footer">
      <input class="card__footer--images card__footer--urgent" type="image" alt="Card urgent button"
        src=${
        item.urgent === true
        ? "images/urgent-active.svg"
        : "images/urgent.svg"}>
      <input class="card__footer--images card__footer--delete" type="image" alt="Card delete button"
      src="images/delete.svg">
      </footer>
    </article>` + cardContainer.innerHTML;
}