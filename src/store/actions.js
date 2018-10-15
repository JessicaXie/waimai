/*
包含n个用于间接更新状态数据方法的对象
 */
import {
  reqAddress,
  reqFoodCategorys,
  reqShops
} from '../api'

import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT
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
