<template>
    <div>
      <button @click="setFilter('all')">Toutes</button>
      <button @click="setFilter('selected')">Sélectionnées</button>
      <button @click="setFilter('notSelected')">Non sélectionnées</button>
      <p>Nombre total de todos : {{ todosCount }}</p>
      <p>Nombre de todos sélectionnées : {{ selectedTodosCount }}</p>
    </div>
  </template>
  
  <script>
  import { mapActions, mapGetters } from 'vuex';
  
  export default {
    computed: {
      ...mapGetters(['todosCount', 'selectedTodosCount']),
    },
    methods: {
      ...mapActions(['setFilter']),
    },
  };
  </script>
  