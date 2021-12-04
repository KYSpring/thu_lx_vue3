
<script setup>
import { computed, ref, watch } from "vue";
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import {
  CaretTop,
  ArrowDownBold,
  ArrowUpBold,
  Files,
  CaretBottom,
  DArrowLeft,
  DArrowRight
} from "@element-plus/icons";
import { deepClone } from "../utils";

const {loanKey, records} = defineProps({
  loanKey: Number,
  records: Array
})
const LXStore = useStore()
// 如果使用如下写法而不是用父子传参会出现子组件数据不能响应式更新的情况，背后原因待查明
// const records = LXStore.state.LXAction[loanKey].LXLoan.LXRepayment;

const basicRecord = {
  isFolded: true, //本记录折叠状态
  repayPrincipalRadio: 1,//是否优先赔偿本金
  repayTime: '',//还款时间
  rateTimeRange: [],//期内利息起算和终止时间
  overdueTimeRange:[],//逾期利息起算和终止时间
  repayPrincipal:0,//偿还本金金额
  repayRate:0,//偿还利息金额
  repayTotal:0,//偿还总金额
}

const alertMessage = (msg)=>{
  alert(msg)
}

function deleteRecord(recordKey){
  if (records.length > 1){
     records.splice(recordKey,1);
  } else {
    alertMessage('无法删除，已是最后一条还款记录!')
  }
}

const resetRepayRecord = (recordKey) => {
  records[recordKey] = {...basicRecord}
  records[recordKey].isFolded = false
}

function copyRecord(recordKey){
  records.push({...records[recordKey]})
  console.log(LXStore.state.LXAction[loanKey].LXLoan.LXRepayment);
}

function addBlankRecord() {
  records.push({...basicRecord})
}

function recordFold(recordKey) {
  records[recordKey].isFolded = false;
}
function recordUnfold(recordKey) {
  records[recordKey].isFolded = true;
}

</script>

<template>
    <el-card 
    shadow="hover" 
    style="width: 100%"
    v-for="(record, recordKey) in records" 
    :key="recordKey"> 
      <!-- 循环内容部分 -->
      <div class="ruleFormClass">
        <!-- 标题部分 -->
        <el-row >
          <el-col :span="4" class="recordTitle">
            还款记录-{{ recordKey + 1 }}
          </el-col>
            <el-col class="snapshot" :span="5" v-show="record.isFolded">还款时间：{{record.repayTime}}</el-col>
            <el-col class="snapshot" :span="4" v-show="record.isFolded">还款金额 {{record.repayTotal }} 元</el-col>
            <el-col class="optionEdit" :span="5" @click="recordFold(recordKey)" v-show="record.isFolded">
              <el-icon class="icontransform"> 
                <d-arrow-left />
              </el-icon>编辑
            </el-col>
            <el-col :span="6" v-show="record.isFolded">
              <el-button type="primary" size="mini" @click="copyRecord(recordKey)">复制</el-button>
              <!-- <el-button type="info" size="mini" @click="addBlankRecord">新建空白记录</el-button> -->
              <el-button type="danger" size="mini" @click="deleteRecord(recordKey)">删除</el-button>
            </el-col>
        </el-row>
        <!-- 单个record 展开时主要内容 -->
        <div v-show="!record.isFolded" style="margin-top:1rem">
          <el-form label-position="right" label-width="40%">
            <el-row justify="space-around">
              <el-col :span="10">
                <el-form-item label="约定优先偿还本金:">
                  <el-radio-group v-model="record.repayPrincipalRadio" style="width: 80%;">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="还款时间:">
                  <el-date-picker
                    style="width: 90%;"
                    v-model="record.repayTime" 
                    type="date" placeholder="选择日期:"
                    format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>  

            <el-row justify="space-around">
              <el-col :span="10">
                 <el-form-item label="期内利息计算时间:">
                  <el-date-picker
                    type="daterange"
                    v-model="record.rateTimeRange"
                    range-separator="To"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    style="width: 90%;"
                    format="YY/MM/DD" 
                    value-format="YYYY-MM-DD"
                  ></el-date-picker>
                </el-form-item>          
              </el-col>
              <el-col :span="10">
                <el-form-item label="逾期利息计算时间:">
                  <el-date-picker
                    type="daterange"
                    v-model="record.overdueTimeRange"
                    range-separator="To"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    style="width: 90%;"
                    format="YY/MM/DD" 
                    value-format="YYYY-MM-DD"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>   

            <!-- 优先偿还本金情况下出来的内容 -->
            <el-row justify="space-around" v-if="record.repayPrincipalRadio">
              <el-col :span="10" >
                 <el-form-item label="偿还本金金额:" >
                  <el-input v-model="record.repayPrincipal">
                    <template #append>元</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="偿还利息金额:" >
                  <el-input v-model="record.repayRate">
                    <template #append>元</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="还款总金额:">
                  <el-input v-model="record.repayTotal">
                    <template #append>元</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10"></el-col>
            </el-row>   
            
            <!-- 未约定优先偿还本金情况下出来的内容 -->
            <el-row v-if="!record.repayPrincipalRadio" justify="space-around">
              <el-col :span="10">
                <el-form-item label="还款总金额:">
                  <el-input
                    style="width: 90%;"
                    v-model="record.repayTotal"
                  >
                    <template #append>元</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10"></el-col>
            </el-row>  
          </el-form>

          <!-- 还款记录展开主要内容下部分按钮 和 收起 -->
          <el-row justify="space-between">
            <el-col :span="8"></el-col>
            <el-col class="optionFold" :span="8" @click="recordUnfold(recordKey)">
              <el-icon class="icontransform"> 
                <d-arrow-right />
              </el-icon>收起
            </el-col>
            <el-col :span="8">
              <el-button type="primary" size="mini">保存</el-button>
              <el-button type="info" size="mini" @click="resetRepayRecord(recordKey)">清除</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-card>
</template>

<style scoped>
.recordTitle {
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  justify-content: start;
}
.icontransform{
  transform: rotate(270deg);
  margin-right: 1rem;
}
.snapshot{
  color:gray
}
.optionEdit {
  font-size: 1.6rem;
  font-weight: bold;
  color: rgba(64, 131, 240, 0.849);
}
.optionFold{
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
