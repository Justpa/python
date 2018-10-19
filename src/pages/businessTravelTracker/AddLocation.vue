<template>
  <div class="h-per-100 no-overflow flex-column add-location-class">
    <div class="flex-shrink">
      <x-header style="background-color: #013695">
        <a slot="overwrite-left" class="font-size-16 flex-row m-l-negative-16" @click="goback">
          <div class="h-40">
            <img src="../../assets/img/back.png" class="header-left-btn"/>
          </div>
          <div class="m-l-negative-5">{{$t("message.back")}}</div>
        </a>
        <a slot="right"  class="color-white" @click="save">{{$t("message.save")}}</a>
        {{$t('message.addLocation')}}
      </x-header>
    </div>
    <div class="flex-shrink flex-grow overflow-y-scroll flex-column">
      <group class="p-a-10 flex-grow">
        <div>
          <div class="color-subTitle">{{$t("message.location")}}<span class="color-red m-l-1">*</span></div>
          <cell is-link @click.native="goSelectLocation" class="border-a-class h-20" required>
            <span class="font-family-sansSerif" slot="title" :class="submitParams['countryName'] ?  'color-black' : 'color-subTitle'">{{submitParams['countryName'] || $t('message.pleaseSelect')}}</span>
          </cell>
        </div>
        <div class="m-t-10">
          <div class="color-subTitle m-t-10">{{$t("message.date")}}<span class="color-red m-l-1">*</span></div>
          <div class="m-t-2 flex-row">
            <div class="w-per-50 flex-column p-r-5">
              <div class="color-subTitle">{{$t('message.from')}}</div>
              <datetime :default-selected-value="defaultDate" :min-year="2011" :max-year="2025" :end-date="dateFormat(submitParams['endDate'])" format="DD/MM/YYYY" :order-map="{day: 1,month: 2, year: 3}"  :cancel-text="$t('message.cancel')" :confirm-text="$t('message.ok')" v-model="submitParams['startDate']" :show="showDate1" class="border-a-class no-text-decoration date-picker-class h-20 line-height-20" @on-hide="showDate1 = false" @on-show="showDate1 = true">
                <span slot="title" class="font-size-16" :class="submitParams['startDate'] ?  'color-black' : 'color-subTitle'">{{submitParams['startDate'] || $t('message.pleaseSelect')}}</span>
              </datetime>
            </div>
            <div class="w-per-50 flex-column p-l-5">
              <div class="color-subTitle">{{$t('message.to')}}</div>
              <datetime :default-selected-value="defaultDate" :min-year="2011" :max-year="2025" :start-date="dateFormat(submitParams['startDate'])" format="DD/MM/YYYY" :order-map="{day: 1,month: 2, year: 3}" :cancel-text="$t('message.cancel')" :confirm-text="$t('message.ok')" v-model="submitParams['endDate']" :show="showDate2" class="border-a-class no-text-decoration date-picker-class h-20 line-height-20" @on-hide="showDate2 = false" @on-show="showDate2 = true">
                <span slot="title" class="font-size-16" :class="submitParams['endDate'] ?  'color-black' : 'color-subTitle'">{{submitParams['endDate'] || $t('message.pleaseSelect')}}</span>
              </datetime>
            </div>
          </div>
        </div>
        <div class=" m-t-10">
          <div class="color-subTitle">{{$t("message.activity")}}<span class="color-red m-l-1">*</span></div>
          <cell is-link @click.native="showActivity = true" class="border-a-class h-20" required>
            <span class="font-family-sansSerif" slot="title" :class="activityObj[activityValue[0]] ?  'color-black' : 'color-subTitle'">{{activityObj[activityValue[0]] || $t('message.pleaseSelect')}}</span>
          </cell>
          <popup-picker @on-show="showActivity = true" @on-hide="showActivity = false" :cancel-text="$t('message.cancel')" :confirm-text="$t('message.ok')"
                        :show.sync="showActivity" :show-cell="false" :data="activityList" v-model="activityValue" @on-change="changeActivityValue"></popup-picker>
        </div>
      </group>
      <!-- loading -->
      <loading-component v-if="$store.state.loadingFlag"></loading-component>
    </div>
  </div>
</template>

<script>
import {updateEmployeeTravel, addEmployeeTravel} from './businessTravelTrackerApi'
import util from '../../common/util/util'
import loadingComponent from '../../components/LoadingCompoent'

