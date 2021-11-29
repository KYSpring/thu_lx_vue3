
# THU LX计算项目前端工程

产品需求文档为：
[《产品需求1124+要素》](https://www.yuque.com/docs/share/7af028e0-97a6-45df-8314-4023394c58df?# )

语雀地址：https://www.yuque.com/docs/share/7af028e0-97a6-45df-8314-4023394c58df?# 

## 常用命令行

### 1. 安装和启动本项目
```
cd thu_lx_vue3
npm install
npm run dev
```
### 2. 创建新component组件
```
npm run newpage “模块名称" （无需.vue后缀）
```

## 前后端数据协议
- 本项目采用vuex管理所有数据,并且通过vuex实现页面视图和业务数据的隔离，任何组件都可以直接操作vuex中的数据，最终向后端发起的数据只信任vuex中的数据，不信任组件中的临时变量。
- 所有数据统一注册在main.js中的createStore函数中的state()中。
```
const store = createStore({
    state () {
      return {
        LXInfo:{
          isNatural: ref(true),
          isContractStart: ref(true),
          contractStartTime:ref(''),
          prosecutionTime: ref(''),
          acceptanceTime:ref(''),
          isLiquidatedDamage:ref(true),
          liquidatedDamage:ref(0),
        },
        LXAction:[
            {
              LXLoan:{},
              LXRepayment:{}
            }
        ],
        LXBalance:{}
      }
    }
});
```
- vuex中直接存储响应式ref数据，便于直接在组件中直接使用；

## 前端UI组件使用
- 除了icon组件之外的其他组件已经实现自动化引入，无需额外的import,例如：
```
<el-radio-group v-model="ruleForm.isNatural">
    <el-radio :label="true">是</el-radio>
    <el-radio :label="false">否</el-radio>
</el-radio-group>

<!-- 可以直接在模版中使用，无需在script中import -->
```
- 使用element-ui官方组件库element-plus/icons，按需引入，参考代码如下：
```
import {ArrowDownBold} from '@element-plus/icons'// 引入

<el-icon><arrowDownBold /></el-icon> // 使用

// 注意：element-ui迁移到svg类型库后，原始官网的参考代码需要修改为驼峰命名
```
## 关于布局
由于本项目目标为嵌入其他系统内部使用，故此需要充分考虑自适应问题：
- 通过媒体查询实现了根据页面宽度自适应。
- 项目内除边框宽度外，切忌使用px等绝对单位，全部使用rem和百分数作为长度单位。

## git提交代码要求
- 目前的开发分支为commondev，另外为新建有xieziheng分支、liutianyi分支，请务必在各自名字下的分支进行开发和提交远程代码；
- 各自分配的模块开发完成后再提交到commondev分支上，切忌开发中途就合并到commondev分支！
- 切忌在main分支上直接进行开发或提交到远程仓库！！！（由于免费版无法设置分支权限，强烈建议大家在git push之前先使用git branch查看自己所在的分支名，确认不是main分支后再提交）
- git commit -m "描述信息" 中的描述信息建议按如下格式填写：“王少春：更新LXInfoMod模块”（即：姓名+具体动作）

git常用命令：
```
git branch // 查看当前分支名称
git clone git@github.com:KYSpring/thu_lx_vue3.git //(建议使用ssh进行分支下载，https可能存在失败的情况)
git checkout 分支名 //切换分支
git add . //在本地仓库检查最新编辑的代码进入缓存状态；
git commit -m “描述信息” //在本地仓库更新最新编辑的代码（此过程不太可逆，请慎重）
git push //向远程仓库提交代码（此过程将覆盖远程仓库代码，请慎重）
```
- 

## Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

### Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)
