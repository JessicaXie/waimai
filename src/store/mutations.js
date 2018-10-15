/*
包含n个用于直接更新状态数据方法的对象
 */
import Vue from 'vue'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT
} from './mutation-types'

export default {
  [RECEIVE_ADDRESS] (state, {address}) {
    state.address = address
  },
  [RECEIVE_CATEGORYS] (state, {categorys}) {
    state.categorys = categorys
  },
  [RECEIVE_SHOPS] (state, {shops}) {
    state.shops = shops
  },
  [RECEIVE_USER] (state, {user}) {
    state.user = user
  },
  [INCREMENT_FOOD_COUNT] (state, {food}) {
    if (food.count) {
      food.count++
    } else {
      // food.count =1
      // 这里是给响应式对象添加一个新的响应式属性，那就可以用Vue.set(),不懂查看Vue文档
      Vue.set(food, 'count', 1)
    }
  },
  [DECREMENT_FOOD_COUNT] (state, {food}) {
    if (food.count) {
      food.count--
    }
  }
}
