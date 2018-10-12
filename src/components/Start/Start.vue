<template>
  <div class="star" :class='"star-" + size' >
    <span class="star-item on" v-for="(starArr, index) in starArrs" :key="index" :class="starArr"></span>
  </div>
</template>

<script>
// 定义三个变量来保存星星的样式
const startOn = 'on'
const startHalf = 'half'
const startOff = 'off'

export default {
  props: {
    size: Number, // 星星的大小
    score: Number // 评分
  },
  computed: {
    // 星星样式
    starArrs () {
      // 定义一个星星的数组
      const scs = []

      const {score} = this
      const startInt = Math.floor(score)
      // 当满星的时候
      for (let i = 0; i < startInt; i++) {
        scs.push(startOn)
      }
      // 当半星星的时候
      if (score * 10 - startInt * 10 >= 5) {
        scs.push(startHalf)
      }
      // 灰色的星星
      if (scs.length < 5) {
        scs.push(startOff)
      }
      // 返回这个数组
      return scs
    }

  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./img/star48_on')
        &.half
          bg-image('./img/star48_half')
        &.off
          bg-image('./img/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./img/star36_on')
        &.half
          bg-image('./img/star36_half')
        &.off
          bg-image('./img/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./img/star24_on')
        &.half
          bg-image('./img/star24_half')
        &.off
          bg-image('./img/star24_off')
</style>
