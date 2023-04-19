<template>
    <div>
      <!-- Formulaire d'ajout et d'édition des todos -->
      <form @submit.prevent="submitTodo">
        <input v-model="todo.title" placeholder="Titre" />
        <input v-model="todo.estimatedHours" placeholder="Heures estimées" />
        <select v-model="todo.responsible">
          <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
        </select>
        <button type="submit">Ajouter/Éditer</button>
      </form>
      <!-- Message d'erreur -->
      <p v-if="error">{{ error }}</p>
    </div>
  </template>
  
  <script>
  import { mapActions, mapState } from 'vuex';
  
  export default {
    data() {
      return {
        todo: {
          title: '',
          estimatedHours: '',
          responsible: '',
        },
        error: null,
      };
    },
    computed: {
      ...mapState(['users']),
    },
    methods: {
        ...mapActions(['addTodo', 'updateTodo']),
        submitTodo() {
            this.error = null;
            
            // Valider les champs
            if (!this.todo.title || !this.todo.estimatedHours || !this.todo.responsible) {
            this.error = "Tous les champs sont obligatoires.";
            return;
            }
            
            // Valider le nombre d'heures
            if (isNaN(this.todo.estimatedHours)) {
            this.error = "Le nombre d'heures doit être un nombre.";
            return;
            }

            // Vérifier le nombre de tâches et les heures pour le responsable
            const userTasks = this.$store.getters.tasksByUser(this.todo.responsible);
            const userTaskHours = this.$store.getters.taskHoursByUser(this.todo.responsible);
            if (userTasks.length >= 3 || (userTaskHours + parseFloat(this.todo.estimatedHours) > 10)) {
            this.error = "Le responsable ne peut pas avoir plus de 3 tâches ou plus de 10 heures de travail.";
            return;
            }

            // Ajouter ou mettre à jour la tâche
            if (this.todo.id) {
            this.updateTodo(this.todo);
            } else {
            this.addTodo(this.todo);
            }

            // Réinitialiser le formulaire
            this.todo = {
            title: '',
            estimatedHours: '',
            responsible: '',
            };
        },
    },
  };
  </script>  