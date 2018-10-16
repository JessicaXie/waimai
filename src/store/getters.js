/*
包含n个getter计算属性方法的对象
*/
export default {
  // 差评的数量
  badRatings (state) {
    return state.ratings.reduce((pre, rating) => pre + (rating.rateType === 1 ? 1 : 0), 0)
  }
}
