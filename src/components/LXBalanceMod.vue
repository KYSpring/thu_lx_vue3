
<script setup>
import { ref,toRef, toRefs, onMounted, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import {ArrowDownBold,ArrowUpBold,Document,MoreFilled} from '@element-plus/icons'
import { copyText } from 'vue3-clipboard'

const isFolded = ref(false)
const waitPayData = [
  {
    value: '20160503',
    name: '待还本金（元）',
  },
  {
    value: '20160503',
    name: '待还利息（元）',
  },
]
const paidData = [
  {
    value: '20160503',
    name: '已还本金（元）',
  },
  {
    value: '20160503',
    name: '已还利息（元）',
  },
]
const activities = [
  {
    content: 'Custom icon',
    timestamp: '2018-04-12 20:46',
    size: 'large',
    type: 'primary',
    icon: MoreFilled,
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
const formatResult = computed(()=>{
  return `${waitPayData[0].name}：${waitPayData[0].value}；
  ${waitPayData[1].name}：${waitPayData[1].value}；
  待还本息和：${Number(waitPayData[0].value)+Number(waitPayData[1].value)}`
})
const formatProcess = computed(()=>{
  return '等待实现和填充具体数据'
})
const doCopy = (formatData) => {
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
      console.log('formatData',formatData)
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
onMounted(()=>{
  ElMessage.success('按需引入');
})
</script>

<template>
<div id="basebox">
  <el-card shadow="hover" style="width:100%">
    <!-- title部分 -->
    <el-row justify="space-between">
      <el-col :span=4 @click="()=>{isFolded = !isFolded}">
        <span class="iconbox"><el-icon :size="20" style="margin-right:1rem"><Document /></el-icon></span>
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
              <el-table :data="waitPayData" 
              border
              :show-header="false" 
              :summary-method="getSummaries"
              show-summary>
                <el-table-column prop="name" label="Name"/>
                <el-table-column prop="value" label="Value"/>
              </el-table>
            </el-col>
            <el-col :span="12" style="padding:0.5rem">
              <el-table :data="paidData" 
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
              v-for="(activity, index) in activities"
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
  margin:0.5rem
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
</style>
