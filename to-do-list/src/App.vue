<template>
  <div id="app">
    <todo-form></todo-form>
    <todo-filters></todo-filters>
    <todo-list></todo-list>
  </div>
</template>

<script>
import TodoForm from './components/TodoForm.vue';
import TodoFilters from './components/TodoFilters.vue';
import TodoList from './components/TodoList.vue';

export default {
  components: {
    TodoForm,
    TodoFilters,
    TodoList,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
