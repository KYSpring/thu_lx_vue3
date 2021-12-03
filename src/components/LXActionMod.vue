
<script setup>
import { ref, watch } from "vue";
import { useStore } from 'vuex'
import {
  CaretTop,
  ArrowDownBold,
  ArrowUpBold,
  Files,
  CaretBottom,
} from "@element-plus/icons";
import {deepClone} from "../utils";

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

const basicRecord = { //初始化的新借还款记录
  index: 0,//与records中的索引保持一致
  isFolded: false,//面板折叠状态
  LXLoan:{ //借款记录
    loanLendTime:'',//借款时间
    loanEndTime:'',//借款到期时间
    rateStartTime:'',//期内利息起算时间
    loanAmount:'',//借款金额
    // 期内利息
    rateRadio: 1, // 选择有无期内利息
    rateSelectValue: 1, // 期内利率种类 值 1，2，3
    stableRateInputShow: true,
    oneYearLPRItemShow: false,
    fiveYearLPRItemShow: false,
    rate:0,//期内利率
    LPRTimes:0,//LPR倍率
    LPRYear:'',//期内利率约定的LPR年份
    // 逾期利息
    overdueRateRadio: 1, // 选择有无余期利息
    overdueRateSelectValue: 1, // 逾期利率种类 值 1，2，3
    overdueStableRateInputShow: true,
    overdueOneYearLPRItemShow: false,
    overdueFiveYearLPRItemShow: false,
    overdueRate:0,//逾期利率
    overdueTimes:0,//逾期LPR倍率
    overdueLPRYear:'',//逾期利率约定的LPR年份
    //还款记录
    LXRepayment:[],
  },
  LXBalance:{}
}
const addBlankRecord = () => {
  records.push({
    index:records.length,
    isFolded:false,
    LXLoan:{...basicRecord.LXLoan},
    LXBalance:{}
  });
  console.log(LXStore.state.LXAction)
}
const copyRecord = (recordKey) => {
  records.push({
    index:records.length,
    isFolded:false,
    LXLoan:{...records[recordKey].LXLoan},
    LXBalance:{}
  });
  console.log(LXStore.state.LXAction)
}
const resetRecord = (recordKey) => {
  records[recordKey] = {
    index:records.length,
    isFolded:false,
    LXLoan:{...basicRecord.LXLoan},
    LXBalance:{}
  }
}
const deleteRecord = (recordKey) => {
  if(records.length<=1){
    alert('已是最后一条记录！')
  } else {
    records.splice(recordKey,1);
    console.log(LXStore.state.LXAction)
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
</script>                                                                                             

<template>
  <div id="basebox">
    <el-card shadow="hover" style="width: 100%" 
      v-for="(recordItem, recordKey) in records"
      :key="recordItem.index">
    <!-- {{records}} -->
      <!-- title部分 -->
      <el-row justify="space-between">
        <el-col 
          :span="4"
          @click="() => {recordItem.isFolded = !recordItem.isFolded}"
        >
          <span class="iconbox">
            <el-icon :size="20" style="margin-right: 1rem">
              <Files />
            </el-icon>
          </span>
          <span class="boxheader">借款记录{{recordKey+1}}</span>
          <el-icon v-if="recordItem.isFolded" style="margin-left: 1rem">
            <ArrowUpBold />
          </el-icon>
          <el-icon v-else style="margin-left: 1rem">
            <ArrowDownBold />
          </el-icon>
        </el-col>
        <el-col :span="10">
          <el-button type="primary" size="medium" @click="copyRecord(recordKey)">复制本记录</el-button>
          <el-button type="info" size="medium" @click="addBlankRecord"
            >新建空白记录</el-button
          >
          <el-button type="danger" size="medium" @click="deleteRecord(recordKey)">删除</el-button>
        </el-col>
      </el-row>

      <!-- 借款展开主要内容 -->
      <div class="ruleFormClass" v-show="!recordItem.isFolded">
        <el-form label-position="right">
          <el-row justify="space-around">
            <el-col :span="8">
              <el-form-item label="借款时间:">
                <el-date-picker
                v-model="recordItem.LXLoan.loanLendTime" 
                type="date" placeholder="选择日期:"
                style="width: 80%;"
                format="YYYY-MM-DD" value-format="YYYY-MM-DD">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="借款金额">
                <el-input  v-model="recordItem.LXLoan.loanAmount">
                  <template #append>元</template>
                </el-input>
              </el-form-item> 
            </el-col>
          </el-row>
          <el-row justify="space-around">
            <el-col :span="8">
              <el-form-item label="到期时间:" inline>
                <el-date-picker
                v-model="recordItem.LXLoan.loanEndTime" 
                type="date" placeholder="选择日期"
                style="width: 80%;"
                format="YYYY-MM-DD" value-format="YYYY-MM-DD">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="利息起算时间">
                <el-date-picker
                v-model="recordItem.LXLoan.rateStartTime" 
                type="date" placeholder="选择日期"
                style="width: 80%;"
                format="YYYY-MM-DD" value-format="YYYY-MM-DD">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row justify="space-around">
            <el-col :span="8">
              <el-form-item label="期内利率">
                <el-radio-group v-model="recordItem.LXLoan.rateRadio">
                  <el-radio :label="1">有</el-radio>
                  <el-radio :label="0">无</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="期内利率种类" v-if="recordItem.LXLoan.rateRadio">
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
            <el-col :span="8">
              <el-form-item
                label="利率："
              >
                <el-input type="number" style="width: 80%" v-model="recordItem.LXLoan.rate">
                  <template #append>%</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8"></el-col>
          </el-row>
          
          <!-- 一年期 利率倍数输入框 + 年份输入框 -->
          <el-row justify="space-around" v-if="recordItem.LXLoan.oneYearLPRItemShow && recordItem.LXLoan.rateRadio">
            <el-col :span="8">
              <el-form-item label="倍率">
                <el-input
                  style="width:50%"
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
            <el-col :span="8">
              <el-form-item label="年份">
                <el-input
                  style="width:80%"
                  placeholder="输入年份（默认当前年）"
                  v-model="recordItem.LXLoan.LPRYear"
                >
                  <template #append>年</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- 五年期 利率倍数输入框 -->
          <el-row justify="space-around" v-if="recordItem.LXLoan.fiveYearLPRItemShow && recordItem.LXLoan.rateRadio">
            <el-col :span="8">
              <el-form-item label="倍率">
                <el-input
                  type="number"
                  oninput="value=value.replace(/[^\d]/g,'')"
                  placeholder=""
                  clearable
                  style="width: 50%"
                  v-model="recordItem.LXLoan.LPRTimes"
                >
                  <template #append>倍</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="年份">
                <el-input
                  style="width: 80%"
                  placeholder="输入年份（默认当前年）"
                  v-model="recordItem.LXLoan.LPRYear"
                >
                  <template #append>年</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          
          
          <!-- 逾期利息 -->
          <el-row justify="space-around">
            <el-col :span="8">
              <el-form-item label="逾期利率">
                <el-radio-group v-model="recordItem.LXLoan.overdueRateRadio">
                  <el-radio :label="1">有</el-radio>
                  <el-radio :label="0">无</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="逾期利率种类" v-if="recordItem.LXLoan.overdueRateRadio">
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
            <el-col :span="8">
              <el-form-item
                label="利率："
              >
                <el-input type="number" style="width: 80%" v-model="recordItem.LXLoan.overdueRate">
                  <template #append>%</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8"></el-col>
          </el-row>


          <!-- 一年期 逾期利率倍数输入框 + 年份输入框 -->
          <el-row justify="space-around" 
          v-if="recordItem.LXLoan.overdueOneYearLPRItemShow && recordItem.LXLoan.overdueRateRadio"
          >
            <el-col :span="8">
              <el-form-item label="倍率">
                <el-input
                  type="number"
                  oninput="value=value.replace(/[^\d]/g,'')"
                  placeholder=""
                  clearable
                  style="width: 50%"
                  v-model="recordItem.LXLoan.overdueTimes"
                >
                  <template #append>倍</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="年份">
                <el-input
                  style="width: 80%"
                  placeholder="输入年份（默认当前年）"
                  v-model="recordItem.LXLoan.overdueLPRYear"
                >
                  <template #append>年</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- 五年期 逾期利率倍数输入框 -->
          <el-row justify="space-around" 
          v-if="recordItem.LXLoan.overdueFiveYearLPRItemShow && recordItem.LXLoan.overdueRateRadio"
          >
            <el-col :span="8">
              <el-form-item label="倍率">
                <el-input
                  type="number"
                  oninput="value=value.replace(/[^\d]/g,'')"
                  placeholder=""
                  clearable
                  style="width: 50%"
                  v-model="recordItem.LXLoan.overdueTimes"
                >
                  <template #append>倍</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="年份">
                <el-input
                  style="width: 80%"
                  placeholder="输入年份（默认当前年）"
                  v-model="recordItem.LXLoan.overdueLPRYear"
                >
                  <template #append>年</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <!-- 借款记录展开主要内容下部分按钮 和 收起 -->
        <el-row justify="space-between">
          <el-col :span="6">
            <el-button size="medium">添加还款记录</el-button>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" size="medium"> 保存</el-button>
            <el-button type="info" size="medium" @click="resetRecord(recordKey)">清除</el-button>
          </el-col>
        </el-row>
      </div>

      <!-- 借款记录收起主要内容 -->
      <el-row class="ruleFormClass" v-show="recordItem.isFolded">
        <el-col :span="8"> 借款时间: {{recordItem.LXLoan.loanLendTime}} </el-col>
        <el-col :span="8"> 借款金额: {{recordItem.LXLoan.loanAmount}} 元 </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<style scoped>
#basebox {
  position: relative;
  width: 100%;
  font-size: 2rem;
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
</style>
