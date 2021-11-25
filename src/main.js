import { createApp } from 'vue'
import { createStore, Store } from 'vuex'
import App from './App.vue'
import { ElButton } from 'element-plus'

const LXStore = createStore({
    state () {
      return {
        count:0,
        LXInfo:{
          isNatural: true,
          isContractStart: true,
          prosecutionTime: '',
          acceptanceTime:'',
          isLiquidatedDamage:0,
        },
        LXAction:{
            LXLoan:{},
            LXRepayment:{}
        },
        LXBalance:{}
      }
    },
    getters:{

    },
    mutations: {
      increment (state) {
        state.count++
      }
    }
});

const app = createApp(App).mount('#app')
app.use(LXStore);
app.config.globalProperties.$ELEMENT = {
    // options
    // 可以传入一个包含 size 和 zIndex 属性的全局配置对象。 size 用于设置表单组件的默认尺寸，zIndex 用于设置弹出组件的层级，zIndex 的默认值为 2000。
    
}
app.use(ElButton);
