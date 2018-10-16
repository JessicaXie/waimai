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

// 发送密码登录
export const loginPwd = ({name, pwd, capcha}) => ajax('/api/login_pwd', name, pwd, capcha, 'POST')

// 发送短信登录
export const loginSms = ({phone, code}) => ajax('/api/login_sms', {phone, code}, 'POST')

// 发送退出登录
export const logout = () => ajax('/api/logout')

/**
 * 获取商家信息
 */
export const reqShopInfo = () => ajax('/info')

/**
 * 获取商家评价数组
 */
export const reqShopRating = () => ajax('/rating')

/**
 * 获取商家商品数组
 */
export const reqShopGoods = () => ajax('/goods')
