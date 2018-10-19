<template>
  <div class="h-per-100 bg-class flex-column position-relative">
    <div class="p-a-10 overflow-y-scroll flex-grow">
    <div class="h-40 m-t-5 flex-row justify-content-space-between">
      <div>
        <img src="../../assets/img/icon-userconfiguration.png" class="w-30">
      </div>
      <div>
        <img src="../../assets/img/index-logo-kpmg-white.png" class="w-60">
      </div>
    </div>
    <div class="flex-column m-t-5">
      <div class="color-white font-size-24">{{fullName}}</div>
      <div class="color-whiteLight font-size-14">{{companyBranchName}}</div>
    </div>
    <div class="flex-column m-t-20">
      <div class="flex-row">
        <div class="p-r-5 p-b-5 w-per-50">
          <div class="w-per-100 bg-white height-class border-radius-class" @click="goPage('personalDetails')">
            <div class="h-per-50 p-l-20">
              <img src="../../assets/img/home-icon-01.png" class="w-60">
            </div>
            <div class="h-per-50 p-l-20 p-r-20 flex-column">
              <div class="font-size-22 color-letter">{{$t("message.personalDetial")}}</div>
            </div>
          </div>
        </div>
        <div class="p-l-5 p-b-5 w-per-50">
          <div class="w-per-100 bg-white height-class border-radius-class" @click="goPage('contractUploadHome')">
            <div class="h-per-50 p-l-20">
              <img src="../../assets/img/home-icon-02.png" class="w-60">
            </div>
            <div class="h-per-50 p-l-20 p-r-20 flex-column">
              <div class="font-size-22 color-letter">{{$t("message.contractUpload")}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-row">
        <div class="p-r-5 p-b-5 p-t-5 w-per-50">
          <div class="w-per-100 bg-white height-class border-radius-class" @click="goPage('fapiaoUpload')">
            <div class="h-per-50 p-l-20">
              <img src="../../assets/img/home-icon-03.png" class="w-60">
            </div>
            <div class="h-per-50 p-l-20 p-r-20 flex-column">
              <div class="font-size-22 color-letter">{{$t("message.fapiaoUpload")}}</div>
            </div>
          </div>
        </div>
        <div class="p-l-5 p-b-5 p-t-5 w-per-50">
          <div class="w-per-100 bg-white height-class border-radius-class" @click="goPage('trendAnalysis')">
            <div class="h-per-50 p-l-20">
              <img src="../../assets/img/home-icon-04.png" class="w-60">
            </div>
            <div class="h-per-50 p-l-20 p-r-20 flex-column">
              <div class="font-size-22 color-letter">{{$t("message.trendAnalysis")}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-row">
        <div class="p-r-5 p-b-5 p-t-5 w-per-50">
          <div class="w-per-100 bg-white height-class border-radius-class" @click="goPage('businessTravelTracker')">
            <div class="h-per-50 p-l-20">
              <img src="../../assets/img/home-icon-05.png" class="w-60">
            </div>
            <div class="h-per-50 p-l-20 p-r-10 flex-column">
              <div class="font-size-22 color-letter">{{$t("message.businessTravelTracker")}}</div>
            </div>
          </div>
        </div>
        <div class="p-l-5 p-b-5 p-t-5 w-per-50">
          <div class="w-per-100 bg-white height-class border-radius-class" @click="goPage('notificationsAndGuidance')">
            <div class="h-per-50 p-l-20">
              <img src="../../assets/img/home-icon-06.png" class="w-60">
            </div>
            <div class="h-per-50 p-l-20 p-r-20 flex-column">
              <div class="font-size-22 color-letter">{{$t("message.notificationAndGuidance")}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      fullName: '',
      companyBranchName: ''
    }
  },
  mounted () {
    const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
    this.fullName = userInfo['fullName']
    this.companyBranchName = userInfo['companyBranchName']
  },
  methods: {
    goPage (pageName) {
      this.$router.push(pageName)
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$store.commit('setLoadingFlag', false)
    // 设置下一个路由的 meta
    if (to.name === 'BusinessTravelTracker' || to.name === 'FapiaoUpload') {
      to.meta.isBack = false
    }
    next()
  }
}
</script>

<style scoped lang="scss">
  @import '../../assets/style/variables/color';

  .w-30 {
    width: 0.6rem;
  }

  .w-60 {
    width: 1.2rem;
  }

  .color-whiteLight {
    color: $whiteLight;
  }

  .color-letter {
    color: $homeLetterColor;
  }

  .height-class {
    height: 3.25rem;
  }
</style>
