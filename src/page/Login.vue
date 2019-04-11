<template>
	<div class="user-login">
		<div class="user-login-bg" :style="{'background-image':`url(${backgroundImage})`}"></div>
		<div class="content-wrapper">
			<h2 class="slogan">
				欢迎使用 <br /> 管理系统
			</h2>
			<div class="form-container">
				<h4 class="form-title">{{isLogin ? '登录':'注册'}}</h4>
				<el-form ref="form" :model="user" label-width="0">
					<div class="form-items">
						<el-row class="form-item">
							<el-col>
								<el-form-item prop="username" :rules="[ { required: true, message: '会员名/邮箱/手机号不能为空'}]">
									<el-input placeholder="会员名/邮箱/手机号" v-model="user.username" size="medium"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row class="form-item">
							<el-col>
								<el-form-item prop="password" :rules="[ { required: true, message: '密码不能为空'}]">
									<el-input type="password" placeholder="密码" v-model="user.password" size="medium"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row class="form-item" v-if="!isLogin">
							<el-col>
								<el-form-item prop="confirm_password" :rules="[ { required: true, message: '密码不能为空'}]">
									<el-input type="password" placeholder="确认密码" v-model="user.confirm_password"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row class="form-item">
							<el-col>
								<!--<el-form-item>
									<el-checkbox class="checkbox">记住账号</el-checkbox>
								</el-form-item>-->
								<!--<el-form-item>
									<span style="cursor: pointer;" @click="isLogin = !isLogin">{{isLogin ? '注册账号': '登录'}}</span>
								</el-form-item>-->
							</el-col>
						</el-row>
						<el-row class="form-item">
							<el-button type="primary" class="submit-btn" size="medium" @click="submitBtn('form')">
								{{isLogin ? '登录': '注册'}}
							</el-button>
						</el-row>
					</div>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
import md5 from 'md5'
import { signin } from 'api'
import { Message, MessageBox } from 'element-ui'
const backgroundImage = 'https://img.alicdn.com/tfs/TB1zsNhXTtYBeNjy1XdXXXXyVXa-2252-1500.png';
export default {
	data: function() {
		return {
			backgroundImage: backgroundImage,
			user: {
				username: '',
				password: '',
				confirm_password: '',
			},
			rules: {
				username: [
					{ required: true, message: '请输入用户名', trigger: 'blur' }
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' }
				]
			},
			isLogin: true,
		}
	},
	methods: {
		async login() {
			signin({
				account: this.user.username,
				pwd: md5(this.user.password),
			}).then((data) => {
				localStorage.setItem('ms_username', this.user.username);
				Message({
					message: data.msg,
					type: 'success',
					duration: 1 * 200
				})
				setTimeout(()=> {
					window.location.href = '/'
				}, 200)
			})
		},
		async submitBtn(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					if(this.isLogin) {
						this.login()
					} else {
						this.register()
					}
				} else {
					return false;
				}
			});
		}
	}
}
</script>

<style scoped lang="scss">
.user-login {
	.user-login-bg {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-size: cover;
	}
	.el-checkbox__label {
		color: #999;
		font-size: 13px;
	}
	.content-wrapper {
		position: absolute;
		top: -100px;
		left: 0;
		right: 0;
		bottom: 0;
		max-width: 1080px;
		margin: 0 auto;
		display: flex;
		justify-content: space-around;
		align-items: center;
		.slogan {
			text-align: center;
			color: #fff;
			font-size: 36px;
			letter-spacing: 2px;
			line-height: 48px;
		}
	}
	.form-container {
		display: flex;
		justify-content: center;
		flex-direction: column;
		padding: 30px 40px;
		background-color: #fff;
		border-radius: 6px;
		box-shadow: 1px 1px 2px #eee;
	}
	.el-form-item {
		margin-bottom: 25px;
	}
	.form-Item {
		position: relative;
		flex-direction: column;
	}

	.el-input {
		width: 240px;
	}
	.form-title {
		margin: 0 0 20px;
		text-align: center;
		color: #3080fe;
		letter-spacing: 12px;
		font-weight: 500;
		font-size: 18px;
	}
	.input-icon {
		color: #999;
	}
	.checkbox {
		margin-left: 5px;
	}
	.submit-btn {
		margin-bottom: 25px;
		width: 100%;
		background: #3080fe;
		border-radius: 28px;
	}
	.link {
		color: #999;
		text-decoration: none;
		font-size: 13px;
	}
	.line {
		color: #dcd6d6;
		margin: 0 8px;
	}
}
</style>