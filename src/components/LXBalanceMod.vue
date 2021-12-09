
<script setup>
import axios from 'axios'
import { ref,toRef, toRefs, onMounted, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import {ArrowDownBold,ArrowUpBold,Document,MoreFilled} from '@element-plus/icons'
import { copyText } from 'vue3-clipboard'

const  {loanKey, waitPayData, paidData, activities} = defineProps({
  loanKey: Number,
  waitPayData:Array,
  paidData:Array,
  activities:Array,
})
const isFolded = ref(false)
const LXStore = useStore()
const balanceResult = computed(() => LXStore.state.LXAction[loanKey].LXBalance)
const balanceLen = computed(() => {
  console.log('balanceLen',Object.keys(LXStore.state.LXAction[loanKey].LXBalance)?.length)
  return Object.keys(LXStore.state.LXAction[loanKey].LXBalance)?.length
})

const formatResult = computed(()=>{
  return `${balanceResult.value.waitPayData[0].name}：${balanceResult.value.waitPayData[0].value}；
  ${balanceResult.value.waitPayData[1].name}：${balanceResult.value.waitPayData[1].value}；
  待还本息和：${Number(balanceResult.value.waitPayData[0].value)+Number(balanceResult.value.waitPayData[1].value)}。
  ${balanceResult.value.paidData[0].name}：${balanceResult.value.paidData[0].value}；
  ${balanceResult.value.paidData[1].name}：${balanceResult.value.paidData[1].value}；
  已还本息和：${Number(balanceResult.value.paidData[0].value)+Number(balanceResult.value.paidData[1].value)}`
})
const formatProcess = computed(()=>{
  let record = []
  balanceResult.value.activities.forEach((item,index) => {
    record.push(`${item.timestamp}: `)
    record.push(item.content)
    record.push("\n")
  })
  return record.join('')
})
const doCopy = (formatData) => {
  console.log('formatData',formatData)
  copyText(formatData, undefined, (error, event) => {
    if (error) {
      ElMessage({
        message: '复制失败，请重试～',
        type: 'warning',
      })
    } else {
      ElMessage({
        message: '复制成功！',
        type: 'success',
      })
    }
  })
}
const getSummaries = (param) => {
  const { columns, data } = param
  const sums = []
  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = data[index].name == '待还本金（元）'?'待还总和（元）':'已还总和（元）';
      return
    }
    const values = data.map((item) => Number(item[column.property]))
    if (!values.every((value) => isNaN(value))) {
      sums[index] = ` ${values.reduce((prev, curr) => {
        const value = Number(curr)
        if (!isNaN(value)) {
          return prev + curr
        } else {
          return prev
        }
      }, 0)}`
    } else {
      sums[index] = 'N/A'
    }
  })
  return sums
}
const getBalance = ()=>{
  console.log('balanceResult',Object.keys(balanceResult.value).length)
  axios({
    method: 'post',
    // url: 'http://127.0.0.1:5000/privatelending/calculateRate',//test
    url: 'http://188.131.144.236:7777/privatelending/calculateRate',//production
    data: {
      LXInfo:LXStore.state.LXInfo ,
      LXAction:LXStore.state.LXAction[loanKey]
    }
  }).then((response) => {
    console.log('response.data',response.data.data);
    LXStore.state.LXAction[loanKey].LXBalance = response.data.data
  }).catch(err => {
    console.log(err)
  })
  console.log('balanceResult',Object.keys(balanceResult.value).length)
}
const deleteBalance = ()=>{
  LXStore.state.LXAction[loanKey].LXBalance ={}
}
</script>

<template>
<div id="basebox">
  <el-row justify="center" style="margin:1rem 0" v-if="!balanceLen">
    <el-button type="success" round plain class="balanceButton" @click="getBalance"> + 结算本次借款</el-button>
  </el-row>
  <el-card shadow="hover" style="width:100%" v-else>
    <!-- title部分 -->
    <el-row justify="space-between">
      <el-col :xs="8" :span=4 @click="()=>{isFolded = !isFolded}">
        <span class="iconbox"><el-icon :size="18" style="margin-right:1rem"><Document /></el-icon></span>
        <span class="boxheader">结算</span>
        <el-icon v-if="isFolded" style="margin-left:1rem"><ArrowUpBold /></el-icon>
        <el-icon v-else style="margin-left:1rem"><ArrowDownBold /></el-icon>
      </el-col>
      <el-col :xs="8" :span=4>
        <el-button type="danger" @click="deleteBalance">删除</el-button>
      </el-col>
    </el-row>
    <el-row justify="space-around" align="top" v-show="!isFolded" style="margin-top:1rem">
      <!-- 结算清单 -->
      <el-col :xs="24" :span="14">
        <el-row justify="space-between">
            <el-col :xs="24" :span="12" style="padding:0.5rem">
              <el-table :data="balanceResult.waitPayData" 
              border
              :show-header="false" 
              :summary-method="getSummaries"
              show-summary>
                <el-table-column prop="name" label="Name"/>
                <el-table-column prop="value" label="Value"/>
              </el-table>
            </el-col>
            <el-col :xs="24" :span="12" style="padding:0.5rem">
              <el-table :data="balanceResult.paidData" 
              border 
              :show-header="false" 
              :summary-method="getSummaries"
              show-summary>
                <el-table-column prop="name" label="Name"/>
                <el-table-column prop="value" label="Value"/>
              </el-table>
            </el-col>
        </el-row>
        <el-row justify="space-between" :gutter="20" style="margin-top:3rem">
          <el-col :xs="12" :span="8">
            <el-button type="primary" plain round @click="doCopy(formatResult)">复制结算结果</el-button>
          </el-col>
          <el-col :xs="12" :span="8">
            <el-button type="success" plain round @click="doCopy(formatProcess)">复制计算过程</el-button>
          </el-col>
        </el-row>
      </el-col> 
      <!-- 计算过程 -->
      <el-col :xs="24" :span="10">
        <el-row class="recordPanel">
            <el-timeline>
              <el-timeline-item
                style="text-align:left"
                v-for="(activity, index) in balanceResult.activities"
                :key="index"
                :icon="activity.icon"
                :type="activity.type"
                :color="activity.color"
                :size="activity.size"
                :hollow="activity.hollow"
                :timestamp="activity.timestamp"
                placement="top"
                center
              >
                <el-row>{{ activity.content }}</el-row>
              </el-timeline-item>
            </el-timeline>
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</div>
</template>

<style scoped>
#basebox{
  position: relative;
  font-size:2rem;
  display: block;
  margin:0.5rem;
  width: 100%;
}
#iconbox{
  font-size: 10rem;
}
.recordPanel{
  border:1px solid gray;
  padding: 2rem 0;
  border-radius: 5px;
  height: 100%;
  max-height: 25rem;
  overflow-y:scroll;
}
.boxheader{
  font-size:1.7rem;
  font-weight: bold;
}
</style>
