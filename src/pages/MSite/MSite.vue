<template>
  <div class="msite">
    <!--首页头部-->
    <TopHeader :title="address.name">
      <span class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login" slot="right">
        <span class="header_login_text">登录|注册</span>
      </span>
    </TopHeader>
    <!--首页导航-->
    <nav class="msite_nav" border-1px>
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categorys, index) in categorysArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(category, index) in categorys" :key="index">
              <div class="food_container">
                <img :src="baseImgUrl + category.image_url">
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>

      <ShopList/>
  </div>
</div>
</template>

<script>
import {mapState} from 'vuex'
import Swiper from 'swiper'
import ShopList from '../../components/ShopList/ShopList'

export default {
  data () {
    return {
      baseImgUrl: 'https://fuss10.elemecdn.com'
    }
  },
  mounted () {
    // 获取商家信息
    this.$store.dispatch('getShops')
    // 获取分类
    this.$store.dispatch('getCategorys')
  },
  computed: {
    ...mapState(['address', 'categorys']),

    // 产生一个二维数组, 小数组中元素的最大个数为8
    categorysArr () {
      const {categorys} = this
      const arr = [] // 创建一个二维数组
      let arrsmall = [] // 创建一个二维数组里的一维数组
      // 遍历categorys数组 得到里面的数据，保存到小数组中去
      categorys.forEach(c => {
        if (arrsmall.length === 0) {
          arr.push(arrsmall)
        }
        // 把小数组的值填上
        arrsmall.push(c)
        // 当小数组的长度最大是8
        if (arrsmall.length === 8) {
          arrsmall = []
        }
      })

      return arr
    }
  },
  watch: {
    categorys (value) {
      // 必须在状态数据更新之后执行，此时数据已经更新，但是界面还没有更新
      this.$nextTick(() => {
        // 此时界面更新了，就要初始化轮播
        new Swiper('.swiper-container', {
          loop: true, // 循环模式选项

          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination'
          }
        })
      })
    }
  },
  components: {
    ShopList
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite
    width 100%
    .header
      background-color #02a774
      position fixed
      z-index 100
      left 0
      top 0
      width 100%
      height 45px
      .header_search
        position absolute
        left 15px
        top 50%
        transform translateY(-50%)
        width 10%
        height 50%
        .icon-sousuo
          font-size 25px
          color #fff
      .header_title
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)
        width 50%
        color #fff
        text-align center
        .header_title_text
          font-size 20px
          color #fff
          display block
      .header_login
        font-size 14px
        color #fff
        position absolute
        right 15px
        top 50%
        transform translateY(-50%)
        .header_login_text
          color #fff
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0 10px
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px
</style>
