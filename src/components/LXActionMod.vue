
<script setup>
import { ref, watch } from "vue";
import {
  CaretTop,
  ArrowDownBold,
  ArrowUpBold,
  Files,
  CaretBottom,
} from "@element-plus/icons";
import {deepClone} from "../utils";

const count = ref(0);
const isFolded = ref(false);
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
]
let basicRecord = { //初始化一个新记录
  index: 0,//与records中的索引保持一致
  isFolded: false,//面板折叠状态
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
  LPRYear:'2021-12-02',//期内利率约定的LPR年份

  // 逾期利息
  overdueRateRadio: 1, // 选择有无余期利息
  overdueRateSelectValue: 1, // 逾期利率种类 值 1，2，3
  overdueStableRateInputShow: true,
  overdueOneYearLPRItemShow: false,
  overdueFiveYearLPRItemShow: false,
  overdueRate:0,//逾期利率
  overdueTimes:0,//逾期LPR倍率
  overdueLPRYear:'2021/12/02',//逾期利率约定的LPR年份
}
const records = ref([{...basicRecord}])//深拷贝basicrecord;
const testfn = () => { //test
  console.log('records.value',records.value)
}
watch(records,(old,newrecord)=>{
  testfn()
})

const recordUnfold = (recordKey)=>{
  records.value[recordKey].isFolded = true;
}

const recordFold = (recordKey)=>{
  records.value[recordKey].isFolded = false;
}

const addBlankRecord = () => {
  // let tempRecord = deepClone(basicRecord)
  // records.value.push(tempRecord);
  records.value.push({...basicRecord});
}

// 传入recordKey 监控每个record 展开情况
const rateSelectChange = (rateType, recordKey) => {
  // recordKey 是数组的下标
  switch (rateType) {
    case 1:
      console.log(1);
      records.value[recordKey].stableRateInputShow = true;
      records.value[recordKey].oneYearLPRItemShow = false;
      records.value[recordKey].fiveYearLPRItemShow = false;
      break;
    case 2:
      console.log(2);
      records.value[recordKey].oneYearLPRItemShow = true;
      records.value[recordKey].stableRateInputShow = false;
      records.value[recordKey].fiveYearLPRItemShow = false;

      break;
    default:
      records.value[recordKey].fiveYearLPRItemShow = true;
      records.value[recordKey].oneYearLPRItemShow = false;
      records.value[recordKey].stableRateInputShow = false;
  }
}

const overdueRateSelectChange = (rateType, recordKey) => {
  // recordKey 是数组的下标
  switch (rateType) {
    case 1:
      console.log(1);
      records.value[recordKey].overdueStableRateInputShow = true;
      records.value[recordKey].overdueOneYearLPRItemShow = false;
      records.value[recordKey].overdueFiveYearLPRItemShow = false;
      break;
    case 2:
      console.log(2);
      records.value[recordKey].overdueOneYearLPRItemShow = true;
      records.value[recordKey].overdueStableRateInputShow = false;
      records.value[recordKey].overdueFiveYearLPRItemShow = false;
      break;
    default:
      records.value[recordKey].overdueFiveYearLPRItemShow = true;
      records.value[recordKey].overdueOneYearLPRItemShow = false;
      records.value[recordKey].overdueStableRateInputShow = false;
  }
}
</script>                                                                                             

