<template>
<div class="basic-not-found">
    <div class="exception-content">
    <img :src="imgSrc" class="imgException"/>
    <div>
        <h3 class="title" v-text="title"></h3>
        <p class="description" v-html="description"></p>
				<el-button @click="goBack">返回首页</el-button>
    </div>
    </div>
  </div>
</template>

<script>
const imgSrc = 'https://img.alicdn.com/tfs/TB1txw7bNrI8KJjy0FpXXb5hVXa-260-260.png';
const notFoundTitle = '抱歉，你访问的页面不存在';
const notFoundDescription = '您要找的页面没有找到，请返回<router-link to="/">首页</router-link>继续浏览';
export default {
    name: 'BasicNotFound',
    data() {
			return {
				imgSrc,
				title:notFoundTitle,
				description:notFoundDescription
			}
    },
		methods: {
				goBack(){
						this.$router.go(-1);
				}
		}
}
</script>


<style scoped lang="scss">
.basic-not-found {
	margin: 150px 0;
}
.exception-content {
  display: flex;
  align-items: center;
  justify-content: center;
	.imgException{
		margin-right: 10px;
	}
  .title {
    color: rgb(51, 51, 51);
  }
  .description {
    color: rgb(102, 102, 102);
		margin-bottom: 20px;
  }
}
</style>
