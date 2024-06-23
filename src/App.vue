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
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-link btn btn-secondary" href="/teams">Teams</a>
      </div>
    </div>
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
  line-height: 1.5;
  max-height: 100vh;
}



nav {
  width: 100%;
  font-size: 12px;
  padding-bottom: 1rem;

}





@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
