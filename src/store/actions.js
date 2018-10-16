/*
包含n个用于间接更新状态数据方法的对象
 */
import {
  reqAddress,
  reqFoodCategorys,
  reqShops,
  reqShopGoods,
  reqShopInfo,
  reqShopRating
} from '../api'

import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  RECEIVE_INFO,
  RECEIVE_GOODS,
  RECEIVE_RATING
} from './mutation-types'

export default {
  // 异步获取address
  async getAddress ({commit, state}) {
    const {latitude, longitude} = state
    const result = await reqAddress(latitude + ',' + longitude)
    if (result.code === 0) {
      const address = result.data
      // commit交给mutation保存state
      commit(RECEIVE_ADDRESS, {address})
    }
  },
  // 异步获取Categorys
  async getCategorys ({commit}) {
    const result = await reqFoodCategorys()
    if (result.code === 0) {
      const categorys = result.data
      // commit交给mutation保存state
      commit(RECEIVE_CATEGORYS, {categorys})
    }
  },
  // 异步获取shops
  async getShops ({commit, state}) {
    const {latitude, longitude} = state
    const result = await reqShops({latitude, longitude})
    if (result.code === 0) {
      const shops = result.data
      // commit交给mutation保存state
      commit(RECEIVE_SHOPS, {shops})
    }
  },
  // 异步保存商家信息
  async getInfo ({commit}) {
    const result = await reqShopInfo()
    if (result.code === 0) {
      const info = result.data
      // commit交给mutation保存state
      commit(RECEIVE_INFO, {info})
    }
  },
  // 异步保存商品列表信息
  async getGoods ({commit}) {
    const result = await reqShopGoods()
    if (result.code === 0) {
      const goods = result.data
      // commit交给mutation保存state
      commit(RECEIVE_GOODS, {goods})
    }
  },
  // 异步保存商家信息
  async getRatings ({commit}) {
    const result = await reqShopRating()
    if (result.code === 0) {
      const ratings = result.data
      // commit交给mutation保存state
      commit(RECEIVE_RATING, {ratings})
    }
  },
  // 同步保存用户user
  saveUser ({commit}, user) {
    commit(RECEIVE_USER, {user})
  },
  // 同步更新food的数量
  updataFoodCount ({commit}, {isAdd, food}) {
    if (isAdd) {
      commit(INCREMENT_FOOD_COUNT, {food})
    } else {
      commit(DECREMENT_FOOD_COUNT, {food})
    }
  }
}
