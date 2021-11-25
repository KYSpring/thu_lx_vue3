<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// import HelloWorld from './components/HelloWorld.vue'
import LXInfoModVue from './components/LXInfoMod.vue';
</script>

<template>
  <div id="root_box">
    <!-- <HelloWorld msg="Hello Vue 3 + Vite" /> -->
    <LXInfoModVue></LXInfoModVue>
  </div>
</template>

<style>
html {
  font-size:1vw;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#root_box {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
