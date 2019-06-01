class toDoList{
  constructor(id,title,urgent,task) {
    this.id = id;
    this.title = title;
    this.urgent = urgent || false;
    this.task = task || []
  }

//pass global array as a parameter 
  saveToStorage() {
    var stringedTasks = JSON.stringify(globalArray);
    localStorage.setItem('savedListArr', stringedTasks);
  }

  deleteFromStorage () {

  }

  updateToDo() {

  }

  updateTask() {

  }
}