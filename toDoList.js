class ToDoList{
  constructor(id,title,urgent,task) {
    this.id =id,
    this.title = title;
    this.urgent = urgent || false;
    this.task = task || []
  }

  saveToStorage() {
    var stringedTasks = JSON.stringify(globalArray);
    localStorage.setItem('savedListArr', stringedTasks);
  }

  deleteFromStorage(locatedId) {
    var newGlobalArray = globalArray.filter(function (list) {
      return list.id !== locatedId;
    });
    globalArray = newGlobalArray;
    var stringified = JSON.stringify(globalArray);
    localStorage.setItem("savedListArr", stringified);
  }

  updateToDo() {

  }

  updateTask() {

  }
}