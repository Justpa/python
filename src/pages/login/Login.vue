<template>
  <div class="bg-class h-per-100 flex-column">
    <view-box ref="viewBox" class="h-per-100 flex-column p-a-20 p-b-0">
      <div class="flex-grow">
      <div class="m-t-50 flex-row justify-content-space-between">
        <div class="w-per-20">
          <img src="../../assets/img/loginpage-icon.png" class="w-50"/>
        </div>
        <div class="w-per-60 color-white font-size-24">{{$t("message.loginTitle")}}</div>
        <div class="w-per-20 flex-row align-items-center justify-content-end">
          <div class="h-25 w-40 bg-color-white flex-row border-l-class">
            <div class="m-auto font-size-14 color-kpmgBlue">
              {{$t("message.langEn")}}
            </div>
          </div>
          <div class="h-25 w-40 border-a-loginInputBorder flex-row no-border-left">
            <div class="m-auto font-size-14 color-white">
              {{$t("message.langCn")}}
            </div>
          </div>
        </div>
      </div>
       <div class="m-t-60 color-white font-size-40">{{$t("message.login")}}</div>
        <div class="m-t-50 flex-column login-input">
          <group class=" m-a-0">
            <x-input placeholder=" ID / Passport / Email Address" v-xfocus v-model="params.loginUserName"
                     class="border-a-loginInputBorder color-white input-bg"></x-input>
          </group>
          <group class="m-t-30">
            <x-input type="password" placeholder=" Password"  v-model="params.password" v-xfocus class="border-a-loginInputBorder color-white input-bg"></x-input>
          </group>
        </div>
        <div class="m-t-50 flex-row">
          <div class="w-per-50 p-a-10 p-l-0">
            <x-button :disabled="false" class="h-50 w-per-100 font-size-16 bg-color-white" @click.native="login">
              <span class="color-kpmgBlue-no-important">{{$t("message.loginLeftBtn")}}</span>
            </x-button>
          </div>
          <div class="w-per-50 p-a-10 p-r-0">
            <x-button  class="h-50 w-per-100 font-size-16 color-white btn-bg" @click.native="forgotPsd">{{$t("message.loginRightBtn")}}
            </x-button>
          </div>
        </div>
        <toast :is-show-mask="true" v-model="exitToast" :text="toastMsg" type="text" :time="2000" width="15em" position="middle"></toast>
    </div>
    </view-box>
    <!-- loading -->
    <loading-component v-if="$store.state.loadingFlag"></loading-component>
  </div>
</template>

<script>
// import { loginByName } from './api.js'
import util from '../../common/util/util'
import { TransferDomDirective as TransferDom } from 'vux'
import loadingComponent from '../../components/LoadingCompoent'

export default {
  name: 'login',
  components: {loadingComponent},
  data () {
    return {
      params: {
        loginUserName: '',
        password: '',
        role: 'Employee'
      },
      // 安卓还是ios
      mobileFlag: '',
      // 键盘的状态
      keyboardFlag: this.$store.state.keyboardFlag,
      beginDate: '',
      // 是否显示toast
      exitToast: false,
      toastMsg: this.$t('message.exitApp')
    }
  },
  directives: {
    TransferDom,
    'xfocus' (el, binding, vnode) {
      let xinput = el.querySelector('input')
      xinput.onfocus = function () {
        xinput.parentElement.parentElement.style.borderColor = 'white'
        xinput.parentElement.parentElement.style.backgroundColor = '#00217b'
      }
      xinput.onblur = function () {
        xinput.parentElement.parentElement.style.borderColor = '#345eaa'
        xinput.parentElement.parentElement.style.backgroundColor = '#013492'
      }
    }
  },
  mounted () {
    this.mobileFlag = util.isMobile()
    if (this.mobileFlag === 'android') {
      document.addEventListener('deviceready', this.onDeviceReady, false)
    }
  },
  methods: {
    onDeviceReady () {
      // 监听安卓物理返回键
      document.addEventListener('backbutton', this.onBackKeyDown, false)
    },
    login () {
      console.log(1)
      this.$router.push('home')
      // this.$store.commit('setLoadingFlag', true)
      // loginByName(this.params).then(result => {
      //   if (result['status'] === 200 && result['data']['success']) {
      //     window.localStorage.setItem('userInfo', JSON.stringify(result['data']['data']))
      //     window.localStorage.setItem('employeeId', JSON.stringify(result['data']['data']['employeeId']))
      //     window.localStorage.setItem('userName', JSON.stringify(result['data']['data']['userName']))
      //     this.$store.commit('setLoadingFlag', false)
      //     this.$router.push('home')
      //   }
      // })
    },
    forgotPsd () {
      window.localStorage.removeItem('userInfo')
    },
    onBackKeyDown () {
      // 判断键盘是否弹出
      if (this.keyboardFlag) {
        this.$store.commit('setKeyboardFlag', false)
      } else if (this.showConfirm) {
        this.showConfirm = false
      } else {
        this.shutdown()
      }
    },
    shutdown () {
      // 关闭程序
      const endDate = new Date().getTime()
      if (this.exitToast && endDate - this.beginDate < 2000) {
        this.beginDate = endDate
        this.exitToast = false
        navigator.app.exitApp()
      } else this.toast()
    },
    toast () {
      this.exitToast = true
      this.beginDate = new Date().getTime()
    }
  },
  destroyed () {
    document.removeEventListener('deviceready', this.onDeviceReady)
    if (this.mobileFlag === 'android') {
      document.removeEventListener('backbutton', this.onBackKeyDown)
    }
    this.$store.commit('setLoadingFlag', false)
  }
}
</script>

<style scoped lang="scss">
  @import '../../assets/style/variables/color';

  .m-t-50 {
    margin-top: 1rem;
  }

  .w-50 {
    width: 1rem;
  }

  .no-border-left {
    border-left: none;
  }

  .border-l-class{
    border: 1px solid $white;
  }

  .bg-color-white {
    background-color: white;
  }

  .color-kpmgBlue-no-important {
    color: $kpmgBlue;
  }

  .color-disable {
    color: $kpmgBlue;
    opacity: 0.5;
  }

  .m-t-60 {
    margin-top: 1.2rem;
  }

  .border-a-loginInputBorder {
    border: 1px solid $loginInputBorder;
  }
  .border-a-white{
    border: 1px solid $white;
  }

  .input-bg {
    background-color: $loginInputbg;
  }

  .btn-bg {
    background-color: $loginForgetPsdBtnBg;
  }
  .p-b-0{
    padding-bottom: 0rem;
  }

</style>
