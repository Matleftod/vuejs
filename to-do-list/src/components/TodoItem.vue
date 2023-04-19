<template>
  <div>
    <div v-if="isEditing">
      <input v-model="localTodo.title" @keyup.enter="saveChanges" placeholder="Title" />
      <input type="number" v-model="localTodo.estimatedHours" @keyup.enter="saveChanges" placeholder="Estimated hours" />
      <select v-model="localTodo.responsible">
        <option v-for="user in users" :key="user.id" :value="user.id">
          {{ user.name }}
        </option>
      </select>
      <button @click="saveChanges">Save</button>
      <button @click="cancelEditing">Cancel</button>
    </div>
    <div v-else>
      <input type="checkbox" :checked="localTodo.selected" @change="$emit('toggle-selected', localTodo)" />
      <span>{{ localTodo.title }}</span>
      <span>{{ localTodo.estimatedHours }} heures</span>
      <span>{{ responsibleName }}</span>
      <button @click="startEditing">Edit</button>
      <button @click="$emit('delete', todo)">Delete</button>
    </div>
  </div>
</template>
  
<script>
import { mapState } from 'vuex';
  
export default {
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isEditing: false,
      localTodo: { ...this.todo },
    };
  },
  computed: {
    ...mapState(['users']),
    responsibleName() {
      const responsible = this.users.find(user => user.id === this.todo.responsible);
      return responsible ? responsible.name : '';
    },
  },
  methods: {
    startEditing() {
      this.isEditing = true;
      this.localTodo = { ...this.todo };
    },
    saveChanges() {
      this.$emit('edit', this.localTodo);
      this.isEditing = false;
    },
    cancelEditing() {
      this.isEditing = false;
    },
  },
};
</script>  