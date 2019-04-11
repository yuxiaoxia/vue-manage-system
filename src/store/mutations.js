import * as types from './mutation-types'

/*
* 工厂函数，用以返回一个包含 mutation 函数的对象，使用的时候再结构
*/
function mutationFac (mutationType, stateAttrName) {
  return {
    [mutationType] (state, payload) {
      state[stateAttrName] = {
        ...state[stateAttrName],
        ...payload,
      }
    },
  }
}
export default {
   [types.GET_TOKEN] (state, payload) {
        state.qiniutoken = payload
    },
}