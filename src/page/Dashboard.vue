<template>
    <div>
        <div class="info">
            欢迎来到后台管理系统
        </div>
    </div>
</template>

<script>
import Api from 'api'
	export default {
		name: 'dashboard',
		data() {
			return {
				name: localStorage.getItem('ms_username'),
				list: [],
			}
		},
		computed: {
			role() {
				return this.name === 'admin' ? '超级管理员' : '普通用户';
			},
			newdate () {
				return new Date().toLocaleDateString()
			}
		},
		methods: {
		},
		beforeRouteEnter (to, form, next) {
			next(vm => {
			})
		},
	}

</script>


<style scoped lang="scss">
    .info {
        background: rgba(66,185,131,.1);
        border-radius: 2px;
        padding: 16px;
        word-spacing: .05rem;
    }
    .card{
        display: flex;
    }
    .cart-icon{
        background: #f4516c;
        color: #fff;
        margin: 14px 0 0 14px;
        padding: 16px;
        width: 24px;
        height: 24px;
        .icon{
            color: #fff;
        }
        .card-panel-icon-wrapper{
            color: #fff;
        }
    }

</style>
