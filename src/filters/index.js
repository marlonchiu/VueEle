/*自定义处理日期的方法*/
import Vue from 'vue'
import moment from 'moment'

// 注册全局过滤器
Vue.filter('date-string', function (value ,format) {
  return moment(value).format(format || 'YYYY-MM-DD HH:mm:ss')
})
