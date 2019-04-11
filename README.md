# manage-system #
基于Vue + Vuex +Element UI + axios 的后台管理系统解决方案，快速搭建后台管理系统

### 介绍 ###

基于vue.js，使用vue-cli脚手架快速生成项目目录，引用Element UI组件库。分离颜色样式，支持手动切换主题色，而且很方便使用自定义主题色。
引入axios，对ajax请求进行简单封装，加入了常用的工具库函数，常用的正则表达式，需要的话直接引入即可

```
// js/http.js
// axios请求前加入loading加载，请求成功移除，可传入参数是否需要loading加载样式
if (!config.hideLoading) {
	loading = bus.$loading({
		lock: true,
		background: 'rgba(255, 255, 255, 0.6)',
	})
}

```
```
// api.js 可设置请求接口
const domain = process.env.NODE_ENV === 'production' ? 'http://admin.com/' : 'http://admin.com/'
const baseUrl = '/admin/'

export function signin(data) {
	return http({
		url: baseUrl + 'customer/login',
		method: 'get',
		params: data,
	})
}
// 使用
import { signin } from 'api'

async login() {
	signin({
		account: this.user.username,
		pwd: md5(this.user.password),
	}).then((data) => {
		
	})
}

```
引入了NProgress.js 加顶部线性加载条
```
// router/index.js
router.beforeEach((to, from, next) => {
    NProgress.start();
})
router.afterEach(() => {
    NProgress.done();
});
```
本地环境开启代理
```
// config/index.js
proxyTable: {
	'/': {
		target: 'http://admin.yundingjck.com',
		pathRewrite: {'^/api' : ''},
		secure: false,
		changeOrigin: true,
	},
}

```
### 安装步骤 ###
```
git clone https://github.com/yuxiaoxia/vue-manage-system.git      // 把模板下载到本地
cd vue-manage-system   // 进入模板目录
npm install         // 安装项目依赖，等待安装完成之后
```
### 本地开发 ###

```
// 开启服务器，浏览器访问 http://localhost:8080
npm run dev
```
### 构建生产 ###
```
// 执行构建命令，生成的dist文件夹放在服务器下即可访问
npm run build
```
### 如何切换主题色呢？ ###

第一步：打开 src/main.js 文件，找到引入 element 样式的地方，换成浅绿色主题。

```javascript
import 'element-ui/lib/theme-default/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
```

第二步：打开 src/App.vue 文件，找到 style 标签引入样式的地方，切换成浅绿色主题。

```javascript
@import "../static/css/main.css";
@import "../static/css/color-dark.css";     /*深色主题*/
/*@import "../static/css/theme-green/color-green.css";   !*浅绿色主题*!*/
```

第三步：打开 src/components/common/Sidebar.vue 文件，找到 el-menu 标签，把 background-color/text-color/active-text-color 属性去掉即可。

### element-ui ###
一套基于vue.js2.0的桌面组件库。访问地址：[element](http://element.eleme.io/#/zh-CN/component/layout)

### 其他组件可自行安装使用  ###

一个封装了 cropperjs 的 Vue 组件，用于裁剪图片。访问地址：[vue-cropperjs](https://github.com/Agontuk/vue-cropperjs)

基于Vue的markdown编辑器。访问地址：[mavonEditor](https://github.com/hinesboy/mavonEditor)

基于Quill、适用于Vue2的富文本编辑器。访问地址：[vue-quill-editor](https://github.com/surmon-china/vue-quill-editor)（IE10及以下不支持）

vue.js封装sChart.js的图表组件。访问地址：[vue-schart](https://github.com/linxin/vue-schart)