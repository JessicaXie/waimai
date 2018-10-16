/*
自定义过滤器的模块
 */
import Vue from 'vue'
import moment from 'moment'

// 定义全局时间格式
Vue.filter('date-format', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(value).format(format)
})
