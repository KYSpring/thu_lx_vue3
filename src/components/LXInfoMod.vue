
<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import {ArrowDownBold,Files} from '@element-plus/icons'

defineProps({
  isNatural: Boolean,
  isContractStart: Boolean,
  prosecutionTime: String,
  acceptanceTime: String,
  isLiquidatedDamage: Number,
})
const LXStore = useStore()
const count = ref(0)
onMounted(()=>{
  console.log('see your old $refs',ruleForm);
})
const ruleForm = {
  ...LXStore.state.LXInfo
}
const rules = {

}
console.log('9999',LXStore,ruleForm);

</script>

<template>
<div id="basebox">
    <el-card shadow="hover" style="width:100%">
      <!-- title部分 -->
      <el-row justify="space-between">
        <el-col :span=4>
          <span class="iconbox"><el-icon :size="20" style="margin-right:1rem"><Files/></el-icon></span>
          <span class="boxheader">基本信息</span>
        </el-col>
        <el-col :span=4><el-icon><ArrowDownBold /></el-icon></el-col>
      </el-row>
      <!-- 要素部分 -->
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
      >
      <el-row style="margin-top:10rem" justify="space-around">
        <el-col :span=12>
          <el-form-item>
            <el-radio-group v-model="radio">
              <el-radio label="是"></el-radio>
              <el-radio label="否"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span=12></el-col>
      </el-row>    

      </el-form>
    </el-card>
</div>
</template>

<style scoped>
#basebox{
  position: relative;
  width: 100%;
  font-size:2rem;
  display: flex;
  justify-self: start;
}
#infobox{
  display: flex;
  justify-content: center;
  align-items: center;
}
#iconbox{
  font-size: 10rem;
}
</style>
