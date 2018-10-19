<template>
  <div class="flex-column h-per-100">
    <div class="flex-shrink">
      <x-header style="background-color: #013695">
        <a slot="overwrite-left" class="font-size-16 flex-row m-l-negative-16" @click="goback">
          <div class="h-40">
            <img src="../../assets/img/back.png" class="header-left-btn"/>
          </div>
          <div class="m-l-negative-5">{{$t("message.back")}}</div>
        </a>
        <a v-if="hasDataFlag === '2'" slot="right" class="color-white font-size-22"  @click="goSave">+</a>
        <div class="h-40 flex-column">
          <x-button mini @click.native="showPopupPicker = true" class="m-auto title-btn-class bg-blue-light">
            <div class="flex-row">
              <div class="font-size-16 title-btn-class color-white">{{year}} {{month}}</div>
              <div class="flex-column">
                <img src="../../assets/img/arrow-down-white.png" class="arrow-down-class"/>
              </div>
            </div>
          </x-button>
        </div>
      </x-header>
    </div>
    <div class="flex-grow flex-column">
      <div v-if="hasDataFlag === '2'" class="bg-gray-light flex-grow flex-column overflow-y-scroll p-l-10 p-r-10 p-b-10" ref="fapiaoListScrollTop">
        <section class="flex-column flex-shrink bg-white border-radius-5px p-a-10 m-t-10 position-relative" v-for="(item,index) in fapiaoList" :key="index">
          <div class="position-absolute r-20 t-20">
            <img src="../../assets/img/icon-contract-empty.png" class="w-40 opacity-03">
          </div>
          <div class="flex-row">
            <div class="flex-column w-per-60">
              <div class="color-subTitle font-size-14">
                {{$t("message.deductionCategory")}}
              </div>
              <div class="color-kpmgBlue font-size-16">
                {{deductionCategoryObj[item['deductionCategory']]}}
              </div>
            </div>
            <div class="flex-column w-per-40">
              <div class="color-subTitle font-size-14">
                {{$t("message.status")}}
              </div>
              <div class="color-kpmgBlue font-size-16">
                {{statusObj[item['status']]}}
              </div>
            </div>
          </div>
          <div class="flex-row m-t-5">
            <div class="flex-column w-per-30">
              <div class="color-subTitle font-size-14">
                {{$t("message.fapiaoNumber")}}
              </div>
              <div class="color-kpmgBlue font-size-16">
                {{item['fapiaoNumber']}}
              </div>
            </div>
            <div class="flex-column w-per-30">
              <div class="color-subTitle font-size-14">
                {{$t("message.fapiaoCode")}}
              </div>
              <div class="color-kpmgBlue font-size-16 word-break">
                {{item['fapiaoCode']}}
              </div>
            </div>
            <div class="flex-column w-per-40">
              <div class="color-subTitle font-size-14">
                {{$t("message.taxInclusiveAmount")}}
              </div>
              <div class="color-kpmgBlue font-size-16 flex-row">
                <div class="w-min-60">{{item['taxInclusiveAmount']}}</div>
                <div class="color-subTitle font-size-16 m-l-5">CNY</div>
              </div>
            </div>
          </div>
          <!--<div class="flex-row m-t-5">
            <div class="flex-column">
              <div class="color-subTitle font-size-14">
                {{$t("message.period")}}
              </div>
              <div class="color-kpmgBlue font-size-16">
                From
                <span class="m-l-5 m-r-5">01/01/2019</span>
                To
                <span class="m-l-5">31/01/2019</span>
              </div>
            </div>
          </div>-->
        </section>
        <!--<section class="flex-column flex-shrink bg-white border-radius-5px p-a-10 m-t-10 position-relative">
          <div class="position-absolute r-20 t-20">
            <img src="../../assets/img/icon-contract-empty.png" class="w-40">
          </div>
          <div class="flex-row">
            <div class="flex-column w-per-60">
              <div class="color-subTitle font-size-14">
                {{$t("message.deductionCategory")}}
              </div>
              <div class="color-kpmgBlue font-size-16">
                Continuing Education
              </div>
            </div>
            <div class="flex-column w-per-40">
              <div class="color-subTitle font-size-14">
                {{$t("message.status")}}
              </div>
              <div class="color-kpmgBlue font-size-16">
                Reject
              </div>
            </div>
          </div>
          <div class="flex-row m-t-5">
            <div class="flex-column w-per-30">
              <div class="color-subTitle font-size-14">
                {{$t("message.fapiaoNumber")}}
              </div>
              <div class="color-kpmgBlue font-size-16">
                18268181
              </div>
            </div>
            <div class="flex-column w-per-30">
              <div class="color-subTitle font-size-14">
                {{$t("message.fapiaoCode")}}
              </div>
              <div class="color-kpmgBlue font-size-16">
                3100192927
              </div>
            </div>
            <div class="flex-column w-per-40">
              <div class="color-subTitle font-size-14">
                {{$t("message.taxInclusiveAmount")}}
              </div>
              <div class="color-kpmgBlue font-size-16">
                <span>2816.19</span>
                <span class="color-subTitle font-size-16">CNY</span>
              </div>
            </div>
          </div>
          <div class="flex-row m-t-5">
            <div class="flex-column">
              <div class="color-subTitle font-size-14">
                {{$t("message.period")}}
              </div>
              <div class="color-kpmgBlue font-size-16">
                From
                <span class="m-l-5 m-r-5">01/01/2019</span>
                To
                <span class="m-l-5">31/01/2019</span>
              </div>
            </div>
          </div>
        </section>
        <section class="flex-column flex-shrink bg-white border-radius-5px p-a-10 m-t-10 position-relative">
          <div class="position-absolute r-20 t-20">
            <img src="../../assets/img/icon-contract-empty.png" class="w-40">
          </div>
          <div class="flex-row">
            <div class="flex-column w-per-60">
              <div class="color-subTitle font-size-14">
                {{$t("message.deductionCategory")}}
              </div>
              <div class="color-kpmgBlue font-size-16">
                Continuing Education
              </div>
            </div>
            <div class="flex-column w-per-40">
              <div class="color-subTitle font-size-14">
                {{$t("message.status")}}
              </div>
              <div class="color-kpmgBlue font-size-16">
                Reject
              </div>
            </div>
          </div>
          <div class="flex-row m-t-5">
            <div class="flex-column w-per-30">
              <div class="color-subTitle font-size-14">
                {{$t("message.fapiaoNumber")}}
              </div>
              <div class="color-kpmgBlue font-size-16">
                18268181
              </div>
            </div>
            <div class="flex-column w-per-30">
              <div class="color-subTitle font-size-14">
                {{$t("message.fapiaoCode")}}
              </div>
              <div class="color-kpmgBlue font-size-16">
                3100192927
              </div>
            </div>
            <div class="flex-column w-per-40">
              <div class="color-subTitle font-size-14">
                {{$t("message.taxInclusiveAmount")}}
              </div>
              <div class="color-kpmgBlue font-size-16">
                <span>2816.19</span>
                <span class="color-subTitle font-size-16">CNY</span>
              </div>
            </div>
          </div>
          <div class="flex-row m-t-5">
            <div class="flex-column">
              <div class="color-subTitle font-size-14">
                {{$t("message.period")}}
              </div>
              <div class="color-kpmgBlue font-size-16">
                From
                <span class="m-l-5 m-r-5">01/01/2019</span>
                To
                <span class="m-l-5">31/01/2019</span>
              </div>
            </div>
          </div>
        </section>
        <section class="flex-column flex-shrink bg-white border-radius-5px p-a-10 m-t-10 position-relative">
          <div class="position-absolute r-20 t-20">
            <img src="../../assets/img/icon-contract-empty.png" class="w-40">
          </div>
          <div class="flex-row">
            <div class="flex-column w-per-60">
              <div class="color-subTitle font-size-14">
                {{$t("message.deductionCategory")}}
              </div>
              <div class="color-kpmgBlue font-size-16">
                Continuing Education
              </div>
            </div>
            <div class="flex-column w-per-40">
              <div class="color-subTitle font-size-14">
                {{$t("message.status")}}
              </div>
              <div class="color-kpmgBlue font-size-16">
                Reject
              </div>
            </div>
          </div>
          <div class="flex-row m-t-5">
            <div class="flex-column w-per-30">
              <div class="color-subTitle font-size-14">
                {{$t("message.fapiaoNumber")}}
              </div>
              <div class="color-kpmgBlue font-size-16">
                18268181
              </div>
            </div>
            <div class="flex-column w-per-30">
              <div class="color-subTitle font-size-14">
                {{$t("message.fapiaoCode")}}
              </div>
              <div class="color-kpmgBlue font-size-16">
                3100192927
              </div>
            </div>
            <div class="flex-column w-per-40">
              <div class="color-subTitle font-size-14">
                {{$t("message.taxInclusiveAmount")}}
              </div>
              <div class="color-kpmgBlue font-size-16">
                <span>2816.19</span>
                <span class="color-subTitle font-size-16">CNY</span>
              </div>
            </div>
          </div>
          <div class="flex-row m-t-5">
            <div class="flex-column">
              <div class="color-subTitle font-size-14">
                {{$t("message.period")}}
              </div>
              <div class="color-kpmgBlue font-size-16">
                From
                <span class="m-l-5 m-r-5">01/01/2019</span>
                To
                <span class="m-l-5">31/01/2019</span>
              </div>
            </div>
          </div>
        </section>
        <section class="flex-column flex-shrink bg-white border-radius-5px p-a-10 m-t-10 position-relative">
          <div class="position-absolute r-20 t-20">
            <img src="../../assets/img/icon-contract-empty.png" class="w-40">
          </div>
          <div class="flex-row">
            <div class="flex-column w-per-60">
              <div class="color-subTitle font-size-14">
                {{$t("message.deductionCategory")}}
              </div>
              <div class="color-kpmgBlue font-size-16">
                Continuing Education
              </div>
            </div>
            <div class="flex-column w-per-40">
              <div class="color-subTitle font-size-14">
                {{$t("message.status")}}
              </div>
              <div class="color-kpmgBlue font-size-16">
                Reject
              </div>
            </div>
          </div>
          <div class="flex-row m-t-5">
            <div class="flex-column w-per-30">
              <div class="color-subTitle font-size-14">
                {{$t("message.fapiaoNumber")}}
              </div>
              <div class="color-kpmgBlue font-size-16">
                18268181
              </div>
            </div>
            <div class="flex-column w-per-30">
              <div class="color-subTitle font-size-14">
                {{$t("message.fapiaoCode")}}
              </div>
              <div class="color-kpmgBlue font-size-16">
                3100192927
              </div>
            </div>
            <div class="flex-column w-per-40">
              <div class="color-subTitle font-size-14">
                {{$t("message.taxInclusiveAmount")}}
              </div>
              <div class="color-kpmgBlue font-size-16">
                <span>2816.19</span>
                <span class="color-subTitle font-size-16">CNY</span>
              </div>
            </div>
          </div>
          <div class="flex-row m-t-5">
            <div class="flex-column">
              <div class="color-subTitle font-size-14">
                {{$t("message.period")}}
              </div>
              <div class="color-kpmgBlue font-size-16">
                From
                <span class="m-l-5 m-r-5">01/01/2019</span>
                To
                <span class="m-l-5">31/01/2019</span>
              </div>
            </div>
          </div>
        </section>
        <section class="flex-column flex-shrink bg-white border-radius-5px p-a-10 m-t-10 position-relative">
          <div class="position-absolute r-20 t-20">
            <img src="../../assets/img/icon-contract-empty.png" class="w-40">
          </div>
          <div class="flex-row">
            <div class="flex-column w-per-60">
              <div class="color-subTitle font-size-14">
                {{$t("message.deductionCategory")}}
              </div>
              <div class="color-kpmgBlue font-size-16">
                Continuing Education
              </div>
            </div>
            <div class="flex-column w-per-40">
              <div class="color-subTitle font-size-14">
                {{$t("message.status")}}
              </div>
              <div class="color-kpmgBlue font-size-16">
                Reject
              </div>
            </div>
          </div>
          <div class="flex-row m-t-5">
            <div class="flex-column w-per-30">
              <div class="color-subTitle font-size-14">
                {{$t("message.fapiaoNumber")}}
              </div>
              <div class="color-kpmgBlue font-size-16">
                18268181
              </div>
            </div>
            <div class="flex-column w-per-30">
              <div class="color-subTitle font-size-14">
                {{$t("message.fapiaoCode")}}
              </div>
              <div class="color-kpmgBlue font-size-16">
                3100192927
              </div>
            </div>
            <div class="flex-column w-per-40">
              <div class="color-subTitle font-size-14">
                {{$t("message.taxInclusiveAmount")}}
              </div>
              <div class="color-kpmgBlue font-size-16">
                <span>2816.19</span>
                <span class="color-subTitle font-size-16">CNY</span>
              </div>
            </div>
          </div>
          <div class="flex-row m-t-5">
            <div class="flex-column">
              <div class="color-subTitle font-size-14">
                {{$t("message.period")}}
              </div>
              <div class="color-kpmgBlue font-size-16">
                From
                <span class="m-l-5 m-r-5">01/01/2019</span>
                To
                <span class="m-l-5">31/01/2019</span>
              </div>
            </div>
          </div>
        </section>-->
      </div>
      <div v-if="hasDataFlag === '1'" class="flex-grow flex-column">
        <no-fapiao-upload :checkValue="clickToAddFlag" @clickToAddFlagFn="clickToAddFlagFn" :canChange="(currentMonth.toString() === month.toString()) && (currentYear.toString() === year.toString())" @goSave="goSave"></no-fapiao-upload>
      </div>
      <!-- loading -->
      <loading-component v-if="$store.state.loadingFlag"></loading-component>
      <!-- 选择年月弹出框 -->
      <group>
        <popup-picker :show.sync="showPopupPicker" :show-cell="false" :data="yearsAndMonths"
                      v-model="yearAndMonth" @on-change="change"></popup-picker>
      </group>
    </div>
  </div>
