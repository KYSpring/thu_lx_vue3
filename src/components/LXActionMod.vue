
<script setup>
import { ref } from "vue";
import { ArrowDownBold, ArrowUpBold, Files } from "@element-plus/icons";

defineProps({
  msg: String,
});

const count = ref(0);
const isFolded = ref(false);
const records = ref([{
  index:0,

}])
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
          <span class="iconbox"
            ><el-icon :size="20" style="margin-right: 1rem"><Files /></el-icon
          ></span>
          <span class="boxheader">借款信息</span>
          <el-icon v-if="isFolded" style="margin-left: 1rem"
            ><ArrowUpBold
          /></el-icon>
          <el-icon v-else style="margin-left: 1rem"><ArrowDownBold /></el-icon>
        </el-col>
      </el-row>
      <!-- 循环的借款记录要素部分 -->
        <div id="ruleFormClass" v-show="!isFolded" v-for="(record, key) in records">
          <!-- 借款记录标题部分 -->
          <el-row>
             <span class="recordTitle">借款记录-{{key+1}}</span> 
          </el-row>
          <el-form label-position='right'>
            <el-form-item label='借款时间'> 
              <el-date-picker>

              </el-date-picker>

            </el-form-item>
            <el-form-item label='借款时间'> 
              <el-date-picker>

              </el-date-picker>

            </el-form-item>
          </el-form>
         
          

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
.recordTitle{
  font-size: 1.5rem;
}
</style>
