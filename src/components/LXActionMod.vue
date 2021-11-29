
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

defineProps({
  msg: String,
});
function recordUnfold(recordKey){
  console.log( records.value[recordKey].isFolded);
  records.value[recordKey].isFolded = true;
}


function recordFold(recordKey) {
  records.value[recordKey].isFolded = false;
  console.log(records.value);
}

// 一个基础的record 数据 ！！仍然不全！只是为了测试添加新记录
let basicRecord = {
  index: 0,
  isFolded: false,
  // 期内利息
  rateRadio: 1, // 选择有无期内利息
  rateSelect: [
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
  ],
  rateSelectValue: 1, // 期内利率种类 值 1，2，3
  stableRateInputShow: true,
  oneYearLPRItemShow: false,
  fiveYearLPRItemShow: false,

  //余期 利息
  overdueRateRadio: 1, // 选择有无余期利息
  overdueRateSelect: [
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
  ],
  overdueRateSelectValue: 1, // 逾期利率种类 值 1，2，3
  overdueStableRateInputShow: true,
  overdueOneYearLPRItemShow: false,
  overdueFiveYearLPRItemShow: false,
};

function addBlankRecord() {
  let tempRecord = deepClone(basicRecord)
  records.value.push(tempRecord);
}

// 传入recordKey 监控每个record 展开情况
function rateSelectChange($event, recordKey) {
  // recordKey 是数组的下标
  switch ($event) {
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

function overdueRateSelectChange($event, recordKey) {
  // recordKey 是数组的下标
  switch ($event) {
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
const count = ref(0);
const isFolded = ref(false);
const records = ref([
  {
    index: 0,
    isFolded: true,
    // 期内利息
    rateRadio: 1, // 选择有无期内利息
    rateSelect: [
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
    ],
    rateSelectValue: 1, // 期内利率种类 值 1，2，3
    stableRateInputShow: true,
    oneYearLPRItemShow: false,
    fiveYearLPRItemShow: false,

    //余期 利息
    overdueRateRadio: 1, // 选择有无余期利息
    overdueRateSelect: [
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
    ],
    overdueRateSelectValue: 1, // 逾期利率种类 值 1，2，3
    overdueStableRateInputShow: true,
    overdueOneYearLPRItemShow: false,
    overdueFiveYearLPRItemShow: false,
  },
]);

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
        v-for="(record, recordKey) in records"
      >
        <!-- 借款记录标题部分 -->
        <el-row>
          <span class="recordTitle">借款记录-{{ recordKey + 1 }}</span>
        </el-row>

        <!-- 借款展开主要内容 -->
        <div v-show="!record.isFolded">
          <el-form label-position="right">
            <el-form-item label="借款时间">
              <el-date-picker></el-date-picker>
            </el-form-item>
            <el-form-item label="到期时间" inline>
              <el-date-picker></el-date-picker>
            </el-form-item>
            <el-form-item label="利息起算时间">
              <el-date-picker></el-date-picker>
            </el-form-item>
            <el-form-item label="借款金额">
              <el-input style="width: 20%">
                <template #append>元</template>
              </el-input>
            </el-form-item>

            <el-form-item label="期内利率">
              <el-radio-group v-model="record.rateRadio">
                <el-radio :label="1">有</el-radio>
                <el-radio :label="0">无</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="期内利率种类" v-if="record.rateRadio">
              <el-select
                v-model="record.rateSelectValue"
                placeholder="请选择"
                @change="rateSelectChange($event, recordKey)"
              >
                <el-option
                  v-for="(item, key) in record.rateSelect"
                  :key="key"
                  :label="item.category"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <!-- 固定利率输入框 -->
            <el-form-item
              label="利率："
              v-if="record.stableRateInputShow && record.rateRadio"
            >
              <el-input style="width: 20%" type="number">
                <template #append>%</template>
              </el-input>
            </el-form-item>

            <!-- 一年期 利率倍数输入框 + 年份输入框 -->
            <el-form-item v-if="record.oneYearLPRItemShow && record.rateRadio">
              <el-row>
                <el-col :span="8">
                  <el-input
                    type="number"
                    oninput="value=value.replace(/[^\d]/g,'')"
                    placeholder=""
                    clearable
                    style="width: 75%"
                  >
                    <template #append>倍</template>
                  </el-input>
                </el-col>

                <el-col :span="12">
                  <el-input
                    style="width: 50%"
                    placeholder="输入年份（默认当前年）"
                  >
                    <template #append>年</template>
                  </el-input>
                </el-col>
              </el-row>
            </el-form-item>

            <!-- 五年期 利率倍数输入框 -->
            <el-form-item v-if="record.fiveYearLPRItemShow && record.rateRadio">
              <!-- <el-input-number style="width: 30%" controls-position="right">
             
            </el-input-number> -->
              <el-input
                type="number"
                oninput="value=value.replace(/[^\d]/g,'')"
                placeholder=""
                clearable
                style="width: 30%"
              >
                <template #append>倍</template>
              </el-input>
            </el-form-item>

            <!-- 余期利息 -->
            <el-form-item label="逾期利率">
              <el-radio-group v-model="record.overdueRateRadio">
                <el-radio :label="1">有</el-radio>
                <el-radio :label="0">无</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="逾期利率种类" v-if="record.overdueRateRadio">
              <el-select
                v-model="record.overdueRateSelectValue"
                placeholder="请选择"
                @change="overdueRateSelectChange($event, recordKey)"
              >
                <el-option
                  v-for="(item, key) in record.overdueRateSelect"
                  :key="key"
                  :label="item.category"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <!-- 固定利率输入框 -->
            <el-form-item
              label="利率："
              v-if="
                record.overdueStableRateInputShow && record.overdueRateRadio
              "
            >
              <el-input style="width: 20%" type="number">
                <template #append>%</template>
              </el-input>
            </el-form-item>

            <!-- 一年期 利率倍数输入框 + 年份输入框 -->
            <el-form-item
              v-if="record.overdueOneYearLPRItemShow && record.overdueRateRadio"
            >
              <el-row>
                <el-col :span="8">
                  <el-input
                    type="number"
                    oninput="value=value.replace(/[^\d]/g,'')"
                    placeholder=""
                    clearable
                    style="width: 75%"
                  >
                    <template #append>倍</template>
                  </el-input>
                </el-col>

                <el-col :span="12">
                  <el-input
                    style="width: 50%"
                    placeholder="输入年份（默认当前年）"
                  >
                    <template #append>年</template>
                  </el-input>
                </el-col>
              </el-row>
            </el-form-item>

            <!-- 五年期 利率倍数输入框 -->
            <el-form-item
              v-if="
                record.overdueFiveYearLPRItemShow && record.overdueRateRadio
              "
            >
              <!-- <el-input-number style="width: 30%" controls-position="right">
             
            </el-input-number> -->
              <el-input
                type="number"
                oninput="value=value.replace(/[^\d]/g,'')"
                placeholder=""
                clearable
                style="width: 30%"
              >
                <template #append>倍</template>
              </el-input>
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
        <el-row v-show="record.isFolded">
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
  /* position: relative;
  width: 100%;
  font-size: 2rem;
  display: flex;
  justify-self: start;
  text-align: left; */
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
