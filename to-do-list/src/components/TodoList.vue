<template>
    <div>
      <todo-item
        v-for="todo in filteredTodos"
        :key="todo.id"
        :todo="todo"
        @toggleSelected="toggleSelected(todo)"
        @delete="deleteTodo(todo.id)"
        @edit="editTodo"
      ></todo-item>
    </div>
</template>  
<script>
import TodoItem from './TodoItem.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    TodoItem,
  },
  computed: {
    ...mapGetters(['filteredTodos']),
  },
  methods: {
    ...mapActions(['deleteTodo', 'editTodo']),
    toggleSelected(todo) {
      this.$store.dispatch('toggleSelected', todo);
    },
  },
};
</script>  