<template>
  <div id="basebox">
    <el-card shadow="hover" style="width: 100%">
      <!-- title部分 -->
      <el-row justify="space-between">
        <el-col
          :span="4"
          @click="
            () => {
              isFolded = !isFolded;
            }
          "
        >
          <span class="iconbox">
            <el-icon :size="20" style="margin-right: 1rem">
              <Files />
            </el-icon>
          </span>
          <span class="boxheader">借款信息</span>
          <el-icon v-if="isFolded" style="margin-left: 1rem">
            <ArrowUpBold />
          </el-icon>
          <el-icon v-else style="margin-left: 1rem">
            <ArrowDownBold />
          </el-icon>
        </el-col>
      </el-row>
      <!-- 循环的借款记录要素部分 -->
      <div
        id="ruleFormClass"
        v-show="!isFolded"
        v-for="(recordItem, recordKey) in records"
        :key="recordItem.index"
      >
      {{recordItem.index}}
        <!-- 借款记录标题部分 -->
        <el-row>
          <span class="recordTitle">借款记录-{{ recordKey + 1 }}</span>
        </el-row>

        <!-- 借款展开主要内容 -->
        <div v-show="!recordItem.isFolded">
          <el-form label-position="right">
            <el-form-item label="借款时间">
              <el-date-picker
              v-model="recordItem.loanLendTime" 
              type="date" placeholder="选择日期"
              style="width: 80%;"
              format="YYYY/MM/DD" value-format="YYYY-MM-DD">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="到期时间" inline>
              <el-date-picker
              v-model="recordItem.loanEndTime" 
              type="date" placeholder="选择日期"
              style="width: 80%;"
              format="YYYY/MM/DD" value-format="YYYY-MM-DD">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="利息起算时间">
              <el-date-picker
              v-model="recordItem.rateStartTime" 
              type="date" placeholder="选择日期"
              style="width: 80%;"
              format="YYYY/MM/DD" value-format="YYYY-MM-DD">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="借款金额">
              <el-input style="width: 20%" v-model="recordItem.loanAmount">
                <template #append>元</template>
              </el-input>
            </el-form-item>

            <el-form-item label="期内利率">
              <el-radio-group v-model="recordItem.rateRadio">
                <el-radio :label="1">有</el-radio>
                <el-radio :label="0">无</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="期内利率种类" v-if="recordItem.rateRadio">
              <el-select
                v-model="recordItem.rateSelectValue"
                placeholder="请选择"
                @change="rateSelectChange(rateType, recordKey)"
              >
                <el-option
                  v-for="(item, key) in rateSelect"
                  :key="key"
                  :label="item.category"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <!-- 固定利率输入框 -->
            <el-form-item
              label="利率："
              v-if="recordItem.stableRateInputShow && recordItem.rateRadio"
            >
              <el-input style="width: 20%" type="number" v-model="recordItem.rate">
                <template #append>%</template>
              </el-input>
            </el-form-item>

            <!-- 一年期 利率倍数输入框 + 年份输入框 -->
            <el-form-item v-if="recordItem.oneYearLPRItemShow && recordItem.rateRadio">
              <el-row>
                <el-col :span="8">
                  <el-input
                    type="number"
                    oninput="value=value.replace(/[^\d]/g,'')"
                    placeholder=""
                    clearable
                    style="width: 75%"
                    v-model="recordItem.LPRTimes"
                  >
                    <template #append>倍</template>
                  </el-input>
                </el-col>
                <el-col :span="12">
                  <el-input
                    style="width: 50%"
                    placeholder="输入年份（默认当前年）"
                    v-model="recordItem.LPRYear"
                  >
                    <template #append>年</template>
                  </el-input>
                </el-col>
              </el-row>
            </el-form-item>

            <!-- 五年期 利率倍数输入框 -->
            <el-form-item v-if="recordItem.fiveYearLPRItemShow && recordItem.rateRadio">
              <el-input
                type="number"
                oninput="value=value.replace(/[^\d]/g,'')"
                placeholder=""
                clearable
                style="width: 30%"
                v-model="recordItem.LPRTimes"
              >
                <template #append>倍</template>
              </el-input>
            </el-form-item>

            <!-- 逾期利息 -->
            <el-form-item label="逾期利率">
              <el-radio-group v-model="recordItem.overdueRateRadio">
                <el-radio :label="1">有</el-radio>
                <el-radio :label="0">无</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="逾期利率种类" v-if="recordItem.overdueRateRadio">
              <el-select
                v-model="recordItem.overdueRateSelectValue"
                placeholder="请选择"
                @change="overdueRateSelectChange(rateType, recordKey)"
              >
                <el-option
                  v-for="(item, key) in rateSelect"
                  :key="key"
                  :label="item.category"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <!-- 固定逾期利率输入框 -->
            <el-form-item
              label="利率："
              v-if="
                recordItem.overdueStableRateInputShow && recordItem.overdueRateRadio
              "
            >
              <el-input style="width: 20%" type="number" v-model="recordItem.overdueRate">
                <template #append>%</template>
              </el-input>
            </el-form-item>

            <!-- 一年期 逾期利率倍数输入框 + 年份输入框 -->
            <el-form-item
              v-if="recordItem.overdueOneYearLPRItemShow && recordItem.overdueRateRadio"
            >
              <el-row>
                <el-col :span="8">
                  <el-input
                    type="number"
                    oninput="value=value.replace(/[^\d]/g,'')"
                    placeholder=""
                    clearable
                    style="width: 75%"
                    v-model="recordItem.overdueTimes"
                  >
                    <template #append>倍</template>
                  </el-input>
                </el-col>

                <el-col :span="12">
                  <el-input
                    style="width: 50%"
                    placeholder="输入年份（默认当前年）"
                    v-model="recordItem.overdueLPRYear"
                  >
                    <template #append>年</template>
                  </el-input>
                </el-col>
              </el-row>
            </el-form-item>

            <!-- 五年期 逾期利率倍数输入框 -->
            <el-form-item
              v-if="
                recordItem.overdueFiveYearLPRItemShow && recordItem.overdueRateRadio
              "
            >
              <el-row>
                <el-col :span="8">
                  <el-input
                    type="number"
                    oninput="value=value.replace(/[^\d]/g,'')"
                    placeholder=""
                    clearable
                    style="width: 75%"
                    v-model="recordItem.overdueTimes"
                  >
                    <template #append>倍</template>
                  </el-input>
                </el-col>

                <el-col :span="12">
                  <el-input
                    style="width: 50%"
                    placeholder="输入年份（默认当前年）"
                    v-model="recordItem.overdueLPRYear"
                  >
                    <template #append>年</template>
                  </el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
          <!-- 借款记录展开主要内容下部分按钮 和 收起 -->
          <el-row justify="space-between">
            <el-col :span="8"></el-col>
            <el-col :span="8" @click="recordUnfold(recordKey)">
              <el-icon :size="12"><caret-top /></el-icon>收起
            </el-col>
            <el-col :span="8">
              <el-button type="primary">保存</el-button>
              <el-button type="info">清除</el-button>
            </el-col>
          </el-row>
        </div>

        <!-- 借款记录收起主要内容 -->
        <el-row v-show="recordItem.isFolded">
          <el-col :span="4"> 借款时间：{{}} </el-col>
          <el-col :span="4"> 借款金额 {{}} 元 </el-col>
          <el-col :span="6" @click="recordFold(recordKey)">
            <el-icon :size="8"><caret-bottom /></el-icon>编辑
          </el-col>
          <el-col :span="10">
            <el-button type="primary">复制</el-button>
            <el-button type="info" @click="addBlankRecord"
              >新建空白记录</el-button
            >
            <el-button type="info">删除</el-button>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
#basebox {
  position: relative;
  width: 100%;
  font-size: 2rem;
  display: flex;
  justify-self: start;
  text-align: left;
}

#ruleFormClass {
  background: rgb(250, 250, 250);
  padding: 2rem;
  border: 1px solid gray;
  margin: 1rem 0;
}
.recordTitle {
  font-size: 1.5rem;
}
</style>
