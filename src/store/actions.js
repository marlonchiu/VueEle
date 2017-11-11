import {reqSeller, reqGoods, reqRatings, RESULT_OK} from '../api'
import {RECEIVE_SELLER, RECEIVE_GOODS, RECEIVE_RATINGS} from './types'
/*定义获取数据的方法*/
export default {
  // 获取商家信息
  getSeller({commit}){
    // 发送ajax请求
    reqSeller().then(response => {
      const result = response.data
      if(result.code === RESULT_OK){
        const seller = result.data
        // 提交mutation请求
        commit(RECEIVE_SELLER, {seller})
      }
    })
  },
  // 获取商品列表信息
  getGoods({commit}){
    // 发送ajax请求
    reqGoods().then(response => {
      const result = response.data
      if(result.code === RESULT_OK){
        const goods = result.data
        // 提交mutation请求
        commit(RECEIVE_GOODS, {goods})
      }
    })
  },
  // 获取商家信息
  getRatings({commit}){
    // 发送ajax请求
    reqRatings().then(response => {
      const result = response.data
      if(result.code === RESULT_OK){
        const ratings = result.data
        // 提交mutation请求
        commit(RECEIVE_RATINGS, {ratings})
      }
    })
  }

}
