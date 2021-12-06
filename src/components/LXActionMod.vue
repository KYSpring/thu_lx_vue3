
<script setup>
import { computed, ref, watch } from "vue";
import { useStore } from 'vuex'
import {
  CaretTop,
  ArrowDownBold,
  ArrowUpBold,
  Files,
  CaretBottom,
} from "@element-plus/icons";
import {deepClone} from "../utils";
import LXRepaymentModVue from './LXRepaymentMod.vue';
import LXBalanceModVue from "./LXBalanceMod.vue";

const LXStore = useStore()

const rateSelect = [
  {
    category: "固定利率",
    value: 1,
  },
  {
    category: "一年期LPR",
    value: 2,
  },
  {
    category: "五年期LPR",
    value: 3,
  },
] // 选择器常量
const records = LXStore.state.LXAction

const rules = {
  loanEndTime: [{
    required: true,
    message: '必填项',
    trigger: 'blur',
  }],
  balanceTime: [{
    required: true,
    message: '必填项',
    trigger: 'blur',
  }],
}

const basicRecord = { //初始化的新借还款记录
  index: 0,//与records中的索引保持一致
  isFolded: false,//面板折叠状态
  LXLoan:{ //借款记录
    loanLendTime:'',//出借时间
    loanEndTime:'',//借款到期时间时间
    rateStartTime:'',//期内利息起算时间
    balanceTime:'',//结算时间
    loanAmount:'',//借款金额
    // 期内利息
    rateRadio: 1, // 选择有无期内利息
    rateSelectValue: 1, // 期内利率种类 值 1，2，3
    stableRateInputShow: true,
    oneYearLPRItemShow: false,
    fiveYearLPRItemShow: false,
    rate:0,//期内利率
    LPRTimes:0,//LPR倍率
    LPRdate:'',//期内利率约定的LPR年份
    // 逾期利息
    overdueRateRadio: 1, // 选择有无余期利息
    overdueRateSelectValue: 1, // 逾期利率种类 值 1，2，3
    overdueStableRateInputShow: true,
    overdueOneYearLPRItemShow: false,
    overdueFiveYearLPRItemShow: false,
    overdueRate:0,//逾期利率
    overdueTimes:0,//逾期LPR倍率
    overdueLPRdate:'',//逾期利率约定的LPR年份
    //还款记录
    LXRepayment:[],
  },
  LXBalance:{}
}
const addBlankRecord = () => {
  const newLXLoan = {...basicRecord.LXLoan}
  newLXLoan.LXRepayment = [{
        isFolded: true, //本记录折叠状态
        repayPrincipalRadio: 1,//是否优先赔偿本金
        repayTime: '',//还款时间
        rateTimeRange: [],//期内利息起算和终止时间
        overdueTimeRange:[],//逾期利息起算和终止时间
        repayPrincipal:0,//偿还本金金额
        repayRate:0,//偿还利息金额
        repayTotal:0,//偿还总金额
  }] //针对对象类型需要深拷贝
  records.push({
    isFolded:false,
    LXLoan:newLXLoan,
    LXBalance:{}
  });
  console.log('addBlankRecord',LXStore.state.LXAction)
}
const copyRecord = (recordKey) => {
  let newLXLoan = {...records[recordKey].LXLoan}
  newLXLoan.LXRepayment = [{
        isFolded: true, //本记录折叠状态
        repayPrincipalRadio: 1,//是否优先赔偿本金
        repayTime: '',//还款时间
        rateTimeRange: [],//期内利息起算和终止时间
        overdueTimeRange:[],//逾期利息起算和终止时间
        repayPrincipal:0,//偿还本金金额
        repayRate:0,//偿还利息金额
        repayTotal:0,//偿还总金额
  }] //针对对象类型需要深拷贝
  records.push({
    isFolded:false,
    LXLoan:newLXLoan,
    LXBalance:{}
  });
  console.log('copyRecord',recordKey,LXStore.state.LXAction)
}
const resetRecord = (recordKey) => {
  //此处涉及到内存引用地址的问题
  const tmpRepayment = records[recordKey].LXLoan.LXRepayment
  records[recordKey] = {
    isFolded:false,
    LXLoan:{...basicRecord.LXLoan},
    LXBalance:{}
  }
  records[recordKey].LXLoan.LXRepayment = tmpRepayment
}
const deleteRecord = (recordKey) => {
  if(records.length<=1){
    alert('已是最后一条记录！')
  } else {
    records.splice(recordKey,1)
  }
}
const recordUnfold = (recordKey)=>{
  records.value[recordKey].LXLoan.isFolded = true;
}

