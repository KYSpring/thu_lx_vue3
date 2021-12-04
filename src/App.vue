<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import LXInfoModVue from './components/LXInfoMod.vue';
import LXActionModVue from './components/LXActionMod.vue';
import LXBalanceModVue from './components/LXBalanceMod.vue';
import LXRepaymentModVue from './components/LXRepaymentMod.vue';
</script>

<template>
    <!-- <HelloWorld msg="Hello Vue 3 + Vite" /> -->
      <LXInfoModVue></LXInfoModVue>
      <LXActionModVue></LXActionModVue> 
</template>

<style>
html {
  font-size:9px;
  background-image: url('./assets/bluebkg.jpg');
}
:root {
  --el-font-size-base:1.3rem;
}
#app {
  position: relative;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 900px;
  padding: 2rem;
  margin:auto;
  border-radius: 10px;
  background: rgb(246, 245, 245);

}
@media (max-width: 900px) {
    html {
      font-size:1vw;
    }
    :root {
      --el-font-size-base:1.3rem;
    }
    #app {
      position: relative;
      font-family: Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
      width: 95vw;
      padding: 2rem;
      border-radius: 10px;
      background: rgb(246, 245, 245);
    }
}
</style>
