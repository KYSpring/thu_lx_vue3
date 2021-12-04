
<script setup>
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
  return '等待实现和填充具体数据'
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
      sums[index] = data[index].name == '待还本金（元）'?'待还本息和（元）':'已还本息和（元）';
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
  LXStore.state.LXAction[loanKey].LXBalance = {
    waitPayData: [
      {
        value: '20160503',
        name: '待还本金（元）',
      },
      {
        value: '20160503',
        name: '待还利息（元）',
      },
    ],
    paidData:[
      {
        value: '20160503',
        name: '已还本金（元）',
      },
      {
        value: '20160503',
        name: '已还利息（元）',
      },
    ],
    activities: [
      {
        content: 'Custom icon',
        timestamp: '2018-04-12 20:46',
        size: 'large',
        type: 'primary',
        icon: 'MoreFilled',
      },
      {
        content: 'Custom color',
        timestamp: '2018-04-03 20:46',
        color: '#0bbd87',
      },
      {
        content: 'Custom size',
        timestamp: '2018-04-03 20:46',
        size: 'large',
      },
      {
        content: 'Custom hollow',
        timestamp: '2018-04-03 20:46',
        type: 'primary',
        hollow: true,
      },
      {
        content: 'Default node',
        timestamp: '2018-04-03 20:46',
      }
    ]
  }
  console.log('balanceResult',Object.keys(balanceResult.value).length)

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
      <el-col :span=4 @click="()=>{isFolded = !isFolded}">
        <span class="iconbox"><el-icon :size="18" style="margin-right:1rem"><Document /></el-icon></span>
        <span class="boxheader">结算</span>
        <el-icon v-if="isFolded" style="margin-left:1rem"><ArrowUpBold /></el-icon>
        <el-icon v-else style="margin-left:1rem"><ArrowDownBold /></el-icon>
      </el-col>
    </el-row>
    <el-row justify="space-around" align="top" v-show="!isFolded" style="margin-top:1rem">
      <!-- 结算清单 -->
      <el-col :span="16">
        <el-row justify="space-between">
            <el-col :span="12" style="padding:0.5rem">
              <el-table :data="balanceResult.waitPayData" 
              border
              :show-header="false" 
              :summary-method="getSummaries"
              show-summary>
                <el-table-column prop="name" label="Name"/>
                <el-table-column prop="value" label="Value"/>
              </el-table>
            </el-col>
            <el-col :span="12" style="padding:0.5rem">
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
          <el-col :span="8">
            <el-button type="primary" plain round @click="doCopy(formatResult)">复制结算结果</el-button>
          </el-col>
          <el-col :span="8">
            <el-button type="success" plain round @click="doCopy(formatProcess)">复制计算过程</el-button>
          </el-col>
        </el-row>
      </el-col> 
      <!-- 计算过程 -->
      <el-col :span="8">
        <el-row class="recordPanel">
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in balanceResult.activities"
              :key="index"
              :icon="activity.icon"
              :type="activity.type"
              :color="activity.color"
              :size="activity.size"
              :hollow="activity.hollow"
              :timestamp="activity.timestamp"
            >
              {{ activity.content }}
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
