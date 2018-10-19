<template>
  <div class="h-per-100 no-overflow flex-column personal-detials">
    <div class="flex-shrink">
      <x-header style="background-color: #013695">
        <a slot="overwrite-left" class="font-size-16 flex-row m-l-negative-16" @click="goback">
          <div class="h-40">
            <img src="../../assets/img/back.png" class="header-left-btn"/>
          </div>
          <div class="m-l-negative-5">{{$t("message.back")}}</div>
        </a>
        <a slot="right"  class="color-white" @click="save">{{$t("message.save")}}</a>
        {{$t('message.personalDetials')}}
      </x-header>
      <div class="flex-shrink h-40">
        <tab :line-width=5 badge-color="red" active-color='#ffffff' default-color='#bdcef3' bar-active-color='#0091da'>
          <tab-item selected class="vux-center bg-class" @click.native="index = '1'">
            {{$t("message.personalInformation")}}
          </tab-item>
          <tab-item class="vux-center bg-class" @click.native="index = '2'">{{$t("message.taxRelatedInformation")}}
          </tab-item>
        </tab>
      </div>
    </div>
    <div class="h-per-100 flex-grow flex-column">
      <div class="h-per-100 p-a-10 flex-column flex-grow overflow-y-scroll" v-show="index === '1'">
        <div class="border-radius-class flex-shrink bg-banner h-80  position-relative flex-column p-a-10">
          <div class="position-absolute r-20 t-20">
            <img src="../../assets/img/icon-purpleprofile.png" class="w-60">
          </div>
          <div class="flex-column h-per-50">
            <div class="flex-row">
              <div class="w-per-50 color-banner-subText font-size-12">{{$t("message.firstName")}}</div>
              <div class="w-per-50 color-banner-subText font-size-12">{{$t("message.passportId")}}</div>
            </div>
            <div class="flex-row m-t-2">
              <div class="w-per-50 color-white font-size-14">{{employeeParams['firstName']}}</div>
              <div class="w-per-50 color-white font-size-14">{{employeeParams['documentNumber']}}</div>
              <!--<div class="w-per-50 color-white font-size-14">San</div>
              <div class="w-per-50 color-white font-size-14">C8WW62WT</div>-->
            </div>
          </div>
          <div class="flex-column h-per-50">
            <div class="flex-row">
              <div class="w-per-50 color-banner-subText font-size-12">{{$t("message.familyName")}}</div>
              <div class="w-per-50 color-banner-subText font-size-12">{{$t("message.nationality")}}</div>
            </div>
            <div class="flex-row m-t-2">
              <div class="w-per-50 color-white font-size-14">{{employeeParams['familyName']}}</div>
              <div class="w-per-50 color-white font-size-14">{{employeeParams['nationalityName']}}</div>
              <!-- <div class="w-per-50 color-white font-size-14">Zhang</div>
               <div class="w-per-50 color-white font-size-14">China</div>-->
            </div>
          </div>
        </div>
        <group class="perDtls-input-plder m-t-10">
          <div>
            <div class="color-subTitle">{{$t("message.landline")}}</div>
            <x-input :is-type="checkLandLine" :placeholder="$t('message.pleaseInput')" class="border-a-class"
                     v-model="employeeParams['landline']"></x-input>
          </div>
          <div>
            <div class="color-subTitle m-t-5">{{$t("message.mobile")}}</div>
            <x-input ref="mobile" :should-toast-error="false" :placeholder="$t('message.pleaseInput')" class="border-a-class" keyboard="number"
                     is-type="china-mobile" @on-click-error-icon="toastFomattingError"
                     v-model="employeeParams['mobile']"></x-input>
          </div>
          <div>
            <div class="color-subTitle m-t-5">{{$t("message.gender")}}</div>
            <div class="flex-row border-a-class  align-items-center">
              <div class="w-per-50 h-per-100 flex-row h-20 p-a-10px" @click="employeeParams['gender'] = 'Male'"
                   :class="employeeParams['gender'] === 'Male' ? 'bg-color-Gender' : ''">
                <div class="flex-row m-auto align-items-center"
                     :class="employeeParams['gender'] === 'Male' ? 'color-kpmgBlue' : 'color-subTitle'">
                  <div class="m-auto flex-column">
                    <icon type="success" v-if="employeeParams['gender'] === 'Male'" class="font-size-18"></icon>
                  </div>
                  <div class="font-size-16 m-auto">{{$t("message.male")}}</div>
                </div>
              </div>
              <div class="w-per-50 h-per-100 flex-row  h-20 p-a-10px" @click="employeeParams['gender'] = 'Female'"
                   :class="employeeParams['gender'] === 'Female' ? 'bg-color-Gender' : ''">
                <div class="flex-row m-auto align-items-center"
                     :class="employeeParams['gender'] === 'Female' ? 'color-kpmgBlue' : 'color-subTitle'">
                  <div class="m-auto flex-column">
                    <icon type="success" v-if="employeeParams['gender'] === 'Female'" class="font-size-18"></icon>
                  </div>
                  <div class="font-size-16 m-auto">{{$t("message.female")}}</div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="color-subTitle m-t-5">{{$t("message.email")}}</div>
            <x-input ref="email" :should-toast-error="false" @on-click-error-icon="toastFomattingError" :placeholder="$t('message.pleaseInput')" is-type="email" class="border-a-class"
                     v-model="employeeParams['employeeEmail']"></x-input>
          </div>
          <div>
            <div class="color-subTitle m-t-5">{{$t("message.birthplace")}}</div>
            <!--<popup-picker :data="stores" :cancel-text="$t('message.cancel')" :confirm-text="$t('message.ok')" show-value
                          @on-change="onChange" class="border-a-class">
              <span class="font-family-sansSerif" slot="title" :class="birthPlace[0] ? '' : 'color-subTitle'">{{birthPlace[0] || $t('message.pleaseSelect')}}</span>
            </popup-picker>-->
            <x-input :placeholder="$t('message.pleaseInput')" class="border-a-class"
                     v-model="employeeParams['birthPlace']"></x-input>

          </div>
          <div>
            <div class="color-subTitle m-t-5">{{$t("message.dateOfBirth")}}</div>
            <datetime format="DD/MM/YYYY"  :order-map="{day: 1,month: 2, year: 3}" :cancel-text="$t('message.cancel')" :confirm-text="$t('message.ok')" :min-year="1950" :max-year="2020" default-selected-value="01-01-1990"
                      v-model="employeeParams['dateOfBirth']" class="border-a-class no-text-decoration date-picker-class h-20 line-height-20" @on-hide="showDatePicker = false" @on-show="showDatePicker = true" :show="showDatePicker">
              <span slot="title" class="font-size-16" :class="employeeParams['dateOfBirth'] ? '' : 'color-subTitle'">{{employeeParams['dateOfBirth'] || $t('message.pleaseSelect')}}</span>
            </datetime>
            <!--<cell is-link @click.native="showPlugin" class="border-a-class h-20">
              &lt;!&ndash;<x-icon type="ios-plus" class="cell-x-icon"></x-icon>&ndash;&gt;
              <span slot="title" :class="employeeParams['dateOfBirth'] ? '' : 'color-subTitle'">{{employeeParams['dateOfBirth'] || $t('message.pleaseSelect')}}</span>
            </cell>-->
          </div>
          <div>
            <div class="color-subTitle m-t-5">{{$t("message.homeAddress")}}<span class="color-red m-l-1">*</span></div>
            <x-input ref="homeAddress" :placeholder="$t('message.pleaseInput')" :should-toast-error="false"
                     @on-click-error-icon="toastError" required class="border-a-class"
                     v-model="employeeParams['homeAddress']"></x-input>
          </div>
          <div>
            <div class="color-subTitle m-t-5">{{$t("message.postalCode")}}</div>
            <x-input :is-type="checkPostalCode" :max="6" :placeholder="$t('message.pleaseInput')" ref="postCode1"
                     class="border-a-class" keyboard="number" v-model="employeeParams['postalCode']"></x-input>
          </div>
        </group>
      </div>
      <div class="h-per-100 flex-column flex-grow overflow-y-scroll" v-show="index === '2'">
        <div class="p-a-10">
          <div class="border-radius-class flex-shrink bg-banner min-h-80  position-relative flex-column p-a-10">
            <div class="position-absolute r-20 t-20">
              <img src="../../assets/img/icon-purpleprofile.png" class="w-60">
            </div>
            <div class="flex-column">
              <div class="m-t-10 color-banner-subText font-size-12">{{$t("message.taxpayerId")}}</div>
              <div class="m-t-5 color-white font-size-14">{{employeeTaxParams['taxpayerId']}}</div>
              <div class="flex-row m-t-10 color-banner-subText font-size-12 align-items-center per-dtls-icon">
                {{$t("message.taxpayerType")}}
                <x-icon type="ios-arrow-down" class="m-l-5" v-if="!showTaxFlag"
                        @click="showTaxFlag = !showTaxFlag"></x-icon>
                <x-icon type="ios-arrow-up" class="m-l-5" v-if="showTaxFlag" @click="showTaxFlag = !showTaxFlag"></x-icon>
              </div>
              <div v-show="showTaxFlag" class="flex-row flex-wrap">
                <div class="flex-row align-items-center min-width-per-50 m-t-2" v-for="(item,index) in taxpayerTypeList"
                     :key="index">
                  <input type="radio" class="input_check" :id="index" :value="item"
                         v-model="employeeTaxParams['taxpayerType']">
                  <div><label :for="index" class="font-size-14 color-white m-l-5">{{item}}</label></div>
                </div>
                <!-- <div class="flex-row align-items-center min-width-per-50 m-t-2">
                   <input type="radio" class="input_check" id="1">
                   <div><label :for="1" class="font-size-16 color-white m-l-5">aaaaaaaa</label></div>
                 </div>
                 <div class="flex-row align-items-center min-width-per-50 m-t-2">
                   <input type="radio" class="input_check" id="2">
                   <div><label :for="2" class="font-size-16 color-white m-l-5">aaaaaaaa</label></div>
                 </div>
                 <div class="flex-row align-items-center min-width-per-50 m-t-2">
                   <input type="radio" class="input_check" id="3">
                   <div><label :for="3" class="font-size-16 color-white m-l-5">aaaaaaaa</label></div>
                 </div>-->
              </div>
            </div>
          </div>
          <group class="perDtls-input-plder flex-shrink m-t-10">
            <div>
              <div class="color-subTitle">{{$t("message.residentialAddress")}}</div>
              <x-input :placeholder="$t('message.pleaseInput')" class="border-a-class"
                       v-model="employeeTaxParams['residentialAddress']"></x-input>
            </div>
            <div class="m-t-5">
              <div class="color-subTitle">{{$t("message.postalCode")}}</div>
              <x-input ref="postCode2" :is-type="checkPostalCode" :placeholder="$t('message.pleaseInput')"
                       class="border-a-class" keyboard="number" :max="6"
                       v-model="employeeTaxParams['postCode']"></x-input>
            </div>
          </group>
          <div class="flex-column flex-grow m-t-10">
            <div class="flex-row justify-content-space-between align-items-center flex-shrink h-20px">
              <div class="color-subTitle">{{$t("message.companyInformation")}}</div>
              <div @click="addEmployer">
                <img src="../../assets/img/icon-plus.png" class="w-14 click-highLight-class">
              </div>
            </div>
            <div v-for="(item,index) in employerList" :key="index"
                 class="p-a-10 bg-data flex-grow flex-row m-t-10 border-radius-class flex-shrink">
              <div class="flex-column w-per-80">
                <div class="color-banner-subText font-size-14">{{item['erTaxpayerId']}}</div>
                <div class="color-text font-size-16 m-t-5">{{item['employerName']}}</div>
                <!--  <div class="color-banner-subText font-size-14">91310000MA1FY3QL3Q</div>
                <div class="color-text font-size-16 m-t-5">KPMF Global Business Services</div>
                <div class="color-text font-size-16 m-t-5">(Guangdong)Co.,Ltd.Shenzhen Branch</div>-->
              </div>
              <div class="w-per-20 flex-row">
                <div class="flex-row m-auto">
                  <div @click="editEmployer(item)">
                    <img src="../../assets/img/btn-edit.png" class="w-25 click-highLight-class"/>
                  </div>
                  <div @click="deleteEmployerFn(item)" class=" m-l-10">
                    <img src="../../assets/img/btn-delete.png" class="w-25 click-highLight-class"/>
                  </div>
                </div>
              </div>
            </div>
            <!--<div
              class="p-a-10 bg-data flex-grow flex-row m-t-10 border-radius-class flex-shrink">
              <div class="flex-column w-per-80">
                <div class="color-banner-subText font-size-14">91310000MA1FY3QL3Q</div>
                <div class="color-text font-size-16 m-t-5">KPMF Global Business Services</div>
                <div class="color-text font-size-16 m-t-5">(Guangdong)Co.,Ltd.Shenzhen Branch</div>
              </div>
              <div class="w-per-20 flex-row">
                <div class="flex-row m-auto">
                  <div>
                    <img src="../../assets/img/btn-edit.png" class="w-30"/>
                  </div>
                  <div class=" m-l-10">
                    <img src="../../assets/img/btn-delete.png" class="w-30"/>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="p-a-10 bg-data flex-grow flex-row m-t-10 border-radius-class flex-shrink">
              <div class="flex-column w-per-80">
                <div class="color-banner-subText font-size-14">91310000MA1FY3QL3Q</div>
                <div class="color-text font-size-16 m-t-5">KPMF Global Business Services</div>
                <div class="color-text font-size-16 m-t-5">(Guangdong)Co.,Ltd.Shenzhen Branch</div>
              </div>
              <div class="w-per-20 flex-row">
                <div class="flex-row m-auto">
                  <div>
                    <img src="../../assets/img/btn-edit.png" class="w-30"/>
                  </div>
                  <div class=" m-l-10">
                    <img src="../../assets/img/btn-delete.png" class="w-30"/>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="p-a-10 bg-data flex-grow flex-row m-t-10 border-radius-class flex-shrink">
              <div class="flex-column w-per-80">
                <div class="color-banner-subText font-size-14">91310000MA1FY3QL3Q</div>
                <div class="color-text font-size-16 m-t-5">KPMF Global Business Services</div>
                <div class="color-text font-size-16 m-t-5">(Guangdong)Co.,Ltd.Shenzhen Branch</div>
              </div>
              <div class="w-per-20 flex-row">
                <div class="flex-row m-auto">
                  <div>
                    <img src="../../assets/img/btn-edit.png" class="w-30"/>
                  </div>
                  <div class=" m-l-10">
                    <img src="../../assets/img/btn-delete.png" class="w-30"/>
                  </div>
                </div>
              </div>
            </div>-->
          </div>
        </div>
      </div>
      <!-- loading -->
      <loading-component v-if="$store.state.loadingFlag"></loading-component>
    </div>
    <!-- 保存的comfir -->
    <div v-transfer-dom>
      <confirm v-model="showSaveConfirm"
               title="操作提示"
               @on-confirm="onConfirm"
               @on-show="showSaveConfirm = true"
               @on-hide="showSaveConfirm = false">
        <p style="text-align:center;">提交</p>
      </confirm>
    </div>
    <!-- dialog -->
    <div v-transfer-dom>
      <x-dialog @on-show="showDialog = true" @on-hide="hideDialog" v-model="showDialog" class="border-radius-5px dialog-class" :dialog-style="{'max-width': '90%', width: '90%', 'min-height':'6rem', 'border-radius': '5px'}">
        <div class="flex-column justify-content-space-between h-300">
          <div class="dio-header-class flex-column">
            <div class="p-l-10 p-r-10 p-t-20 p-b-20 flex-row justify-content-space-between align-items-center">
              <div></div>
              <div class="color-kpmgBlue font-size-18">
                title
              </div>
              <div class="click-highLight-class" @click="showDialog = false">
                <img src="../../assets/img/dialog-close.png" class="w-14"/>
              </div>
            </div>
            <div class="driver-line-class"></div>
          </div>
          <div class="conten-class p-a-10">
            <group class="perDtls-input-plder flex-shrink">
              <div>
                <div class="dialog-subTitle text-left">{{$t("message.employer")}}<span class="color-red m-l-1">*</span></div>
                <x-input required ref="dialogEmployer" :placeholder="$t('message.pleaseInput')" class="border-a-class"
                         v-model="addOrEditEmployer"></x-input>
              </div>
              <div class="m-t-5">
                <div class="dialog-subTitle text-left">{{$t("message.taxpayerId")}}<span class="color-red m-l-1">*</span></div>
                <x-input required ref="dialogTaxpayerId" :placeholder="$t('message.pleaseInput')"
                         class="border-a-class" keyboard="number"
                         v-model="addOrEditTaxpayerId"></x-input>
              </div>
            </group>
          </div>
          <div class="dio-bottom-class flex-column justify-content-end">
            <div class="driver-line-class"></div>
            <div class="flex-row p-a-10 align-items-center">
              <div class="w-per-50">
                <x-button mini @click.native="showDialog=false" class="bg-white dialog-cancle-btn-color click-highLight-class w-100 h-30 color-btn-cancle font-size-14">{{$t("message.cancel")}}</x-button>
              </div>
              <div class="w-per-50">
                <x-button mini :disabled="!(addOrEditEmployer && addOrEditTaxpayerId)" @click.native="saveOrUpdate" type="primary" class="bg-class click-highLight-class w-100 h-30 font-size-14">{{$t("message.ok")}}</x-button>
              </div>
            </div>
          </div>
        </div>
      </x-dialog>
    </div>
    <!-- 删除employer的comfir -->
    <div v-transfer-dom>
      <confirm v-model="showDeleteEmplyerConfirm"
               :title="$t('message.deleteThisActivity')"
               @on-confirm="onConfirmDeleteEmplyer"
               @on-show="showDeleteEmplyerConfirm = true"
               @on-hide="showDeleteEmplyerConfirm = false"
               :confirm-text="$t('message.ok')"
               :cancel-text="$t('message.cancel')">
        <p style="text-align:center;">{{$t('message.doYouWantToDeleteThisRecord')}}</p>
      </confirm>
    </div>
  </div>
