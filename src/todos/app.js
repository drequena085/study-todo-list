import todoStore, { Filters } from '../store/todo.store';
import { renderTodos, renderPendientes } from '../use-cases/';
import html from './app.html?raw';

const ElementIDs = {
    TodoList: '.todo-list',
    NewToDoInput: '#new-todo-input',
    BotonesFilter: '.filtro',
    ClearCompleted: '.clear-completed',
    Pendientes: '#pending-count'
}
/**
 * 
 * @param {string} elementId 
 */
export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementIDs.TodoList, todos)
        updatePendientes();
    }
    const updatePendientes = () => {
        renderPendientes(ElementIDs.Pendientes);
    }
    //Cuando la función App() se llama
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html
        document.querySelector(elementId).append(app);
        todoStore.initStore();
        displayTodos();
    })();

    //Referencias HTMl
    const newDescriptionInput = document.querySelector(ElementIDs.NewToDoInput);
    const todoListUl = document.querySelector(ElementIDs.TodoList);
    const botonesFilter = document.querySelectorAll(ElementIDs.BotonesFilter);
    const clearCompleted = document.querySelector(ElementIDs.ClearCompleted);
    
    //Listeners
    newDescriptionInput.addEventListener('keyup', (event) => {
        if (event.keyCode !== 13 || event.target.value.trim().length == 0) return;
        todoStore.addTodo(event.target.value);
        displayTodos();
        event.target.value = '';
    });
    //CHEQUEAR O ELIMINAR
    todoListUl.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]');
        if (event.target.className === 'destroy') {
            todoStore.deletTodo(element.getAttribute('data-id'));
            displayTodos();
        } else {
            todoStore.toggleTodo(element.getAttribute('data-id'));
            displayTodos();
        }
    });
    //ELIMINAR COMPLETADOS
    clearCompleted.addEventListener('click', (event) => {
        todoStore.deleteCompleted();
        displayTodos();
    });
    //APLICAR FILTRO
    const opciones = {Todos: Filters.All, Pendientes: Filters.Pending,  Completados: Filters.Completed};
    botonesFilter.forEach(element => {
        element.addEventListener('click', (event) => {
            botonesFilter.forEach( el => el.classList.remove('selected'));
            event.target.classList.add('selected');
            todoStore.setFilter(opciones[event.target.innerText]);
            displayTodos();
        });
    });
}