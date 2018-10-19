<template>
  <div class="h-per-100">
    <!--<transition name="router-fade" mode="out-in">-->
      <!--<router-view></router-view>-->
    <!--</transition>-->

    <keep-alive>
      <!--会被缓存的视图组件-->
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <!--不会被缓存的视图组件-->
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import util from './common/util/util'
export default {
  name: 'app',
  data () {
    return {
    }
  },
  mounted () {
    const username = window.localStorage.getItem('username')
    if (username) {
      // this.$router.replace('home')
    } else {
      // this.$router.replace('login')
    }
    const mobileFlag = util.isMobile()
    if (mobileFlag === 'android') {
      document.addEventListener('deviceready', this.keyboardInit, false)
    }
  },
  methods: {
    keyboardInit () {
      window.addEventListener('native.keyboardhide', this.keyboardHideHandler)
      window.addEventListener('native.keyboardshow', this.keyboardShowHandler)
    },
    keyboardHideHandler () {
      setTimeout(() => {
        this.$store.commit('setKeyboardFlag', false)
      }, 100)
    },
    keyboardShowHandler () {
      this.$store.commit('setKeyboardFlag', true)
    }
  }
}
</script>

<style lang="less" scoped>
  /*@import '~vux/src/styles/1px.less';*/
  .router-fade-enter-active, .router-fade-leave-active {
      transition: opacity .1s;
  }

  .router-fade-enter, .router-fade-leave-active {
    opacity: 0;
  }
</style>
