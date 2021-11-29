
<script setup>
import { ref,toRef, toRefs, onMounted, reactive } from 'vue'
import { useStore } from 'vuex'
import {ArrowDownBold,ArrowUpBold,Files} from '@element-plus/icons'

// defineProps({
//   isNatural: Boolean,
//   isContractStart: Boolean,
//   prosecutionTime: String,
//   acceptanceTime: String,
//   isLiquidatedDamage: Number,
// })
const getRuleForm = ref(null)
const LXStore = useStore()
const ruleForm = LXStore.state.LXInfo
const isFolded = ref(false)
const rules = {
  isNatural: [{
    required: true,
    message: '必填项',
    trigger: 'blur',
  }],
  isContractStart: [{
    required: true,
    message: '必填项',
    trigger: 'blur',
  }],
  prosecutionTime: [{
    required: true,
    message: '必填项',
    trigger: 'blur',
  }],
  acceptanceTime:[{
    required: true,
    message: '必填项',
    trigger: 'blur',
  }],
  isLiquidatedDamage:[{
    required: true,
    message: '必填项',
    trigger: 'blur',
  }],
}
const addLendRecord = ()=>{
  alert('待实现')
}
</script>

<template>
<div id="basebox">
    <el-card shadow="hover" style="width:100%">
      <!-- title部分 -->
      <el-row justify="space-between">
        <el-col :span=4 @click="()=>{isFolded = !isFolded}">
          <span class="iconbox"><el-icon :size="20" style="margin-right:1rem"><Files/></el-icon></span>
          <span class="boxheader">基本信息</span>
          <el-icon v-if="isFolded" style="margin-left:1rem"><ArrowUpBold /></el-icon>
          <el-icon v-else style="margin-left:1rem"><ArrowDownBold /></el-icon>
        </el-col>
      </el-row>
      <!-- 要素部分 -->
      <div id="ruleFormClass" v-show="!isFolded">
        <el-form
          ref="getRuleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="40%"
        >
        <el-row justify="space-between">
          <el-col :span=8>
            <el-form-item label="双方均为自然人:" prop="isNatural">
              <el-radio-group v-model="ruleForm.isNatural">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span=8>
            <el-form-item label="起诉时间:" prop="prosecutionTime">
              <el-date-picker 
              v-model="ruleForm.prosecutionTime" 
              type="date" placeholder="选择日期"
              style="width: 80%;"
              format="YYYY/MM/DD" value-format="YYYY-MM-DD"> 
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span=8>
            <el-form-item label="受理时间:" prop="acceptanceTime">
              <el-date-picker 
              v-model="ruleForm.acceptanceTime" 
              type="date" placeholder="选择日期"
              style="width: 80%;"
              format="YYYY/MM/DD" value-format="YYYY-MM-DD"> 
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>    

        <el-row justify="space-between">
          <el-col :span=10>
            <el-form-item label="是否有合同成立时间:" prop="isContractStart">
              <el-radio-group v-model="ruleForm.isContractStart">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span=10>
            <el-form-item v-if="ruleForm.isContractStart" label="合同成立时间:">
              <el-date-picker 
              v-model="ruleForm.acceptanceTime" 
              type="date" placeholder="选择日期"
              style="width: 80%;"
              format="YYYY/MM/DD" value-format="YYYY-MM-DD"> 
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>  

        <el-row justify="space-between">
          <el-col :span=10>
            <el-form-item label="是否约定违约金：" prop="isLiquidatedDamage">
              <el-radio-group v-model="ruleForm.isLiquidatedDamage">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span=10>
            <el-form-item v-if="ruleForm.isLiquidatedDamage" label="违约金金额：">
              <el-input v-model="ruleForm.liquidatedDamage" style="width:80%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>    
        </el-form>
      </div>
      <el-row justify="end">
        <el-col :span="4">
          <el-button type="primary" plain @click="addLendRecord">添加借款记录</el-button>
        </el-col>
      </el-row>
    </el-card>
</div>
</template>

<style scoped>
#basebox{
  position: relative;
  /* width: 100%; */
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
#ruleFormClass{
  /* background: rgb(250, 250, 250); */
  padding: 2rem;
  border:1px solid gray;
  border-radius: 5px;
  margin:1rem 0;
}
</style>
