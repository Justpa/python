// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n'
import messages from './common/lang'
import axios from 'axios'
import VueAxios from 'vue-axios'
import initAxios from './api/axios'
import './assets/style/common.scss'
import { XInput, Group, XButton, XHeader, Tab, TabItem, Swiper, SwiperItem, Icon, Checklist, PopupPicker, Selector, Previewer, Spinner,
  Datetime, DatetimePlugin, Cell, ViewBox, Grid, GridItem, Actionsheet, Picker, Toast, ToastPlugin, Confirm, LoadingPlugin, XDialog } from 'vux'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import store from './store/store'
import Highcharts from 'highcharts'
import echarts from 'echarts'
// import FastClick from 'fastclick'

Vue.use(Highcharts)
Vue.use(VueAwesomeSwiper)
Vue.component('spinner', Spinner)
Vue.component('previewer', Previewer)
Vue.component('x-dialog', XDialog)
Vue.use(LoadingPlugin)
Vue.component('confirm', Confirm)
Vue.use(ToastPlugin)
Vue.component('toast', Toast)
Vue.component('picker', Picker)
Vue.component('actionsheet', Actionsheet)
Vue.component('grid', Grid)
Vue.component('grid-item', GridItem)
Vue.component('view-box', ViewBox)
Vue.use(DatetimePlugin)
Vue.component('cell', Cell)
Vue.component('checklist', Checklist)
Vue.component('datetime', Datetime)
Vue.component('selector', Selector)
Vue.component('popup-picker', PopupPicker)
Vue.component('icon', Icon)
Vue.component('swiper-item', SwiperItem)
Vue.component('swiper', Swiper)
Vue.component('tab', Tab)
Vue.component('tab-item', TabItem)
Vue.component('x-input', XInput)
Vue.component('group', Group)
Vue.component('x-button', XButton)
Vue.component('x-header', XHeader)
Vue.use(VueI18n)
Vue.use(VueAxios, axios)
// FastClick.attach(document.body)

const i18n = new VueI18n({
  locale: 'en-US',
  messages
})

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
// Vue.prototype.$allRequest = []
//
// router.beforeEach((to, from, next) => {
//   console.log(this.$allRequest)
//   // this.$allRequest.forEach((ele, index) => {
//   //   ele.cancel()
//   //   delete window._axiosPromiseArr[index]
//   // })
//   next()
// })

/* eslint-disable no-new */
initAxios(new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: {App},
  template: '<App/>'
}))
