/*定义发送axios的函数得到promise对象*/
import axios from 'axios'
export const RESULT_OK = 0

export function reqSeller() {
  return axios.get('/api2/seller')
}

export function reqGoods() {
  return axios.get('/api2/goods')
}

export function reqRatings() {
  return axios.get('/api2/ratings')
}
