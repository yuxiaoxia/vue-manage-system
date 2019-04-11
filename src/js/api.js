/* global fetch */
import http from './http';

const domain = process.env.NODE_ENV === 'production' ? 'http://admin.yundingjck.com' : 'http://admin.yundingjck.com'
const baseUrl = '/admin/'

export const Api = domain
export const importCompanyUrl = domain + baseUrl + 'company/import'
export const importJobUrl = domain + baseUrl + 'employ/import'
export const qiniuDomain = ''


export function signin(data) {
	return http({
		url: baseUrl + 'customer/login',
		method: 'get',
		params: data,
	})
}
export function loginOut(data) {
	return http({
		url: baseUrl + 'customer/loginOut',
		method: 'get',
		params: data,
	})
}
export function qiniuToken(data) {
	return http({
		url: 'file-token/get',
		method: 'get',
		params: data,
	})
}
// 左侧菜单
export function menuList(data) {
	return http({
		url: baseUrl + 'customer/menuList',
		method: 'get',
		params: data,
	})
}





