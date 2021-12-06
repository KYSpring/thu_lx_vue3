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
          <span>民间借贷利息计算</span>
        </el-col>
      </el-row>
    </el-header>
      <LXInfoModVue></LXInfoModVue>
      <LXActionModVue></LXActionModVue> 
    <div class="index-footer">
    <!-- 底栏容器 -->
      <div class="support-box">
        <span class="technology-support-tip">技术支持</span>
        <img height="18" width="60" src='./assets/tsinghua@2x.png'>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <a href="https://beian.miit.gov.cn/" class="technology-support-tip">京ICP备2021010617号 </a>
      </div>
      <div class="tip-box">
        <span calss="new-version-tip">版权归属：清华大学智能法治研究院</span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;联系邮箱 computational_law@tsinghua.edu.cn</span>
      </div>
    </div>
</template>

<style>
.index-footer {
    background: #F0F2F5;
    height: 8%;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;        /* flex子项在flex容器的当前行的侧轴（纵轴）方向上的对齐方式 */
    justify-content: center;    /* 用于设置或检索弹性盒子元素在主轴（横轴）方向上的对齐方式 */
  }
.support-box {
    margin-top:2rem;
    font-weight: 400;
    font-size: 0.8rem;
    color: #999999;
  }
  .support-box a {
    text-decoration: none;
    font-weight: 400;
    font-size: 0.8rem;
    color: #999999;
  }
.tip-box {
    margin-top:0.6rem;
    margin-bottom:2rem;
    font-weight: 400;
    font-size: 0.8rem;
    color: #999999;;
  }


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
:root {
  --el-font-size-base:1.3rem;
}
html {
  font-size:9px;
  background-image: url('./assets/smallbluebkg.webp');
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
