import { createApp, ref } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'

const store = createStore({
    state () {
      return {
        LXInfo:{
          isNatural: ref(true),
          isContractStart: ref(true),
          contractStartTime:ref('2020-1-1'),
          prosecutionTime: ref(''),
          acceptanceTime:ref(''),
          isLiquidatedDamage:ref(true),
          liquidatedDamage:ref(0),
        },
        LXAction:[//借还款记录
          {
            index: 0,//与records中的索引保持一致[待定：尽量删除]
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
        ],
      }
    }
});

const app = createApp(App)
app.use(store)
app.config.globalProperties.$ELEMENT = {
    // options
    // 可以传入一个包含 size 和 zIndex 属性的全局配置对象。 size 用于设置表单组件的默认尺寸，zIndex 用于设置弹出组件的层级，zIndex 的默认值为 2000。   
}
app.mount('#app')
