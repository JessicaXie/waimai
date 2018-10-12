/**
包含n个接口请求函数的模块
*/

import ajax from './ajax'

// 根据经纬度获取位置的详情
export const reqAddress = (geohash) => ajax('/api/position/' + geohash)

// 获取食品分类列表
export const reqFoodCategorys = () => ajax('/api/index_category')

// 根据经纬度获取商铺列表
export const reqShops = ({latitude, longitude}) => ajax('/api/shops', {latitude, longitude})

// 发送手机验证码
export const sendCode = (phone) => ajax('/api/sendcode', {phone})
