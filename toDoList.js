class ToDoList {
  constructor(id, title, urgent, task) {
    this.id = id; 
    this.title = title;
    this.urgent = urgent || false;
    this.task = task || []
  }

saveToStorage(globalArr) {
  var stringedTasks = JSON.stringify(globalArr);
  localStorage.setItem(
  'savedListArr', stringedTasks);
}

deleteFromStorage(itemIndex,globalArr) {
  console.log('hi')
  globalArr.splice(itemIndex, 1);
  this.saveToStorage(globalArr)
}

updateTask(globalArr) {
  debugger;
  this.urgent = !this.urgent 
  this.saveToStorage(globalArr)
  }
}