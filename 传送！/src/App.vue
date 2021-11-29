<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import LXInfoModVue from './components/LXInfoMod.vue';
import LXActionModVue from './components/LXActionMod.vue';
</script>

<template>
    <!-- <HelloWorld msg="Hello Vue 3 + Vite" /> -->
      <LXInfoModVue></LXInfoModVue>
      <LXActionModVue></LXActionModVue> 
</template>

<style>
html {
font-size:10.24px;
}
#app {
  /* position: relative;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 1024px;
  height: 100vh;
  padding: 2rem;
  margin:auto;
  border:2px solid gray;
  border-radius: 25px;
  background: rgb(246, 245, 245); */
}
@media (max-width: 1024px) {
    html {
      font-size:1vw;
    }
    #app {
      /* position: relative;
      font-family: Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
      width: 100vw;
      height: 100vh;
      padding: 2rem;
      border:2px solid gray;
      border-radius: 25px;
      background: rgb(246, 245, 245);
      background: green; */
    }
}



</style>
