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
        {{$t('message.fapiaoUpload')}}
      </x-header>
    </div>
    <div class="tab-class overflow-scroll flex-grow bg-swiper-class flex-column position-relative">
      <div class="flex-shrink position-relative">
        <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide v-for="(item, index) in allYears" :key='index'
                        :class="[currentIndex === index ? 'crueent-class' : '', (currentIndex - 1) === index ? 'before-one-class' : '']"
                        class="default-class">{{item}}
          </swiper-slide>
        </swiper>
        <div class="triangle-class position-absolute"></div>
      </div>
      <div class="flex-column bg-gray-light flex-grow overflow-y-scroll">
        <div class="p-l-20 p-r-20 p-t-10 p-b-5">
          <div class="color-subTitle font-size-14">{{$t('message.fapiaoUploadTopMsg')}}</div>
        </div>
        <div class="p-l-15 p-r-15 flex-column flex-shrink">
          <div class="flex-row">
            <div class="w-per-50 p-a-5 flex-column">
              <div class="bg-white border-radius-class" @click="goFapiaoList('1')">
                <div class="flex-column p-a-10">
                  <div class="font-size-22 month-class">
                    {{$t('message.january')}}
                  </div>
                  <div class="font-size-14 color-kpmgBlue m-t-5">
                    <span>{{dataObj['0']}}</span>
                    <span class="color-subTitle">{{dataObj['0'] > 1 ? $t('message.fapiaos') : $t('message.fapiao')}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-per-50 p-a-5 flex-column">
              <div class="bg-white border-radius-class"  @click="goFapiaoList('2')">
                <div class="flex-column p-a-10">
                  <div class="font-size-22 month-class">
                    {{$t('message.february')}}
                  </div>
                  <div class="font-size-14 color-kpmgBlue m-t-5">
                    <span>{{dataObj['1']}}</span>
                    <span class="color-subTitle">{{dataObj['1'] > 1 ? $t('message.fapiaos') : $t('message.fapiao')}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex-row">
            <div class="w-per-50 p-a-5 flex-column">
              <div class="bg-white border-radius-class" @click="goFapiaoList('3')">
                <div class="flex-column p-a-10">
                  <div class="font-size-22 month-class">
                    {{$t('message.march')}}
                  </div>
                  <div class="font-size-14 color-kpmgBlue m-t-5">
                    <span>{{dataObj['2']}}</span>
                    <span class="color-subTitle">{{dataObj['2'] > 1 ? $t('message.fapiaos') : $t('message.fapiao')}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-per-50 p-a-5 flex-column">
              <div class="bg-white border-radius-class" @click="goFapiaoList('4')">
                <div class="flex-column p-a-10">
                  <div class="font-size-22 month-class">
                    {{$t('message.april')}}
                  </div>
                  <div class="font-size-14 color-kpmgBlue m-t-5">
                    <span>{{dataObj['3']}}</span>
                    <span class="color-subTitle">{{dataObj['3'] > 1 ? $t('message.fapiaos') : $t('message.fapiao')}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex-row">
            <div class="w-per-50 p-a-5 flex-column">
              <div class="bg-white border-radius-class" @click="goFapiaoList('5')">
                <div class="flex-column p-a-10">
                  <div class="font-size-22 month-class">
                    {{$t('message.may')}}
                  </div>
                  <div class="font-size-14 color-kpmgBlue m-t-5">
                    <span>{{dataObj['4']}}</span>
                    <span class="color-subTitle">{{dataObj['4'] > 1 ? $t('message.fapiaos') : $t('message.fapiao')}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-per-50 p-a-5 flex-column">
              <div class="bg-white border-radius-class" @click="goFapiaoList('6')">
                <div class="flex-column p-a-10">
                  <div class="font-size-22 month-class">
                    {{$t('message.june')}}
                  </div>
                  <div class="font-size-14 color-kpmgBlue m-t-5">
                    <span>{{dataObj['5']}}</span>
                    <span class="color-subTitle">{{dataObj['5'] > 1 ? $t('message.fapiaos') : $t('message.fapiao')}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex-row">
            <div class="w-per-50 p-a-5 flex-column">
              <div class="bg-white border-radius-class" @click="goFapiaoList('7')">
                <div class="flex-column p-a-10">
                  <div class="font-size-22 month-class">
                    {{$t('message.july')}}
                  </div>
                  <div class="font-size-14 color-kpmgBlue m-t-5">
                    <span>{{dataObj['6']}}</span>
                    <span class="color-subTitle">{{dataObj['6'] > 1 ? $t('message.fapiaos') : $t('message.fapiao')}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-per-50 p-a-5 flex-column">
              <div class="bg-white border-radius-class" @click="goFapiaoList('8')">
                <div class="flex-column p-a-10">
                  <div class="font-size-22 month-class">
                    {{$t('message.august')}}
                  </div>
                  <div class="font-size-14 color-kpmgBlue m-t-5">
                    <span>{{dataObj['7']}}</span>
                    <span class="color-subTitle">{{dataObj['7'] > 1 ? $t('message.fapiaos') : $t('message.fapiao')}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex-row">
            <div class="w-per-50 p-a-5 flex-column">
              <div class="bg-white border-radius-class" @click="goFapiaoList('9')">
                <div class="flex-column p-a-10">
                  <div class="font-size-22 month-class">
                    {{$t('message.september')}}
                  </div>
                  <div class="font-size-14 color-kpmgBlue m-t-5">
                    <span>{{dataObj['8']}}</span>
                    <span class="color-subTitle">{{dataObj['8'] > 1 ? $t('message.fapiaos') : $t('message.fapiao')}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-per-50 p-a-5 flex-column">
              <div class="bg-white border-radius-class" @click="goFapiaoList('10')">
                <div class="flex-column p-a-10">
                  <div class="font-size-22 month-class">
                    {{$t('message.october')}}
                  </div>
                  <div class="font-size-14 color-kpmgBlue m-t-5">
                    <span>{{dataObj['9']}}</span>
                    <span class="color-subTitle">{{dataObj['9'] > 1 ? $t('message.fapiaos') : $t('message.fapiao')}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex-row">
            <div class="w-per-50 p-a-5 flex-column">
              <div class="bg-white border-radius-class" @click="goFapiaoList('11')">
                <div class="flex-column p-a-10">
                  <div class="font-size-22 month-class">
                    {{$t('message.november')}}
                  </div>
                  <div class="font-size-14 color-kpmgBlue">
                    <span>{{dataObj['10']}}</span>
                    <span class="color-subTitle">{{dataObj['10'] > 1 ? $t('message.fapiaos') : $t('message.fapiao')}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-per-50 p-a-5 flex-column">
              <div class="bg-white border-radius-class" @click="goFapiaoList('12')">
                <div class="flex-column p-a-10">
                  <div class="font-size-22 month-class">
                    {{$t('message.december')}}
                  </div>
                  <div class="font-size-14 color-kpmgBlue">
                    <span>{{dataObj['11']}}</span>
                    <span class="color-subTitle">{{dataObj['11'] > 1 ? $t('message.fapiaos') : $t('message.fapiao')}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- loading -->
      <loading-component v-if="$store.state.loadingFlag"></loading-component>
    </div>
  </div>
</template>

<script>
import util from '../../common/util/util'
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import loadingComponent from '../../components/LoadingCompoent'
import {getFapiaoAmount} from './fapiaoApi'
export default {
  name: 'FapiaoUpload',
  components: {swiper, swiperSlide, loadingComponent},
  data () {
    return {
      // 当前索引
      currentIndex: 0,
      // 全部年份
      allYears: util.allYears,
      // 当前year
      currentYear: '',
      // swiper option
      swiperOption: {
        notNextTick: true,
        initialSlide: 0,
        speed: 500,
        direction: 'horizontal',
        grabCursor: true,
        on: {
          slideChangeTransitionEnd: () => {
            // util.current = this.activeIndex
            this.currentIndex = this.swiper.activeIndex
            this.currentYear = this.allYears[this.currentIndex]
            this.getData()
          }
        },
        centeredSlides: true,
        slidesPerView: 4,
        slidesPerGroup: 1
      },
      dataList: [],
      dataObj: {}
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  // mounted () {
  //   this.currentYear = util.dateFormat(new Date(), 'yyyy')
  //   const num = util.allYears.indexOf(this.currentYear)
  //   this.swiper.slideTo(num, 0, false)
  //   this.currentIndex = num
  // },
  activated () {
    if (!this.$route.meta.isBack) {
      this.currentYear = util.dateFormat(new Date(), 'yyyy')
      const num = util.allYears.indexOf(this.currentYear)
      this.swiper.slideTo(num, 0, false)
      this.currentIndex = num
      this.getData()
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$store.commit('setLoadingFlag', false)
    next()
  },
  methods: {
    goback () {
      history.back()
    },
    getIndex () {
      const thisYear = util.dateFormat(new Date(), 'yyyy')
      const num = util.allYears.indexOf(thisYear)
      return num
    },
    goFapiaoList (value) {
      // value 为 1 2 3 等 月份
      // 把当前的year month 保存到状态里  下个页面再通过状态取出来   （keepAlive模式）
      this.$store.commit('setFapiaoUploadYear', this.currentYear)
      this.$store.commit('setFapiaoUploadMonth', value)
      this.$router.push('fapiaoList')
    },
    getData () {
      this.$store.commit('setLoadingFlag', true)
      this.dataList = []
      this.dataObj = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0
      }
      getFapiaoAmount({year: this.currentYear, employeeId: JSON.parse(window.localStorage.getItem('userInfo'))['employeeId']}).then(res => {
        console.log(res)
        if (res['success']) {
          if (res['data'] && res['data']['length'] > 0) {
            this.dataList = res['data']
            this.dataList.forEach((item, idx) => {
              this.dataObj[item['month']] = item['fapiaoAmount']
            })
          }
          console.log(this.dataObj)
        }
        this.$store.commit('setLoadingFlag', false)
      })
      setTimeout(() => {
        this.$store.commit('setLoadingFlag', false)
      }, 300)
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../../assets/style/common';
  @import '../../assets/style/variables/color';

  .swiper-container {
    height: 1rem;
    line-height: 1rem;
    overflow: hidden;
  }

  .swiper-slide {
    text-align: center;
    font-size: 0.6rem;
  }

  .swiper-wrapper {
    /*height:1rem;*/
  }

  .crueent-class {
    color: $orange1 !important;
  }

  .bg-swiper-class{
    background-color: $homeLetterColor;
  }
  .default-class {
    color: $whiteLight;
  }

  .before-one-class {
    color: $white;
  }
  .month-class{
    color: $perDtlsBannerBg;
  }

  .triangle-class {
    height: 0px;
    width: 0px;
    overflow: hidden;
    font-size: 0;
    line-height: 0;
    border-color: transparent transparent $contractUploadBg transparent;
    border-style: dashed dashed solid dashed;
    border-width: 0.2rem;
    right: 0px;
    bottom: 0px;
    z-index: 1;
    left: 50%;
    transform: translate(-50%, 0%);
    right: 50%;
  }
</style>
