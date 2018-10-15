<template>
  <div class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: LoginWay}" @click="LoginWay=true">短信登录</a>
          <a href="javascript:;" :class="{on: !LoginWay}" @click="LoginWay=false">密码登录</a>
        </div>
      </div>
      <div class="login_content" >
        <form>
          <div :class="{on: LoginWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button :disabled=" !isTruePhone || computeTime>0" class="get_verification" :class="{on: isTruePhone}" @click="sendCode">
                {{computeTime>0 ? `已发送（${computeTime}）s `: '获取验证码' }}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on: !LoginWay}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名">
              </section>
              <section class="login_verification">
                <input :type="showPWD ? 'text':'password'" maxlength="8" placeholder="密码">
                <div class="switch_button" :class="showPWD ? 'on': 'off'" @click="showPWD=!showPWD">
                  <div class="switch_circle" :class="{right: showPWD}"></div>
                  <span class="switch_text">{{showPWD? 'abc':'...'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码">
                <img class="get_verification" src="http://localhost:4000/captcha?" alt="captcha" @click="changeCapcha">
              </section>
            </section>
          </div>
          <button class="login_submit" @click="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <span href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </span>
    </div>
  </div>

</template>

<script>
import {MessageBox} from 'mint-ui'
import {sendCode, loginPwd, loginSms} from '../../api'
export default {
  data () {
    return {
      phone: '', // 手机号
      computeTime: 0, // 倒计时
      LoginWay: false, // 短信：true，密码：false
      showPWD: false, // 是否显示密码
      code: '', // 短信验证码
      capcha: '', // 图形验证码
      name: '', // 用户名
      pwd: '' // 密码
    }
  },
  computed: {
    isTruePhone () {
      return /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.phone)
    }
  },
  methods: {
    // 获取手机验证码
    async sendCode () {
      // 将验证码发送到手机上
      // 发送ajax请求
      const result = await sendCode(this.phone)
      if (result.code === 1) {
        // 这里表示发送失败
      }

      // 启动倒计时定时器，每隔1秒减少1
      console.log(1111)
      this.computeTime = 30
      // 启动循环定时器
      const intervalId = setInterval(() => {
        if (this.computeTime < 0) {
          clearInterval(intervalId)
          return
        }
        this.computeTime--
      }, 1000)
    },
    // 切换验证图片
    changeCapcha (event) {
      event.target.src = 'http://localhost:4000/captcha?time' + Date.now()
    },
    // 登录
    async login () {
      let result
      const {LoginWay, isTruePhone, code, name, pwd, capcha, phone} = this
      // 这里是前台验证(静态页面验证)：先要知道是那种登录方式
      if (LoginWay) { // loginWay:true是短信登录
        // 验证的信息有：手机号是否是手机号的格式，验证码是否是6位数值
        if (!isTruePhone) {
          // 这里要提示手机号码格式不对
          console.log('手机号码有误！')
          return MessageBox.alert('请输入正确手机号')
        } else if (!/^\d{6}$/.test(code)) {
          // 这里提示验证码不对
          return MessageBox.alert('请输入正确验证码')
        }
        // 前台验证成功，发送请求
        result = await loginSms({phone, code})
      } else { // 这里是密码登录
        // 判断验证码是否是4位，密码和name不能为空
        if (!name.trim() || !pwd.trim()) {
          // 这里要提示手机号码格式不对
          return MessageBox.alert('请输入用户名不能为空')
        } else if (!/^.{4}$/.test(capcha)) {
          // 这里要提示验证码不对
          return MessageBox.alert('验证码不正确')
        }
        // 前台验证成功，发送请求
        result = await loginPwd({name, pwd, capcha})
      }
      // 得到最后返回的结果
      if (result.code === 0) {
        // 将得到的信息保存到状态数据中（及更新start）
        const user = result.data
        this.$store.dispatch('saveUser', user)
        // 跳转到个人中心界面
        this.$router.replace('/profile')
      } else {
        MessageBox.alert(result.msg)
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.on
                  color #000
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(27px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999

</style>
