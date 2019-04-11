import { qiniuToke } from 'api'
import * as types from './mutation-types'
export default {
    async getQiniuToken({ commit }) {
        await qiniuToken()
            .then(result => {
                commit(types.GET_TOKEN, result.data)
            })
            .catch(error => {
                console.log('获取token出错', error)
            })
    },
}