</template>

<script>
import util from '../../common/util/util'
import noFapiaoUpload from './NoFapiaoUpload'
import {getQueryList} from './fapiaoApi'
import loadingComponent from '../../components/LoadingCompoent'
export default {
  name: 'FapiaoList',
  components: {noFapiaoUpload, loadingComponent},
  data () {
    return {
      hasDataFlag: '0', // 0 表示不确定  1为没有数据 2为有数据
      showPopupPicker: false,
      year: '',
      month: '',
      // 根据时间查出本年
      currentYear: '',
      // 根据时间查出本月
      currentMonth: '',
      allMonth: [],
      yearsAndMonths: [],
      yearAndMonth: [],
      employeeId: '',
      fapiaoList: [],
      deductionCategoryObj: {
        1: this.$t('message.housingMortgageInterest'),
        2: this.$t('message.rentalCosts'),
        3: this.$t('message.dependentChildrenEducation'),
        4: this.$t('message.continuingEducation'),
        5: this.$t('message.supplementaryInsurance'),
        6: this.$t('message.seriousIIIness')
      },
      statusObj: {
        1: this.$t('message.status1'),
        2: this.$t('message.status2'),
        3: this.$t('message.status3'),
        4: this.$t('message.status4'),
        5: this.$t('message.status5'),
        6: this.$t('message.status6'),
        7: this.$t('message.status7')
      },
      // 在noFapiao情况下是否可以点击按钮去新增
      clickToAddFlag: false,
      // 是否第一次进入
      isFirstEnter: false,
      // 返回是1  跳转是2
      backOrSave: '1'
    }
  },
  created () {
    this.isFirstEnter = true
  },
  // mounted () {
  //   this.allMonth = [this.$t('message.january'), this.$t('message.february'), this.$t('message.march'), this.$t('message.april'), this.$t('message.may'), this.$t('message.june'),
  //     this.$t('message.july'), this.$t('message.august'), this.$t('message.september'), this.$t('message.october'), this.$t('message.november'), this.$t('message.december')]
  //   this.yearsAndMonths = [util.allYears, this.allMonth]
  //   this.year = this.$route.query.year
  //   this.month = this.allMonth[this.$route.query.month - 1]
  //   this.employeeId = JSON.parse(window.localStorage.getItem('userInfo'))['employeeId']
  //   this.deductionCategoryObj = {
  //     1: this.$t('message.housingMortgageInterest'),
  //     2: this.$t('message.rentalCosts'),
  //     3: this.$t('message.dependentChildrenEducation'),
  //     4: this.$t('message.continuingEducation'),
  //     5: this.$t('message.supplementaryInsurance'),
  //     6: this.$t('message.seriousIIIness')
  //   }
  //   this.statusObj = {
  //     1: this.$t('message.status1'),
  //     2: this.$t('message.status2'),
  //     3: this.$t('message.status3'),
  //     4: this.$t('message.status4'),
  //     5: this.$t('message.status5'),
  //     6: this.$t('message.status6'),
  //     7: this.$t('message.status7')
  //   }
  //   this.yearAndMonth = [this.year, this.month]
  //   // this.getFapiaoList()
  // },
  activated () {
    // 判断从fapiao upload页面进来时年和月是否和缓存里的年和月发生变化
    let valueChangeFlag = false
    this.mobileFlag = util.isMobile()
    if (this.mobileFlag === 'android') {
      document.addEventListener('deviceready', this.onDeviceReady, false)
    }
    // 不是通过返回进入
    if (!this.$route.meta.isBack) {
      this.allMonth = [this.$t('message.january'), this.$t('message.february'), this.$t('message.march'), this.$t('message.april'), this.$t('message.may'), this.$t('message.june'),
        this.$t('message.july'), this.$t('message.august'), this.$t('message.september'), this.$t('message.october'), this.$t('message.november'), this.$t('message.december')]
      this.yearsAndMonths = [util.allYears, this.allMonth]
      this.employeeId = JSON.parse(window.localStorage.getItem('userInfo'))['userName']
      this.hasDataFlag = '0'
      if (this.$store.state.fapiaoUploadYear !== this.year || this.month !== this.allMonth[this.$store.state.fapiaoUploadMonth - 1]) {
        valueChangeFlag = true
      }
      this.year = this.$store.state.fapiaoUploadYear
      // 根据索引去取值
      this.month = this.allMonth[this.$store.state.fapiaoUploadMonth - 1]
      this.yearAndMonth = [this.year, this.month]
      this.currentYear = (new Date()).getFullYear()
      this.currentMonth = this.allMonth[(new Date()).getMonth()]
      if (!this.isFirstEnter) {
        // 如果值没有变化则主动去调接口  否则组件自动调
        if (!valueChangeFlag) {
          this.change(this.yearAndMonth)
        }
      }
    } else {
      // 通过返回过来的时候 回到之前滚动的状态
      if (this.hasDataFlag === '2') {
        const st = this.$store.state.fapiaoListScrollTop
        this.$refs.fapiaoListScrollTop.scrollTop = st
      }
    }
    // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
    this.$route.meta.isBack = false
    this.isFirstEnter = false
  },
  beforeRouteLeave (to, from, next) {
    this.$store.commit('setLoadingFlag', false)
    // 关闭监听
    document.removeEventListener('deviceready', this.onDeviceReady)
    if (this.mobileFlag === 'android') {
      document.removeEventListener('backbutton', this.onBackKeyDown)
    }
    // 设置下一个路由的 meta
    if (to.name === 'FapiaoUpload') {
      if (this.backOrSave === '1') {
        to.meta.isBack = true
      }
    }
    next()
  },
  methods: {
    goback () {
      history.back()
    },
    change (value) {
      this.clickToAddFlag = false
      this.year = value[0]
      this.month = value[1]
      this.getFapiaoList()
    },
    goSave () {
      if (this.hasDataFlag === '2') {
        // 将当前的滚动状态保存到状态
        const st = this.$refs.fapiaoListScrollTop.scrollTop
        this.$store.commit('setFapiaoListScrollTop', st)
      }
      // 把当前的year month 保存到状态里  再次到这个页面的时候取出来   （keepAlive模式）
      this.$store.commit('setFapiaoUploadYear', this.year)
      this.$store.commit('setFapiaoUploadMonth', this.allMonth.indexOf(this.month) + 1)
      this.$router.push({path: 'fapiaoUploadSave', query: {year: this.year, month: this.month}})
    },
    clickToAddFlagFn (value) {
      this.clickToAddFlag = value
    },
    // 获取数据
    getFapiaoList () {
      this.$store.commit('setLoadingFlag', true)
      getQueryList({year: this.year, month: this.allMonth.indexOf(this.month), employeeId: this.employeeId}).then(res => {
        if (res['success'] && res['data']) {
          if (res['data']['length'] > 0) {
            // 有数据
            this.hasDataFlag = '2'
          } else {
            // 没有数据
            this.hasDataFlag = '1'
          }
          this.fapiaoList = res['data']
        }
        this.$store.commit('setLoadingFlag', false)
      })
    },
    onDeviceReady () {
      // 监听安卓物理返回键
      document.addEventListener('backbutton', this.onBackKeyDown, false)
    },
    onBackKeyDown () {
      if (this.$store.state.keyboardFlag) {
        window.cordova.plugins.Keyboard.close()
      } else if (this.showPopupPicker) {
        this.showPopupPicker = false
      } else {
        history.back()
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .title-btn-class {
    width: auto;
    height: 0.68rem
  }

  .arrow-down-class {
    width: 0.3rem;
    height: 0.3rem;
    margin-top: 0.25rem;
    margin-left: 0.1rem;
  }
  .opacity-03{
    opacity: 0.3;
  }
  .w-min-60{
    min-width: 1.2rem;
  }
</style>
