
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
- 本项目采用vuex管理所有数据；

## 前端UI组件使用
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
