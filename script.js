// array of todolist with methods that control array
var todoList = {
  todos: [],
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false,
    });
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;

    // Changed for loops to foreach
    this.todos.forEach(function(todo) {
      if(todo.completed === true){
        completedTodos++;
      }
    });

    this.todos.forEach(function(todo) {
      // Case 1: if everythings true, make everything false
      if(completedTodos === totalTodos){
        todo.completed = false;
      // Case 2: else everything is true
      } else {
        todo.completed = true;
      }
    });
  }
};

// handlers is for methods in this object to handle different events
var handlers = {
  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  },
  changeTodo: function() {
    var changeTodoPositionInput = document.getElementById(
      'changeTodoPositionInput'
    );
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');

    todoList.changeTodo(
      changeTodoPositionInput.valueAsNumber,
      changeTodoTextInput.value
    );

    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
    view.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function() {
    var toggleCompletedPositionInput = document.getElementById(
      'toggleCompletedPositionInput'
    );
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = '';
    view.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  }
};

// just object for showing todolist
var view = {
  displayTodos: function() {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
        
    // this - refers to rhe view object
    // forEach(callback function, this)
    todoList.todos.forEach(function(todo, position){

      var todoLi = document.createElement('li');
      var todoTextWithCompletion = '';

      if(todo.completed === true){
        todoTextWithCompletion =  '(x) ' + todo.todoText;
      } else {
        todoTextWithCompletion =  '( ) ' + todo.todoText;
      }
      // Sets each li so it should have an id that has the todo position
       todoLi.id = position;
// /* Setting the text of the li elements with todo list array*/     
      todoLi.textContent = todoTextWithCompletion;
      //Adds delete button to each items in list
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);
    
    }, this); // added this here to refer back to view object
  },
// A way to create delete buttons
  createDeleteButton: function(){
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  setUpEventListeners : function(){
    var todosUl = document.querySelector('ul');

    // instead of adding events to every li we add it to enclosing ul
    // Event delegation
    todosUl.addEventListener('click', function(event){
    // Delete buttons should have access to the todo id
    console.log(event.target.parentNode.id);

    // get element that was clicked on
    var elementClicked = event.target;
    // checkif element is a delete button
    if(elementClicked.className === 'deleteButton'){
      // run handlers.deleteTodo(position)
      // need to convert from string to int
      handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
    }
    });
  }
};

// sets up event listeners function
view.setUpEventListeners();
