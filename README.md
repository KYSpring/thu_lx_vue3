
# THU LX计算项目前端工程

## 常用命令行

### 1. 安装和启动本项目
```
cd thu_lx_vue3
npm install
npm run dev
```
### 2. 创建新component组件
```
npm run newpage “模块名称"
```

## 前后端数据协议
- 本项目采用vuex管理所有数据,并且通过vuex实现页面视图和业务数据的隔离，任何组件都可以直接操作vuex中的数据，最终向后端发起的数据只信任vuex中的数据，不信任组件中的临时变量。
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

## Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

### Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)
