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
    <el-header height="3rem" class="headerTitle">
      <el-row justify="start">
        <el-col :span="3"></el-col>
        <el-col :span="3" class="firsttitle">
          <span>民间借贷利息计算器</span>
        </el-col>
      </el-row>
    </el-header>
      <LXInfoModVue></LXInfoModVue>
      <LXActionModVue></LXActionModVue> 
</template>

<style>
.headerTitle{
  position: absolute;
  left:-20vw;
  top:-1rem;
  width:100vw;
  height: 30rem;
  color:white;
  font-size:3.5rem;
  font-weight: bolder;
  padding:5px;
}
.firsttitle{
  text-indent: 2rem;
  -webkit-writing-mode: vertical-lr;
  writing-mode: vertical-lr;
}
html {
  font-size:9px;
  background-image: url('./assets/smallbluebkg.webp');
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
  padding: 1rem;
  margin:auto;
  border-radius: 10px;
  background: rgb(236, 236, 236);

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
      background: rgb(236, 236, 236);
    }
}
</style>
