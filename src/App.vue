<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import 'bootstrap/dist/css/bootstrap.css'
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #A71C85;">
  <div class="container-fluid">
    
    <RouterLink class="navbar-brand ms-4" to="/">Squadbuilder</RouterLink>

  </div>
</nav>

  </header>


  <RouterView />
</template>

<style>

body {
  background-image: url('static/maxresdefault.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  margin: 0;
}

header {
padding: 0;
}




</style>
