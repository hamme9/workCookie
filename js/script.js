'use strict';

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');
const todoRemove = document.querySelector('.todo-remove');

const toDoData = [];

let list;


let todoLocalStorage;

function start() {
    if (localStorage.getItem('toDoList')) {
        todoLocalStorage = JSON.parse(localStorage.getItem('toDoList'));
        todoLocalStorage.forEach(function(item) {
            toDoData.push(item);
        });
        render();
    }     
}

const render = function() {
    todoList.innerHTML = '';
    todoCompleted.innerHTML = '';

    toDoData.forEach(function(item, index) {
        list = document.createElement('li');


        list.classList.add('todo-item');

        list.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
        '<div class="todo-buttons">' +
        '<button class="todo-remove"></button>' +
        '<button class="todo-complete"></button>' +
        '</div>';

        if(item.completed) {
            todoCompleted.append(list);
        } else {
            todoList.append(list);
        }

        list.querySelector('.todo-complete').addEventListener('click', function(){
            completed(item);
        });
        list.querySelector('.todo-remove').addEventListener('click', function() {
            delList(index);
        });
    });
    localStorage.setItem('toDoList', JSON.stringify(toDoData));
};

const delList = function(index) {
        toDoData.splice(index, 1);
        render();
};

const completed = function(item) {
    item.completed = true;
    render();
};

todoControl.addEventListener('submit', function(e){
    e.preventDefault();
    if (headerInput.value === '') {
        headerInput.placeholder = 'Вы забыли рассказать нас о своих планах!!!';

    } else {
        headerInput.placeholder = 'Какие планы?';
        const newToDo = {
            text: headerInput.value,
            completed: false
        };
    
        toDoData.push(newToDo);
        headerInput.value = '';

        localStorage.setItem('toDoList', JSON.stringify(toDoData));

        render();
    }
});

start();