</template>

<script>
import CellBox from 'vux/src/components/cell-box/index'
import loadingComponent from '../../components/LoadingCompoent'
import {
  getEmployeeInfo,
  getEmployeeTax,
  getConfigQueryList,
  getEmployer,
  saveEmployeeInfo,
  updateEmployeeTax,
  saveEmployer,
  updateEmployer,
  deleteEmployer
} from './perDtsApi'
import util from '../../common/util/util'
import axios from 'axios'
import {TransferDomDirective as TransferDom} from 'vux'

export default {
  name: 'PersonalDetails',
  components: {CellBox, loadingComponent},
  directives: {
    TransferDom
  },
  data () {
    return {
      // 切换的tab
      index: '1',
      // 是否显示多选tax type
      showTaxFlag: false,
      employeeId: '',
      employeeParams: {
        employeeId: '',
        landline: '',
        mobile: '',
        gender: 'Male',
        employeeEmail: '',
        birthPlace: '',
        dateOfBirth: '',
        homeAddress: '',
        postalCode: ''
      },
      // 显示时间插件
      showDatePicker: false,
      //  employeeTax 参数
      employeeTaxParams: {
        eeTaxInfoId: '',
        employeeId: JSON.parse(window.localStorage.getItem('userInfo'))['employeeId'],
        taxpayerId: '',
        taxpayerType: '',
        residentialAddress: '',
        postCode: ''
      },
      // 单选list
      taxpayerTypeList: [
        // this.$t('message.employed'),
        //  this.$t('message.unemployed'),
        // this.$t('message.investor'),
        // this.$t('message.angelInvestor'),
        // this.$t('message.nonresident')
      ],
      employerList: [],
      // confirm 框显示
      showSaveConfirm: false,
      // 手机类型
      mobileFlag: '',
      // 显示add对话框
      showDialog: false,
      // add or edit param for dialog
      addOrEditEmployer: '',
      addOrEditTaxpayerId: '',
      eeErInfoId: '',
      // 打开dialog的类型 add 和  edit
      dialogType: '',
      // 删除confirm 状态
      showDeleteEmplyerConfirm: false,
      // 删除employer的id
      deleteEeErInfoId: ''
    }
  },
  mounted () {
    this.mobileFlag = util.isMobile()
    if (this.mobileFlag === 'android') {
      document.addEventListener('deviceready', this.onDeviceReady, false)
    }
    this.employeeId = JSON.parse(window.localStorage.getItem('userInfo'))['employeeId']
    // 获取employee基本信息
    this.getEmployeeInit()
  },
  methods: {
    onDeviceReady () {
      // 监听安卓物理返回键
      document.addEventListener('backbutton', this.onBackKeyDown, false)
    },
    onBackKeyDown () {
      // 判断键盘是否弹出
      if (this.$store.state.keyboardFlag) {
        window.cordova.plugins.Keyboard.close()
        // this.$store.commit('setKeyboardFlag', false)
      } else if (this.showDatePicker) {
        this.showDatePicker = false
      } else if (this.showDeleteEmplyerConfirm) {
        this.showDeleteEmplyerConfirm = false
      } else if (this.showDialog) {
        this.showDialog = false
      } else {
        this.goback()
      }
    },
    goback () {
      history.back()
    },
    // 初始化请求
    getEmployeeInit () {
      this.$store.commit('setLoadingFlag', true)
      axios.all([
        getEmployeeInfo({'employeeId': JSON.parse(window.localStorage.getItem('userInfo'))['employeeId']}),
        getEmployeeTax(JSON.parse(window.localStorage.getItem('userInfo'))['employeeId']),
        getConfigQueryList({'key': 'TaxpayerType'}),
        getEmployer(JSON.parse(window.localStorage.getItem('userInfo'))['employeeId'])
      ]).then(res => {
        [this.employeeParams, this.employeeTaxParams, this.taxpayerTypeList, this.employerList] = [res[0]['data'], res[1]['data'], res[2]['data'], res[3]['data']]
        if (!this.employeeTaxParams) {
          this.employeeTaxParams = {
            eeTaxInfoId: '',
            employeeId: JSON.parse(window.localStorage.getItem('userInfo'))['employeeId'],
            taxpayerId: '',
            taxpayerType: '',
            residentialAddress: '',
            postCode: ''
          }
        }
        this.$store.commit('setLoadingFlag', false)
      })
    },
    // 保存按钮的click employeeId: '',
    // landline: '',
    // mobile: '',
    // gender: 'Male',
    // employeeEmail: '',
    // birthPlace: '',
    // dateOfBirth: '',
    // homeAddress: '',
    // postalCode: ''
    save () {
      this.employeeParams['homeAddress'] = this.employeeParams['homeAddress'].trim()
      this.employeeParams['birthPlace'] = this.employeeParams['birthPlace'].trim()
      if (this.$refs.mobile.valid && this.$refs.email.valid && this.$refs.homeAddress.valid && this.$refs.postCode1.valid && this.$refs.postCode2.valid) {
        this.$store.commit('setLoadingFlag', true)
        saveEmployeeInfo(this.employeeParams).then(res => {
          if (res.success) {
            this.employeeTaxParams['residentialAddress'] = this.employeeTaxParams['residentialAddress'].trim()
            updateEmployeeTax(this.employeeTaxParams).then(result => {
              this.$store.commit('setLoadingFlag', false)
              this.$vux.toast.show({
                text: this.$t('message.saveSuccess'),
                time: 1000,
                width: '10em !important'
              })
              this.$router.push('home')
            })
          }
        })
      } else {
        this.$vux.toast.text(this.$t('message.tipMustInputOrError'))
      }
    },
    // 校驗固定電話
    checkLandLine (value) {
      const reg = /^\d{3,4}-\d{3,8}-?\d{3,4}$/
      if (reg.test(value)) {
        return {valid: true}
      }
      return {valid: false, msg: this.$t('message.formattingError')}
    },
    // 不爲空错误提示
    toastError () {
      this.$vux.toast.text(this.$t('message.tipCannotEmpty'))
    },
    // 手機校驗錯誤提示
    toastFomattingError () {
      this.$vux.toast.text(this.$t('message.formattingError'))
    },
    // 校验郵編方法
    checkPostalCode (value) {
      const reg = /^[1-9][0-9]{5}$/
      if (reg.test(value)) {
        return {valid: true}
      }
      return {valid: false, msg: this.$t('message.formattingError')}
    },
    // 保存的确定 fn
    onConfirm () {
      this.showSaveConfirm = false
      this.$store.commit('setLoadingFlag', true)
      saveEmployeeInfo(this.employeeParams).then(res => {
        if (res.success) {
          updateEmployeeTax(this.employeeTaxParams).then(result => {
            this.$store.commit('setLoadingFlag', false)
            this.$vux.toast.show({
              text: this.$t('message.saveSuccess'),
              time: 1000
            })
            this.$router.push('home')
          })
        }
      })
    },
    // 隐藏dialog
    hideDialog () {
      this.showDialog = false
      setTimeout(() => {
        this.$refs.dialogEmployer.reset()
        this.$refs.dialogTaxpayerId.reset()
      }, 200)
    },
    // 新增employer 打开dialog
    addEmployer () {
      this.$refs.dialogEmployer.reset()
      this.$refs.dialogTaxpayerId.reset()
      this.dialogType = 'add'
      this.showDialog = true
    },
    // dialog 保存
    saveOrUpdate () {
      this.showDialog = false
      if (this.dialogType === 'add') {
        this.saveDialogEmployer()
      } else {
        this.updateDialogEmployer()
      }
    },
    // 编辑Employer时打开对话框
    editEmployer (item) {
      this.addOrEditEmployer = item['employerName']
      this.addOrEditTaxpayerId = item['erTaxpayerId']
      this.eeErInfoId = item['eeErInfoId']
      this.dialogType = 'edit'
      this.showDialog = true
    },
    // Employer 保存
    saveDialogEmployer () {
      this.$store.commit('setLoadingFlag', true)
      this.addOrEditTaxpayerId = this.addOrEditTaxpayerId.trim()
      this.addOrEditEmployer = this.addOrEditEmployer.trim()
      saveEmployer({employeeId: this.employeeId, erTaxpayerId: this.addOrEditTaxpayerId, employerName: this.addOrEditEmployer}).then(res => {
        if (res.success) {
          this.initEmployer()
        }
      })
    },
    // Employer 更新
    updateDialogEmployer () {
      this.$store.commit('setLoadingFlag', true)
      this.addOrEditTaxpayerId = this.addOrEditTaxpayerId.trim()
      this.addOrEditEmployer = this.addOrEditEmployer.trim()
      updateEmployer({eeErInfoId: this.eeErInfoId, erTaxpayerId: this.addOrEditTaxpayerId, employerName: this.addOrEditEmployer}).then(res => {
        if (res.success) {
          this.initEmployer()
        }
      })
    },
    // 删除Employer click事件
    onConfirmDeleteEmplyer () {
      this.$store.commit('setLoadingFlag', true)
      deleteEmployer(this.deleteEeErInfoId).then(res => {
        if (res.success) {
          this.initEmployer()
        }
      })
    },
    // 删除Employer 显示弹出框
    deleteEmployerFn (item) {
      // 赋值id
      this.deleteEeErInfoId = item['eeErInfoId']
      this.showDeleteEmplyerConfirm = true
    },
    // 操作完之后重新获取employer
    initEmployer () {
      getEmployer(this.employeeId).then(res => {
        this.employerList = res['data']
        this.$store.commit('setLoadingFlag', false)
      })
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
  @import '../../assets/style/variables/color';

  .h-80 {
    height: 1.6rem;
  }

  .min-h-80 {
    min-height: 1.6rem;
  }

  .m-t-2 {
    margin-top: 0.04rem;
  }

  .w-30 {
    width: 0.6rem;
  }

  .w-60 {
    width: 1.2rem;
  }

  .color-banner-subText {
    color: $perDtlsBannerLetter;
  }

  .color-text {
    color: $loginForgetPsdBtnBg;
  }

  .bg-color-Gender {
    background-color: $perDtlsBannerInputBorderOrDataBg;
  }

  .color-kpmgBlue {
    color: $kpmgBlue;
  }

  .bg-data {
    background-color: $perDtlsBannerInputBorderOrDataBg;
  }

  input[type="radio"] {
   /* width: 0.3rem;
    height: 0.3rem;*/
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    /*line-height: 0.3rem;*/
    position: relative;
    margin: 0rem;
    border: none !important;
    border-radius: 2px;
  }

  input[type="radio"]::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    background: #fff;
    width: 100%;
    height: 100%;
    border: none !important;
    border-radius: 2px;
  }

  input[type="radio"]:checked::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    border: 0rem;
    color: #013695;
    font-size: 0.28rem;
    font-weight: lighter;
    border-radius: 2px;

    background: url("../../assets/img/checkboxer.png") no-repeat white center;
    background-size: 0.24rem 0.24rem;
  }
  .h-300{
    height: 6rem;
    min-height: 6rem;
  }
</style>
