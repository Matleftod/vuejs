import { createStore } from 'vuex';

const store = createStore({
  state: {
    todos: [],
    users: [
        { id: 1, name: 'Adrien' },
        { id: 2, name: 'Théo' },
        { id: 3, name: 'Michelle' },
        { id: 4, name: 'Julie' },
    ],
    filter: 'all',
    nextTodoId: 1,
  },
  mutations: {
    ADD_TODO(state, todo) {
      const newTodo = { ...todo, id: state.nextTodoId, selected: false };
      state.todos.push(newTodo);
      state.nextTodoId++;
    },
    UPDATE_TODO(state, updatedTodo) {
        const index = state.todos.findIndex((todo) => todo.id === updatedTodo.id);
        if (index !== -1) {
          state.todos[index] = updatedTodo;
        }
    },
    DELETE_TODO(state, todoId) {
      state.todos = state.todos.filter((todo) => todo.id !== todoId);
    },
    TOGGLE_SELECTED(state, todo) {
      const index = state.todos.findIndex((t) => t.id === todo.id);
      if (index !== -1) {
        state.todos[index].selected = !state.todos[index].selected;
      }
    },
    SET_FILTER(state, filter) {
      state.filter = filter;
    },
  },
  actions: {
    addTodo({ commit }, todo) {
      commit('ADD_TODO', todo);
    },
    editTodo({ commit }, updatedTodo) {
        commit('UPDATE_TODO', updatedTodo);
    },
    deleteTodo({ commit }, todoId) {
      commit('DELETE_TODO', todoId);
    },
    toggleSelected({ commit }, todo) {
      commit('TOGGLE_SELECTED', todo);
    },
    setFilter({ commit }, filter) {
      commit('SET_FILTER', filter);
    },
  },
  getters: {
    todosCount: (state) => {
      return state.todos.length;
    },
    selectedTodosCount: (state) => {
      return state.todos.filter((todo) => todo.selected).length;
    },
    filteredTodos: (state) => {
      switch (state.filter) {
        case 'all':
          return state.todos;
        case 'selected':
          return state.todos.filter((todo) => todo.selected);
        case 'notSelected':
          return state.todos.filter((todo) => !todo.selected);
      }
    },
    tasksByUser: (state) => (userId) => {
      return state.todos.filter((todo) => todo.responsible === userId);
    },
    taskHoursByUser: (state, getters) => (userId) => {
      const userTasks = getters.tasksByUser(userId);
      return userTasks.reduce((sum, task) => sum + parseFloat(task.estimatedHours), 0);
    },
  },
});

export default store;