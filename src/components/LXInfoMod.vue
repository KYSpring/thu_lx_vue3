
<script setup>
import { ref } from 'vue'

defineProps({
  isNatural: Boolean,
  isContractStart: Boolean,
  prosecutionTime: String,
  acceptanceTime: String,
  isLiquidatedDamage: Number,
})
const count = ref(0)
</script>

<template>
<div id="basebox">
  <div id="titlebar">基本信息</div>
  <div id="infobox">

  </div>
</div>
</template>

<style scoped>
#basebox{
  font-size:1rem;
  display: flex;
}
#infobox{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
