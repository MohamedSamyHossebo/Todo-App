const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoListUl = document.getElementById('todo-list');

let allTodos = getTodos();
updateTodoList();


todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();
});

function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText.length > 0) {
        const todoObj={
            text: todoText,
            completed: false
        }
        allTodos.push(todoObj);
        updateTodoList();
        todoInput.value = '';
        saveTodo();
    }
}
function createTodoItem(todo, todoIndex) {
    const todoId = "todo-" + todoIndex;
    const todoLi = document.createElement("li");
    const todoText=todo.text;
    todoLi.className = 'todo';
    todoLi.innerHTML = `
     <input type="checkbox" id="${todoId}" />
          <label for="${todoId}" class="custom-checkbox">
            <svg
              class="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 11.917 9.724 16.5 19 7.5"
              />
            </svg>
          </label>
          <label for="${todoId}" class="todo-text">
          ${todoText}
          </label>
          <button class="delete-button">
            <svg fill="var(--secondary-color)" class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round"
                stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
            </svg>
          </button>
    `
    const deleteBtn=todoLi.querySelector('.delete-button');
    deleteBtn.addEventListener('click',function(){
        deleteTodoItem(todoIndex);
    })
    const checkBox=todoLi.querySelector('input');
    checkBox.addEventListener('change',()=>{
        allTodos[todoIndex].completed= checkBox.checked;
        saveTodo();
    })
    checkBox.checked=todo.completed;
    return todoLi;
}
function deleteTodoItem(todoIndex){
    allTodos=allTodos.filter((_,i)=>i !==todoIndex);
    saveTodo();
    updateTodoList();
}
function updateTodoList() {
    todoListUl.innerHTML = "";
    allTodos.forEach((todo, todoIndex) => {
        const todoItem = createTodoItem(todo, todoIndex);
        todoListUl.append(todoItem);
    });
}

const saveTodo = () => {
    const todoJson = JSON.stringify(allTodos);
    localStorage.setItem('todos', todoJson);
};

function getTodos() {
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}