const recordFold = (recordKey)=>{
  records.value[recordKey].LXLoan.isFolded = false;
}

// 传入recordKey 监控每个record 展开情况
const rateSelectChange = (rateType, recordKey) => {
  // recordKey 是数组的下标
  console.log('rateType',rateType,recordKey)
  switch (rateType) {
    case 1:
      console.log(1);
      records[recordKey].LXLoan.stableRateInputShow = true;
      records[recordKey].LXLoan.oneYearLPRItemShow = false;
      records[recordKey].LXLoan.fiveYearLPRItemShow = false;
      break;
    case 2:
      console.log(2);
      records[recordKey].LXLoan.oneYearLPRItemShow = true;
      records[recordKey].LXLoan.stableRateInputShow = false;
      records[recordKey].LXLoan.fiveYearLPRItemShow = false;

      break;
    default:
      console.log(3);
      records[recordKey].LXLoan.fiveYearLPRItemShow = true;
      records[recordKey].LXLoan.oneYearLPRItemShow = false;
      records[recordKey].LXLoan.stableRateInputShow = false;
  }
  console.log(records[recordKey].LXLoan.stableRateInputShow,
  records[recordKey].LXLoan.oneYearLPRItemShow,
  records[recordKey].LXLoan.fiveYearLPRItemShow)
}

const overdueRateSelectChange = (rateType, recordKey) => {
  // recordKey 是数组的下标
  switch (rateType) {
    case 1:
      console.log(1);
      records[recordKey].LXLoan.overdueStableRateInputShow = true;
      records[recordKey].LXLoan.overdueOneYearLPRItemShow = false;
      records[recordKey].LXLoan.overdueFiveYearLPRItemShow = false;
      break;
    case 2:
      console.log(2);
      records[recordKey].LXLoan.overdueOneYearLPRItemShow = true;
      records[recordKey].LXLoan.overdueStableRateInputShow = false;
      records[recordKey].LXLoan.overdueFiveYearLPRItemShow = false;
      break;
    default:
      records[recordKey].LXLoan.overdueFiveYearLPRItemShow = true;
      records[recordKey].LXLoan.overdueOneYearLPRItemShow = false;
      records[recordKey].LXLoan.overdueStableRateInputShow = false;
  }
}

const addRepayRecord = (recordKey) => {
  console.log('addRepayRecord',recordKey)
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
  LXStore.state.LXAction[recordKey].LXLoan.LXRepayment.push({...basicRecord})
  console.log(LXStore.state.LXAction[recordKey].LXLoan.LXRepayment)
}
</script>                                                                                             

