/*使用mockjs来模拟数据接口*/
import Mock from 'mockjs'
import apiData from './data.json'
// 映射几个接口
Mock.mock('/api2/goods', {
  code: 0,
  data: apiData.goods
})
Mock.mock('/api2/ratings', {
  code: 0,
  data: apiData.ratings
})
Mock.mock('/api2/seller', {
  code: 0,
  data: apiData.seller
})
