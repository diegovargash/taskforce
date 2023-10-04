const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

function addTodo(event) {
    event.preventDefault();

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);

    const todoObject = { text: todoInput.value, completed: false };
    saveLocalTodos(todoObject);

    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function () {
            todo.remove();
        });
    }

    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
        
        const todoText = todo.querySelector(".todo-item").innerText;
        updateLocalState(todoText, todo.classList.contains("completed"));
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo, index) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function (todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        const newTodo = document.createElement("li");
        newTodo.innerText = todo.text;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        if (todo.completed) {
            todoDiv.classList.add("completed");
        }

        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);
    });
}

function updateLocalState(todoText, completed) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todos.findIndex((todo) => todo.text === todoText);
    if (todoIndex !== -1) {
        todos[todoIndex].completed = completed;
        localStorage.setItem("todos", JSON.stringify(todos));
    }
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.findIndex((todo) => todo.text === todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