<template>
  <div id="basebox">
    <el-card shadow="hover" style="width: 100%" 
      v-for="(recordItem, recordKey) in records"
      :key="recordItem.index">
        <!-- title部分 -->
        <el-row justify="space-between">
          <el-col 
            :xs="8"
            :span="4"
            @click="() => {recordItem.isFolded = !recordItem.isFolded}"
            style="margin-bottom:1rem;"
          >
            <!-- <span class="iconbox">
              <el-icon :size="20" style="margin-right: 1rem">
                <Files />
              </el-icon>
            </span> -->
            <span class="boxheader">借款记录{{recordKey+1}}</span>
            <el-icon v-if="recordItem.isFolded" style="margin-left: 1rem">
              <ArrowUpBold />
            </el-icon>
            <el-icon v-else style="margin-left: 1rem">
              <ArrowDownBold />
            </el-icon>
          </el-col>
          <el-col :xs="24" :span="10">
            <el-button type="primary" @click="copyRecord(recordKey)">复制本记录</el-button>
            <el-button type="info"  @click="addBlankRecord"
              >新建空白记录</el-button
            >
            <el-button type="danger" @click="deleteRecord(recordKey)">删除</el-button>
          </el-col>
        </el-row>

        <!-- 借款展开主要内容 -->
        <div class="ruleFormClass" v-show="!recordItem.isFolded">
          <el-form 
            label-position="right" 
            label-width="35%"
            :model="recordItem.LXLoan"
            :rules="rules"
          >
            <el-row justify="space-around">
              <el-col :xs="24" :span="10">
                <el-form-item label="出借时间:">
                  <el-date-picker
                  v-model="recordItem.LXLoan.loanLendTime" 
                  type="date" placeholder="选择日期:"
                  style="width: 90%;"
                  format="YYYY-MM-DD" value-format="YYYY-MM-DD">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :span="10">
                <el-form-item label="借款金额:">
                  <el-input  v-model="recordItem.LXLoan.loanAmount"> 
                    <template #append>元</template>
                  </el-input>
                </el-form-item> 
              </el-col>
              <el-col :span="8"></el-col>
            </el-row>
            <el-row justify="space-around">
              <el-col :xs="24" :span="10">
                <el-form-item label="借款到期时间:" inline prop="loanEndTime">
                  <el-date-picker
                  v-model="recordItem.LXLoan.loanEndTime" 
                  type="date" placeholder="选择日期"
                  style="width: 90%;"
                  format="YYYY-MM-DD" value-format="YYYY-MM-DD">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :span="10">
                <el-form-item label="结算时间:" prop="balanceTime">
                  <el-date-picker
                  v-model="recordItem.LXLoan.balanceTime" 
                  type="date" placeholder="选择日期"
                  style="width: 90%;"
                  format="YYYY-MM-DD" value-format="YYYY-MM-DD">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <!-- 可能需要改布局 -->
              <el-col :xs="24" :span="10">
                <el-form-item label="有无期内利率:">
                  <el-radio-group v-model="recordItem.LXLoan.rateRadio">
                    <el-radio :label="1">有</el-radio>
                    <el-radio :label="0">无</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="10"></el-col>
            </el-row>
            <el-row justify="space-around">
              <el-col :xs="24" :span="10">
                <el-form-item label="利息起算时间:" v-if="recordItem.LXLoan.rateRadio">
                  <el-date-picker
                  v-model="recordItem.LXLoan.rateStartTime" 
                  type="date" placeholder="选择日期"
                  style="width: 90%;"
                  format="YYYY-MM-DD" value-format="YYYY-MM-DD">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :span="10">
                <el-form-item label="期内利率种类:" v-if="recordItem.LXLoan.rateRadio">
                  <el-select
                    v-model="recordItem.LXLoan.rateSelectValue"
                    placeholder="请选择"
                    @change="rateSelectChange(recordItem.LXLoan.rateSelectValue, recordKey)"
                  >
                    <el-option
                      v-for="(item, key) in rateSelect"
                      :key="key"
                      :label="item.category"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            
            <!-- 固定利率输入框 -->
            <el-row justify="space-around" v-if="recordItem.LXLoan.stableRateInputShow && recordItem.LXLoan.rateRadio">
              <el-col :xs="24" :span="10">
                <el-form-item
                  label="年利率:"
                >
                  <el-input type="number" v-model="recordItem.LXLoan.rate">
                    <template #append>%</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10"></el-col>
            </el-row>
            
            <!-- 一年期 利率倍数输入框 + 年份输入框 -->
            <el-row justify="space-around" v-if="recordItem.LXLoan.oneYearLPRItemShow && recordItem.LXLoan.rateRadio">
              <el-col :xs="24" :span="10">
                <el-form-item label="倍率:">
                  <el-input
                    type="number"
                    oninput="value=value.replace(/[^\d]/g,'')"
                    placeholder=""
                    clearable
                    v-model="recordItem.LXLoan.LPRTimes"
                  >
                    <template #append>倍</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :span="10">
                <el-form-item label="LPR日期:">
                  <el-date-picker
                  v-model="recordItem.LXLoan.LPRdate" 
                  type="date" placeholder="选择日期"
                  style="width: 90%;"
                  format="YYYY-MM-DD" value-format="YYYY-MM-DD">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

            <!-- 五年期 利率倍数输入框 -->
            <el-row justify="space-around" v-if="recordItem.LXLoan.fiveYearLPRItemShow && recordItem.LXLoan.rateRadio">
              <el-col :xs="24" :span="10">
                <el-form-item label="倍率:">
                  <el-input
                    type="number"
                    oninput="value=value.replace(/[^\d]/g,'')"
                    placeholder=""
                    clearable
                    v-model="recordItem.LXLoan.LPRTimes"
                  >
                    <template #append>倍</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :span="10">
                <el-form-item label="LPR日期:">
                  <el-date-picker
                  v-model="recordItem.LXLoan.LPRdate" 
                  type="date" placeholder="选择日期"
                  style="width: 90%;"
                  format="YYYY-MM-DD" value-format="YYYY-MM-DD">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            
            
            <!-- 逾期利息 -->
            <el-row justify="space-around">
              <el-col :xs="24" :span="10">
                <el-form-item label="有无逾期利率:">
                  <el-radio-group v-model="recordItem.LXLoan.overdueRateRadio">
                    <el-radio :label="1">有</el-radio>
                    <el-radio :label="0">无</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :span="10">
                <el-form-item label="逾期利率种类:" v-if="recordItem.LXLoan.overdueRateRadio">
                  <el-select
                    v-model="recordItem.LXLoan.overdueRateSelectValue"
                    placeholder="请选择"
                    @change="overdueRateSelectChange(recordItem.LXLoan.overdueRateSelectValue, recordKey)"
                  >
                    <el-option
                      v-for="(item, key) in rateSelect"
                      :key="key"
                      :label="item.category"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>   

            <!-- 固定逾期利率输入框 -->
            <el-row justify="space-around" v-if="
                    recordItem.LXLoan.overdueStableRateInputShow && recordItem.LXLoan.overdueRateRadio
                  ">
              <el-col :xs="24" :span="10">
                <el-form-item
                  label="逾期年利率："
                >
                  <el-input type="number" v-model="recordItem.LXLoan.overdueRate">
                    <template #append>%</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10"></el-col>
            </el-row>


            <!-- 一年期 逾期利率倍数输入框 + 年份输入框 -->
            <el-row justify="space-around" 
            v-if="recordItem.LXLoan.overdueOneYearLPRItemShow && recordItem.LXLoan.overdueRateRadio"
            >
              <el-col :xs="24" :span="10">
                <el-form-item label="倍率:">
                  <el-input
                    type="number"
                    oninput="value=value.replace(/[^\d]/g,'')"
                    placeholder=""
                    clearable
                    v-model="recordItem.LXLoan.overdueTimes"
                  >
                    <template #append>倍</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :span="10">
                <el-form-item label="LPR日期:">
                  <el-date-picker
                  v-model="recordItem.LXLoan.overdueLPRdate" 
                  type="date" placeholder="选择日期"
                  style="width: 90%;"
                  format="YYYY-MM-DD" value-format="YYYY-MM-DD">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

            <!-- 五年期 逾期利率倍数输入框 -->
            <el-row justify="space-around" 
            v-if="recordItem.LXLoan.overdueFiveYearLPRItemShow && recordItem.LXLoan.overdueRateRadio"
            >
              <el-col :xs="24" :span="10">
                <el-form-item label="倍率:">
                  <el-input
                    type="number"
                    oninput="value=value.replace(/[^\d]/g,'')"
                    placeholder=""
                    clearable
                    v-model="recordItem.LXLoan.overdueTimes"
                  >
                    <template #append>倍</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :span="10">
                <el-form-item label="LPR日期:">
                  <el-date-picker
                  v-model="recordItem.LXLoan.overdueLPRdate" 
                  type="date" placeholder="选择日期"
                  style="width: 90%;"
                  format="YYYY-MM-DD" value-format="YYYY-MM-DD">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

          <!-- 借款记录展开主要内容下部分按钮 和 收起 -->
          <el-row justify="space-between">
            <el-col :xs="4" :span="6">
              <!-- <el-button @click="addRepayRecord(recordKey)">添加还款记录</el-button> -->
            </el-col>
            <el-col :xs="12" :span="6">
              <el-button type="primary"> 保存</el-button>
              <el-button type="info" @click="resetRecord(recordKey)">清除</el-button>
            </el-col>
          </el-row>
          
          <!-- 还款记录容器 -->
          <el-row id="repayContainer">
            <LXRepaymentModVue :loanKey="recordKey" :records="recordItem.LXLoan.LXRepayment"></LXRepaymentModVue>
          </el-row>

          <!-- 结算容器 -->
          <el-row>
            <LXBalanceModVue
            :loanKey="recordKey">
            </LXBalanceModVue>
          </el-row>
        </div>

        <!-- 借款记录收起主要内容 -->
        <el-row class="ruleFormClass" v-show="recordItem.isFolded">
          <el-col :span="8"> 出借时间: {{recordItem.LXLoan.loanLendTime}} </el-col>
          <el-col :span="8"> 借款金额: {{recordItem.LXLoan.loanAmount}} 元 </el-col>
        </el-row>
    </el-card>
  </div>
</template>

<style scoped>
#basebox {
  position: relative;
  font-size:2rem;
  display: block;
  margin:0.5rem
}

.ruleFormClass{
  font-size:1.5rem;
  padding: 2rem;
  border:1px solid gray;
  border-radius: 5px;
  margin:1rem 0;
}
.recordTitle {
  font-size: 1.5rem;
}
#repayContainer {
  background: rgb(246, 245, 245);
  padding: 1rem;
  margin: 1rem 0 0 0;
}
.balanceButton {
  width: 30%;
  font-size: 1.5rem;
  font-weight: bold;
}
.boxheader{
  font-size:1.7rem;
  font-weight: bolder;
}
</style>
