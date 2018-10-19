<template>
  <div class="h-per-100 no-overflow flex-column businessTra-class">
    <div class="flex-shrink">
      <x-header style="background-color: #013695">
          <a slot="overwrite-left" class="font-size-16 flex-row m-l-negative-16" @click="goback">
            <div class="h-40">
              <img src="../../assets/img/back.png" class="header-left-btn"/>
            </div>
            <div class="m-l-negative-5">{{$t("message.back")}}</div>
          </a>
          <div class="h-40 flex-column">
            <x-button mini @click.native="showPopupPicker = true" class="m-auto title-btn-class bg-blue-light">
              <div class="flex-row">
                <div class="font-size-16 title-btn-class color-white">{{year}} {{month}}</div>
                <div class="flex-column">
                  <!--<x-icon type="ios-arrow-down" class="m-l-5 m-auto"></x-icon>-->
                  <img src="../../assets/img/arrow-down-white.png" class="arrow-down-class"/>
                </div>
              </div>
            </x-button>
          </div>
        </x-header>
    </div>
    <div class="flex-column flex-grow">
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="(item, index) of newDaysInMonthList" :key="index">
          <div class="flex-row p-l-10 p-r-10 h-120">
            <div class="w-per-10 flex-column">
              <div class="h-no-line-height-50 flex-column">
                <div class="h-per-60 bg-blue-light border-top-raduis-5px flex-column">
                  <div class="color-white m-auto font-size-18">{{item['day']}}</div>
                </div>
                <div class="h-per-40 bg-white border-bottom-raduis-5px flex-column">
                  <div class="m-auto font-size-14">{{item['week']}}</div>
                </div>
              </div>
              <div class="m-auto step-left-shortLine-class"></div>
              <div v-if="item['countryName']" class="m-auto border-radius-per-100 flex-column step-left-round-class click-highLight-class" @click="chooseType(item)">
                <img src="../../assets/img/plus.png" class="m-auto w-16"/>
              </div>
              <div v-if="!item['countryName']" class="m-auto border-radius-per-100 flex-column step-left-round-class click-highLight-class" @click="addType(item)">
                <img src="../../assets/img/plus.png" class="m-auto w-16"/>
              </div>
              <div :class="(index + 1) === daysInMonthList['length'] ? 'bg-grayLight' : ''" class="flex-grow m-auto step-left-longLine-class"></div>
            </div>
            <div v-if="item['countryName']" class="w-per-90 p-l-10 p-b-20 font-size-14 color-black">
              <div class="bg-white h-per-100 border-radius-5px flex-column p-l-5 p-r-5">
                <div class="flex-shrink flex-row flex-1 justify-content-space-between align-items-center p-r-5">
                  <div class="font-bold font-size-16">{{item['countryName']}}</div>
                  <div class="click-highLight-class flex-column"  @click="deleteEmployeeTravelFn(item)">
                    <img src="../../assets/img/btn-cross-gray.png" class="btn-cross-class m-auto"/>
                  </div>
                </div>
                <div @click="chooseType(item)" :class="item['employeeTravelType'] === 'sick' ? 'bg-sick' : item['employeeTravelType'] === 'notWorking' ? 'bg-notWorking' : item['employeeTravelType'] === 'onVacation' ? 'bg-vacation' :
                 item['employeeTravelType'] === 'working' ? 'bg-working' : item['employeeTravelType'] === 'inTransit' ? 'bg-inTransit' : item['employeeTravelType'] === 'onPublicHoliday' ? 'bg-holiday' : ''"
                     class="flex-shrink flex-1 flex-row justify-content-space-between p-l-5 p-r-5 align-items-center border-radius-5px click-highLight-class">
                  <div class="color-white">{{activityObj[item['employeeTravelType']]}}</div>
                  <div class="flex-row">
                    <img src="../../assets/img/arrow-right-white.png" class="btn-cross-class m-auto"/>
                  </div>
                </div>
                <div class="flex-shrink flex-1 align-items-center flex-row">Started and ended my day here</div>
              </div>
            </div>
            <div v-if="!item['countryName']" class="w-per-90 p-l-10 p-b-20 font-size-14 color-black">
              <div class="bg-white h-per-100 border-radius-5px flex-column p-l-5 p-r-5">
                <div class="h-per-40 flex-column justify-content-center font-size-16">{{$t("message.locationRequired")}}</div>
                <div @click="addType(item)" class="flex-shrink h-per-60 flex-row">
                  <div class="flex-row m-auto w-per-100  p-l-5 p-r-5 border-radius-5px bg-greenLight h-40 click-highLight-class">
                    <div class="color-white m-auto font-size-16">{{$t("message.addLocation")}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </swiper-slide>
        <!-- <swiper-slide>
           <div class="flex-row p-l-10 p-r-10 h-120">
             <div class="w-per-10 flex-column">
               <div class="h-no-line-height-50 flex-column">
                 <div class="h-per-60 bg-blue-light border-top-raduis-5px flex-column">
                   <div class="color-white m-auto font-size-18">11</div>
                 </div>
                 <div class="h-per-40 bg-white border-bottom-raduis-5px flex-column">
                   <div class="m-auto font-size-14">FRI</div>
                 </div>
               </div>
               <div class="m-auto step-left-shortLine-class"></div>
               <div class="m-auto border-radius-per-100 flex-column step-left-round-class click-highLight-class" @click="chooseType">
                 <img src="../../assets/img/plus.png" class="m-auto w-16"/>
               </div>
               <div class="flex-grow m-auto step-left-longLine-class"></div>
             </div>
             <div v-if="!checkStatus" class="w-per-90 p-l-10 p-b-20 font-size-14 color-black">
               <div class="bg-white h-per-100 border-radius-5px flex-column p-l-5 p-r-5">
                 <div class="flex-shrink flex-row flex-1 justify-content-space-between align-items-center p-r-5">
                   <div class="font-bold font-size-16">China, P.R.C</div>
                   <div class="click-highLight-class flex-column">
                     <img src="../../assets/img/btn-cross-gray.png" class="btn-cross-class m-auto"/>
                   </div>
                 </div>
                 <div @click="chooseType" class="flex-shrink flex-1 flex-row justify-content-space-between p-l-5 p-r-5 align-items-center border-radius-5px click-highLight-class bg-darkPurple">
                   <div class="color-white">Working</div>
                   <div class="flex-row">
                     <img src="../../assets/img/arrow-right-white.png" class="btn-cross-class m-auto"/>
                   </div>
                 </div>
                 <div class="flex-shrink flex-1 align-items-center flex-row">Started and ended my day here</div>
               </div>
             </div>
             <div v-if="checkStatus" class="w-per-90 p-l-10 p-b-20 font-size-14 color-black">
               <div class="bg-white h-per-100 border-radius-5px flex-column p-l-5 p-r-5">
                 <div class="h-per-40 flex-column justify-content-center font-size-16">{{$t("message.locationRequired")}}</div>
                 <div @click="chooseType" class="flex-shrink h-per-60 flex-row">
                   <div class="flex-row m-auto w-per-100  p-l-5 p-r-5 border-radius-5px bg-greenLight h-40 click-highLight-class">
                     <div class="color-white m-auto font-size-16">{{$t("message.addLocation")}}</div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </swiper-slide>-->
        <!--<swiper-slide>
          <div class="flex-row p-l-10 p-r-10 h-120">
            <div class="w-per-10 flex-column">
              <div class="h-no-line-height-50 flex-column">
                <div class="h-per-60 bg-blue-light border-top-raduis-5px flex-column">
                  <div class="color-white m-auto font-size-18">11</div>
                </div>
                <div class="h-per-40 bg-white border-bottom-raduis-5px flex-column">
                  <div class="m-auto font-size-14">FRI</div>
                </div>
              </div>
              <div class="m-auto step-left-shortLine-class"></div>
              <div class="m-auto border-radius-per-100 flex-column step-left-round-class click-highLight-class">
                <img src="../../assets/img/plus.png" class="m-auto w-16"/>
              </div>
              <div class="flex-grow m-auto step-left-longLine-class"></div>
            </div>
            <div class="w-per-90 p-l-10 p-b-20 font-size-14 color-black">
              <div class="bg-white h-per-100 border-radius-5px flex-column p-l-5 p-r-5">
                <div class="flex-1 flex-column justify-content-center font-size-14">{{$t("message.locationRequired")}}</div>
                <div @click="chooseType" class="flex-shrink flex-1 flex-row">
                  <div class="flex-row m-auto w-per-100  p-l-5 p-r-5 border-radius-5px bg-greenLight h-40 click-highLight-class">
                    <div class="color-white m-auto font-size-16">{{$t("message.addLocation")}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </swiper-slide>-->
      </swiper>
      <!-- loading -->
      <loading-component v-if="$store.state.loadingFlag"></loading-component>
    </div>
    <group>
      <popup-picker :cancel-text="$t('message.cancel')" :confirm-text="$t('message.ok')" :show.sync="showPopupPicker" :show-cell="false" :data="yearsAndMonths"
                    v-model="yearAndMonth" @on-change="change"></popup-picker>
    </group>
    <!-- 删除employer的comfir -->
    <div v-transfer-dom>
      <confirm v-model="showDeleteConfirm"
               :title="$t('message.deleteThisActivity')"
               @on-confirm="onConfirmDeleteEmplyer"
               @on-show="showDeleteConfirm = true"
               @on-hide="showDeleteConfirm = false"
               :confirm-text="$t('message.ok')"
               :cancel-text="$t('message.cancel')">
        <p style="text-align:center;">{{$t('message.doYouWantToDeleteThisRecord')}}</p>
      </confirm>
    </div>
    </div>
</template>

<script>
import util from '../../common/util/util'
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import {
  getByEmployeeId, deleteEmployeeTravel
} from './businessTravelTrackerApi'
import {TransferDomDirective as TransferDom} from 'vux'
import loadingComponent from '../../components/LoadingCompoent'

export default {
  components: {swiper, swiperSlide, loadingComponent},
  name: 'BusinessTravelTracker',
  directives: {
    TransferDom
  },
  data () {
    return {
      // 显示选择年月的picker
      showPopupPicker: false,
      year: '',
      month: '',
      daysInMonthList: [],
      newDaysInMonthList: [],
      allMonths: [this.$t('message.january'), this.$t('message.february'), this.$t('message.march'), this.$t('message.april'), this.$t('message.may'), this.$t('message.june'),
        this.$t('message.july'), this.$t('message.august'), this.$t('message.september'), this.$t('message.october'), this.$t('message.november'), this.$t('message.december')],
      yearsAndMonths: [util.allYears, [this.$t('message.january'), this.$t('message.february'), this.$t('message.march'), this.$t('message.april'), this.$t('message.may'), this.$t('message.june'),
        this.$t('message.july'), this.$t('message.august'), this.$t('message.september'), this.$t('message.october'), this.$t('message.november'), this.$t('message.december')]],
      yearAndMonth: ['', ''],
      week: [this.$t('message.sunday'), this.$t('message.monday'), this.$t('message.tuesday'), this.$t('message.wednesday'), this.$t('message.thursday'), this.$t('message.friday'), this.$t('message.saturday')],
      activityObj: {
        sick: this.$t('message.sick'),
        notWorking: this.$t('message.notWorking'),
        onVacation: this.$t('message.onVacation'),
        working: this.$t('message.working'),
        inTransit: this.$t('message.inTransit'),
        onPublicHoliday: this.$t('message.onPublicHoliday')
      },
      swiperOption: {
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
        // centeredSlides: true,
        on: {
          slideChangeTransitionEnd: () => {
            // util.current = this.activeIndex
            // this.currentIndex = this.swiper.activeIndex
            // console.log(this.currentIndex)
          }
        }
      },
      // 当前月相关的数据
      dataList: [],
      //  从后台取出的所有数据
      allDataList: [],
      // 是否第一次进入
      isFirstEnter: false,
      // 显示删除confirm框
      showDeleteConfirm: false,
      // 需要删除的id
      deleteEeTravelInfoId: null
    }
  },
  created () {
    this.isFirstEnter = true
  },
  mounted () {
    // this.year = util.dateFormat(new Date(), 'yyyy')
    // this.month = this.allMonths[util.dateFormat(new Date(), 'MM') - 1]
    // this.yearAndMonth = [this.year, this.month]
    // this.getDaysInMonth()
    // this.swiper.slideTo(1, 100, false)
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  activated () {
    // 進入頁面時把報錯toast關閉  因爲本頁面利用緩存 以防之前的正好打開
    // this.showError = false
    // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
    if (!this.$route.meta.isBack) {
      // 是否第一次进入  不是第一次进入 及那个执行change方法   第一次进入则自动执行change方法
      if (!this.isFirstEnter) {
        this.change(this.yearAndMonth)
        this.swiper.slideTo(0, 10, false)
      } else {
        // 获取本月和本年
        this.year = util.dateFormat(new Date(), 'yyyy')
        this.month = this.allMonths[util.dateFormat(new Date(), 'MM') - 1]
        this.yearAndMonth = [this.year, this.month]
      }
    }
    // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
    this.$route.meta.isBack = false
    this.isFirstEnter = false
  },
  beforeRouteLeave (to, from, next) {
    // 離開頁面時把toast關閉
    this.$store.commit('setLoadingFlag', false)
    next()
  },
  methods: {
    goback () {
      history.back()
    },
    // 初始化当前月份
    getDaysInMonth () {
      return new Promise(resolve => {
        //  获取值为数字的月份
        const numOfMonth = this.allMonths.indexOf(this.month) + 1
        //   之前一个月的最后一天  即当月的最大天数
        const currentDate = new Date(this.year, numOfMonth, 0)
        const days = currentDate.getDate()
        for (let i = 1; i <= days; i++) {
          // 每一天
          const date = new Date(this.year, numOfMonth - 1, i)
          // 每一天格式化
          const dayDate = util.dateFormat(date, 'dd/MM/yyyy')
          const weekNum = date.getDay()
          this.daysInMonthList.push({
            day: i,
            week: this.week[weekNum],
            date: dayDate
          })
        }
        resolve()
      })
    },
    // 后台获取数据
    getListByEmployeeId () {
      this.$store.commit('setLoadingFlag', true)
      getByEmployeeId({employeeId: JSON.parse(window.localStorage.getItem('userInfo'))['employeeId']}).then(res => {
        if (res['success']) {
          this.allDataList = res['data']
          if (res['data'].length > 0) {
            const numOfMonth = this.allMonths.indexOf(this.month)
            const currentTime = new Date(this.year, numOfMonth)
            const currentYear = currentTime.getFullYear() + ''
            let currentMonth = currentTime.getMonth() + 1 + ''
            if (currentMonth.length === 1) {
              currentMonth = 0 + currentMonth
            }
            // 当前选择的时间
            const currentDate = currentYear + currentMonth
            this.dataList = []
            // 将后台取出来的数据 判断如果在本月中 则放到dataList中
            res['data'].forEach((item, idx) => {
              const startDate = item['startDate'].split('/')[2] + item['startDate'].split('/')[1]
              const endDate = item['endDate'].split('/')[2] + item['endDate'].split('/')[1]
              if (currentDate >= startDate && currentDate <= endDate) {
                this.dataList.push(item)
              }
            })
            // 遍历两个循环 将在范围内的数据 把值赋到daysInMonthList中
            this.dataList.forEach(item1 => {
              this.daysInMonthList.forEach(item2 => {
                if (this.dateFormat(item2['date']) >= this.dateFormat(item1['startDate']) && this.dateFormat(item2['date']) <= this.dateFormat(item1['endDate'])) {
                  this.$set(item2, 'countryName', item1['countryName'])
                  this.$set(item2, 'countryid', item1['countryid'])
                  this.$set(item2, 'eeTravelInfoId', item1['eeTravelInfoId'])
                  this.$set(item2, 'employeeId', item1['employeeId'])
                  this.$set(item2, 'employeeTravelType', item1['employeeTravelType'])
                  this.$set(item2, 'startDate', item1['startDate'])
                  this.$set(item2, 'endDate', item1['endDate'])
                }
              })
            })
          }
          this.newDaysInMonthList = this.daysInMonthList
          this.$store.commit('setLoadingFlag', false)
        }
      })
    },
    change (value) {
      this.year = value[0]
      this.month = value[1]
      // 清空数组
      this.daysInMonthList = []
      this.newDaysInMonthList = []
      this.getDaysInMonth().then(() => {
        this.getListByEmployeeId()
      })
    },
    dateFormat (value) {
      if (value) {
        const list = value.split('/')
        return list[2] + '/' + list[1] + '/' + list[0]
      } else {
        return ''
      }
    },
    chooseType (item) {
      this.$store.commit('setBusinessTravelTrackerItem', item)
      this.$store.commit('setBusinessTravelTrackerAllList', this.allDataList)
      this.$store.commit('setBusinessTravelTrackerSaveOrUpdate', 'update')
      this.$router.push('addLocation')
    },
    addType (item) {
      this.$store.commit('setBusinessTravelTrackerItem', item)
      this.$store.commit('setBusinessTravelTrackerAllList', this.allDataList)
      this.$store.commit('setBusinessTravelTrackerSaveOrUpdate', 'add')
      this.$router.push('addLocation')
    },
    deleteEmployeeTravelFn (item) {
      this.deleteEeTravelInfoId = item['eeTravelInfoId']
      this.showDeleteConfirm = true
    },
    onConfirmDeleteEmplyer () {
      this.$store.commit('setLoadingFlag', true)
      deleteEmployeeTravel({eeTravelInfoId: this.deleteEeTravelInfoId}).then(res => {
        if (res['success']) {
          this.change(this.yearAndMonth)
        }
        this.$store.commit('setLoadingFlag', false)
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../../assets/style/common';
  .title-btn-class {
    width: 3.2rem;
    height: 0.68rem
  }
  .arrow-down-class {
    width: 0.3rem;
    height: 0.3rem;
    margin-top: 0.25rem;
    margin-left: 0.1rem;
  }
  .w-per-10{
    width: 10%;
  }
  .w-per-90{
    width: 90%;
  }
  .h-120{
    height: 2.4rem;
  }
  .border-top-raduis-5px{
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  .border-bottom-raduis-5px{
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  .h-no-line-height-50{
    height: 1rem;
  }
  .swiper-container{
    flex-grow: 1;
    width: 100%;
    padding: 0.2rem 0rem;
    background-color: $contractUploadBg;
  }
  .step-left-shortLine-class{
     width: 0.1rem !important;
     background-color: gray !important;
     height: 0.05rem !important;
   }
  .step-left-longLine-class{
    width: 0.1rem !important;
    background-color: gray !important;
  }
  .step-left-round-class{
    height: 0.6rem;
    width: 0.6rem;
    background-color: $greenLight;
  }
  .btn-cross-class{
    width: 0.4rem;
    height: 0.4rem;
  }
  .bg-greenLight{
    background-color: $greenLight;
  }
  .bg-sick{
    background-color: $busiTraSick;
  }
  .bg-notWorking{
    background-color: $busiTraNotWorking;
  }
  .bg-working{
    background-color: $busiTraWorking;
  }
  .bg-inTransit{
    background-color: $busiTraInTransit;
  }
  .bg-vacation{
    background-color: $busiTraOnVacation;
  }
  .bg-holiday{
    background-color: $busiTraHoliday;
  }
  .h-33{
    height: 0.67rem;
  }
  .bg-grayLight{
    background-color: $contractUploadBg !important;
  }
</style>
