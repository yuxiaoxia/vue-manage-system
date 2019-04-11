import axios from 'axios'
import qs from 'qs'
import bus from '../components/bus';
import router from '../router';
import { Message, MessageBox } from 'element-ui'

const baseUrl = '/'

console.log(baseUrl)

let loading = null

// 创建axios实例
const service = axios.create({
	baseURL: baseUrl, // api的base_url
	timeout: 30000, // 请求超时时间
	responseType: "json",
	withCredentials: true, // 是否允许带cookie
	headers: {
		// "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
		'X-Requested-With': 'XMLHttpRequest',
	}
})
// request拦截器
service.interceptors.request.use(
	config => {
		if (!config.hideLoading) {
			loading = bus.$loading({
				lock: true,
				background: 'rgba(255, 255, 255, 0.6)',
			})
		}
		if (config.method !== "get") {
			// // 将json对象转换成name,value格式
			config.data = qs.stringify(config.data);
		}
		// config.headers['Content-Type'] = config.headers['Content-Type'] ? config.headers['Content-Type'] : 'application/x-www-form-urlencoded';
		return config
	},
	error => {
		loading && loading.close();
		// Do something with request error
		console.log(error) // for debug
		Promise.reject(error)
	}
)

// respone拦截器
service.interceptors.response.use(
	response => {
		console.log(response)
		/**
		 * code为非20000是抛错 可结合自己业务进行修改
		 */
		loading && loading.close();
		const res = response.data
		if (res.code !== 1000) {
			Message({
				message: res.msg || res.desc,
				type: 'error',
				duration: 5 * 1000
			})
			if (res.code === 1004) {
				router.push({name: 'login'})
			}
			return Promise.reject(res.data)
		} else {
			return  Promise.resolve(res.data)
		}
	},
	error => {
		loading && loading.close();
		console.log('err' + error) // for debug
		Message({
			message: error.message,
			type: 'error',
			duration: 5 * 1000
		})
		return Promise.reject(error)
	}
)

export default service
