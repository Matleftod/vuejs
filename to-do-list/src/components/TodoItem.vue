<template>
    <div>
      <input type="checkbox" :checked="todo.selected" @change="$emit('toggle-selected', todo)" />      
      <span>{{ todo.title }}</span>
      <span>{{ todo.estimatedHours }} heures</span>
      <span>{{ responsibleName }}</span>
      <button @click="$emit('edit', todo)">Éditer</button>
      <button @click="$emit('delete', todo)">Supprimer</button>
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
    computed: {
      ...mapState(['users']),
      responsibleName() {
        const responsible = this.users.find(user => user.id === this.todo.responsible);
        return responsible ? responsible.name : '';
      },
    },
  };
  </script>  