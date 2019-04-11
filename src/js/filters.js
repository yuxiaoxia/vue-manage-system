import Vue from 'vue'
import store from '../store'
import { formatSecond } from 'util'

export function cityName(id) {
	let data = store.state.cities || []
	let findVal = data.find(item => {
		return item.id == id;
	});
	if (findVal) {
		return findVal.name
	} else {
		return id
	}
}
export function scaleName(id) {
	let data = store.state.scales || []
	let findVal = data.find(item => {
		return item.id == id;
	});
	if (findVal) {
		return findVal.name
	} else {
		return id
	}
}

export function financingLeve(id) {
	let data = store.state.levels || []
	let findVal = data.find(item => {
		return item.id == id;
	});
	if (findVal) {
		return findVal.name
	} else {
		return id
	}
}

export function companyType(id) {
	let data = store.state.companytypes || []
	let findVal = data.find(item => {
		return item.id == id;
	});
	if (findVal) {
		return findVal.name
	} else {
		return id
	}
}

export function workYears(id) {
	let data = store.state.workyears || []
	let findVal = data.find(item => {
		return item.id == id;
	});
	if (findVal) {
		return findVal.name
	} else {
		return id
	}
}
export function employNatures(id) {
	let data = store.state.employnatures || []
	let findVal = data.find(item => {
		return item.id == id;
	});
	if (findVal) {
		return findVal.name
	} else {
		return id
	}
}

export function formatTime(time) {
	return formatSecond(time)
}
export function orderStatus(status) {
	switch (status) {
		case 'orderd':
			return '下单中'
		case 'making':
			return '制作中'
		default:
			return ''
	}
}
export function isInvoice(status) {
	switch (parseInt(status)) {
		case 0:
			return '否'
		case 1:
			return '是'
		default:
			return ''
	}
}
export function schoolNature(status) {
	switch (parseInt(status)) {
		case 0:
			return '普通高校'
		case 1:
			return '211高校'
		case 2:
			return '985高校'
		default:
			return ''
	}
}
export function schoolClass(status) {
	switch (parseInt(status)) {
		case 0:
			return '综合类'
		case 1:
			return '理工类'
		case 2:
			return '文科类'
		case 3:
			return '综合类'
		default:
			return ''
	}
}
export function recordStatus(status) {
	switch (status) {
		case 'NIT':
			return '初始化';
		case 'HANDLING':
			return '处理中';  
		case 'FAIL':
			return '失败';  
		case 'SUCCESS':
			return '成功';  
	}
}

Vue.filter('cityName', cityName)
Vue.filter('scaleName', scaleName)
Vue.filter('financingLeve', financingLeve)
Vue.filter('companyType', companyType)
Vue.filter('formatTime', formatTime)
Vue.filter('orderStatus', orderStatus)
Vue.filter('workYears', workYears)
Vue.filter('employNatures', employNatures)
Vue.filter('isInvoice', isInvoice)
Vue.filter('schoolNature', schoolNature)
Vue.filter('schoolClass', schoolClass)
Vue.filter('recordStatus', recordStatus)


