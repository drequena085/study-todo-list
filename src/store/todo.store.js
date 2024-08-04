import { Todo } from "../todos/models/todo.model";

export const Filters = {
  All: "all",
  Completed: "completed",
  Pending: "pending",
};

const state = {
  todos: [
    new Todo("Piedra del alma"),
    new Todo("Piedra del infinito"),
    new Todo("Piedra del tiempo"),
    new Todo("Piedra del Poder"),
    new Todo("Piedra del Realidad"),
  ],
  filter: Filters.All,
};

const initStore = () => {
  loadStore();
};

const getTodos = (filter = Filters.All) => {
  switch (filter) {
    case Filters.All:
      return [...state.todos];
    case Filters.Completed:
      return state.todos.filter((x) => x.done);
    case Filters.Pending:
      return state.todos.filter((x) => !x.done);
    default:
        throw new Error(`Option ${filter} is not valid`);  
  }
};

const loadStore = () => {
  const existe = localStorage.getItem('state');
  if (existe) {
    const {todos = [], filter = Filters.All} = JSON.parse(existe);
    state.todos = todos;
    state.filter = filter;
  }
};

const sesionStorage = () => {
  localStorage.setItem('state', JSON.stringify(state));
}

/**
 *
 * @param {string} description
 */
const addTodo = (description) => {
  if(!description) throw new Error("description is required");
  state.todos.push(new Todo(description));
  sesionStorage();
};

/**
 *
 * @param {string} todoId
 */
const deletTodo = (todoId) => {
  state.todos = state.todos.filter(x => x.id !== todoId);
  sesionStorage();
};

const toggleTodo = (todoId) => {
  state.todos = state.todos.map( s => {
    if (s.id === todoId) {
        s.done = !s.done;
    }
    return s;
  });
  sesionStorage();
};

const deleteCompleted = () => {
    state.todos = state.todos.filter(x => !x.done);
    sesionStorage();
};

/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = (newFilter = Filters.All) => {
  state.filter = newFilter;
  sesionStorage();
};

const getCurrentFilter = () => {
  return state.filter;
};

export default {
  initStore,
  loadStore,
  addTodo,
  deletTodo,
  toggleTodo,
  deleteCompleted,
  setFilter,
  getTodos,
  getCurrentFilter,
  sesionStorage
};