export default {
  name: 'AddLocation',
  components: {loadingComponent},
  data () {
    return {
      // 手機類型
      mobileFlag: '',
      showDate1: false,
      showDate2: false,
      showActivity: false,
      activityValue: [],
      activityList: [],
      activityObj: {},
      submitParams: {
        employeeId: '',
        employeeTravelType: '',
        startDate: null,
        endDate: null,
        countryid: '',
        countryName: '',
        eeTravelInfoId: ''
      },
      // 从选择国家页面穿过来的数据
      locationMsg: '',
      // 从哪里跳转过来的  1为日历页面  2为选择国家的页面
      pushType: '',
      // 从日历页面传过来的本条数据的参数
      item: {},
      // 所有时间段的数据
      allDataList: [],
      // 是回退还是save  1为back 2为save
      backOrSave: '1',
      // save  or  update
      saveOrUpdate: '',
      // 选择时间是默认值
      defaultDate: null
    }
  },
  mounted () {
    this.mobileFlag = util.isMobile()
    if (this.mobileFlag === 'android') {
      document.addEventListener('deviceready', this.onDeviceReady, false)
    }
    this.activityList = [[
      {name: this.$t('message.sick'), value: 'sick'},
      {name: this.$t('message.notWorking'), value: 'notWorking'},
      {name: this.$t('message.onVacation'), value: 'onVacation'},
      {name: this.$t('message.working'), value: 'working'},
      {name: this.$t('message.inTransit'), value: 'inTransit'},
      {name: this.$t('message.onPublicHoliday'), value: 'onPublicHoliday'}
    ]]
    this.activityObj = {
      'sick': this.$t('message.sick'),
      'notWorking': this.$t('message.notWorking'),
      'onVacation': this.$t('message.onVacation'),
      'working': this.$t('message.working'),
      'inTransit': this.$t('message.inTransit'),
      'onPublicHoliday': this.$t('message.onPublicHoliday')
    }
    // 获取值
    this.item = this.$store.state.businessTravelTrackerItem
    this.allDataList = this.$store.state.businessTravelTrackerAllList
    this.saveOrUpdate = this.$store.state.businessTravelTrackerSaveOrUpdate
    this.locationMsg = this.$store.state.businessTravelTrackerLocationMsg
    this.$store.commit('setBusinessTravelTrackerLocationMsg', null)
    // 如果有值则赋值个提交的参数
    if (this.item) {
      this.submitParams['employeeId'] = this.item['employeeId']
      this.submitParams['employeeTravelType'] = this.item['employeeTravelType']
      this.submitParams['startDate'] = this.item['startDate']
      this.submitParams['endDate'] = this.item['endDate']
      this.submitParams['countryid'] = this.item['countryid']
      this.submitParams['countryName'] = this.item['countryName']
      this.submitParams['eeTravelInfoId'] = this.item['eeTravelInfoId']
      this.activityValue = [this.item['employeeTravelType']]
    }
    if (this.locationMsg) {
      this.submitParams['countryid'] = this.locationMsg['countryId']
      this.submitParams['countryName'] = this.locationMsg['countryName']
    }

    // 设置默认时间
    this.defaultDate = util.dateFormat(new Date(), 'dd/MM/yyyy')
  },
  beforeRouteLeave (to, from, next) {
    this.$store.commit('setLoadingFlag', false)
    // 设置下一个路由的 meta
    if (to.name === 'BusinessTravelTracker') {
      if (this.backOrSave === '1') {
        to.meta.isBack = true
      }
    }
    next()
  },
  methods: {
    onDeviceReady () {
    // 监听安卓物理返回键
      document.addEventListener('backbutton', this.onBackKeyDown, false)
    },
    goback () {
      history.back()
    },
    save () {
      if (this.submitParams['countryid'] && this.submitParams['startDate'] && this.submitParams['endDate'] && this.submitParams['employeeTravelType']) {
        // 更新数据
        if (this.saveOrUpdate === 'update') {
          if (this.updateCheckFn()) {
            this.$store.commit('setLoadingFlag', true)
            updateEmployeeTravel(this.submitParams).then(res => {
              if (res['success']) {
                this.$store.commit('setLoadingFlag', false)
                // this.$vux.toast.show({
                //   text: this.$t('message.saveSuccess'),
                //   time: 1000
                // })
                // 2表示跳转  1表示返回
                this.backOrSave = '2'
                this.$router.go(-1)
              }
            })
          } else {
            this.$vux.toast.text(this.$t('message.businessTravelTrackerSaveCheckFaild'))
          }
        } else {
          // 新增数据
          if (this.addCheckFn()) {
            this.$store.commit('setLoadingFlag', true)
            this.submitParams['employeeId'] = JSON.parse(window.localStorage.getItem('userInfo'))['employeeId']
            addEmployeeTravel(this.submitParams).then(res => {
              if (res['success']) {
                // 2表示跳转  1表示返回
                this.backOrSave = '2'
                this.$router.go(-1)
                // this.$router.push('businessTravelTracker')
              }
              this.$store.commit('setLoadingFlag', false)
            })
          } else {
            this.$vux.toast.text(this.$t('message.businessTravelTrackerSaveCheckFaild'))
          }
        }
      } else {
        this.$vux.toast.text(this.$t('message.tipMustInputOrError'))
      }
    },
    // 跳转到选择国家页面
    goSelectLocation () {
      this.$store.commit('setBusinessTravelTrackerItem', this.submitParams)
      this.$router.push('selectLocation')
    },
    // 选择类型后赋值
    changeActivityValue (value) {
      this.submitParams['employeeTravelType'] = value[0]
      console.log(value)
      console.log(this.submitParams['employeeTravelType'])
    },
    // dd/MM/yyyy 格式化成 yyyy/MM/dd
    dateFormat (value) {
      if (value) {
        const list = value.split('/')
        return list[2] + '/' + list[1] + '/' + list[0]
      } else {
        return ''
      }
    },
    // 校验修改的数据的时间段是否和已有的有冲突
    updateCheckFn () {
      let flag = true
      this.allDataList.every((element, idx) => {
        if (this.submitParams['eeTravelInfoId'] !== element['eeTravelInfoId']) {
          if ((this.dateFormat(this.submitParams['startDate']) >= this.dateFormat(element['startDate']) && this.dateFormat(this.submitParams['startDate']) <= this.dateFormat(element['endDate'])) ||
            (this.dateFormat(this.submitParams['endDate']) >= this.dateFormat(element['startDate']) && this.dateFormat(this.submitParams['endDate']) <= this.dateFormat(element['endDate'])) ||
            (this.dateFormat(this.submitParams['startDate']) <= this.dateFormat(element['startDate']) && this.dateFormat(this.submitParams['endDate']) >= this.dateFormat(element['endDate']))) {
            flag = false
            return false
          } else {
            return true
          }
        } else {
          return true
        }
      })
      return flag
    },
    // 校验新增的数据的时间段是否和已有的有冲突
    addCheckFn () {
      let flag = true
      this.allDataList.every((element, idx) => {
        if ((this.dateFormat(this.submitParams['startDate']) >= this.dateFormat(element['startDate']) && this.dateFormat(this.submitParams['startDate']) <= this.dateFormat(element['endDate'])) ||
          (this.dateFormat(this.submitParams['endDate']) >= this.dateFormat(element['startDate']) && this.dateFormat(this.submitParams['endDate']) <= this.dateFormat(element['endDate'])) ||
          (this.dateFormat(this.submitParams['startDate']) <= this.dateFormat(element['startDate']) && this.dateFormat(this.submitParams['endDate']) >= this.dateFormat(element['endDate']))) {
          flag = false
          return false
        } else {
          return true
        }
      })
      return flag
    },
    // 安卓物理返回鍵重寫
    onBackKeyDown () {
      // 判断键盘是否弹出
      if (this.$store.state.keyboardFlag) {
        window.cordova.plugins.Keyboard.close()
        // this.$store.commit('setKeyboardFlag', false)
      } else if (this.showDate1) {
        this.showDate1 = false
      } else if (this.showDate2) {
        this.showDate2 = false
      } else if (this.showActivity) {
        this.showActivity = false
      } else {
        history.back()
      }
    }
  },
  destroyed () {
    this.$store.commit('setLoadingFlag', false)
    document.removeEventListener('deviceready', this.onDeviceReady)
    if (this.mobileFlag === 'android') {
      document.removeEventListener('backbutton', this.onBackKeyDown)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
