<template>
    <div class="h-per-100 no-overflow flex-column fapiaoUpload-save">
      <div class="flex-shrink">
        <x-header style="background-color: #013695">
          <a slot="overwrite-left" class="font-size-16 flex-row m-l-negative-16" @click="goback">
            <div class="h-40">
              <img src="../../assets/img/back.png" class="header-left-btn"/>
            </div>
            <div class="m-l-negative-5">{{$t("message.back")}}</div>
          </a>
          <a slot="right"  class="color-white" @click="save">{{$t("message.save")}}</a>
          {{$t('message.fapiaoUpload')}}
        </x-header>
      </div>
      <div class="flex-grow flex-column flex-shrink">
        <div class="bg-class flex-shrink p-l-5 p-r-5 p-b-10 flex-row">
          <div class="flex-column p-a-5 w-per-50">
            <div class="color-subTitle font-size-14">{{$t('message.year')}}</div>
            <div class="bg-blue-light color-white h-40 p-l-10 font-size-16">
              {{year}}
            </div>
          </div>
          <div class="flex-column p-a-5 w-per-50">
            <div class="color-subTitle font-size-14">{{$t('message.month')}}</div>
            <div class="bg-blue-light color-white h-40 p-l-10 font-size-16">
              {{month}}
            </div>
          </div>
        </div>
        <div class="flex-grow overflow-y-scroll flex-column p-a-10 p-b-20 m-t-5">
          <!--<upload-component :uploadTitle="$t('message.fapiaoUploadCameraTitle')"></upload-component>-->
          <div class="flex-column flex-shrink">
            <div class="color-subTitle">{{$t('message.fapiaoUploadCameraTitle')}}</div>
            <div class="flex-row m-t-5">
              <div  v-if="uploadedList.length === 0" class="upload-img-class border-a-class flex-row" @click="addPic">
                <div class="m-auto">
                  <img src="../../assets/img/plus-camera.png">
                </div>
              </div>
              <div v-if="uploadedList.length > 0" class="position-relative">
                <div  v-for="(item, index) in uploadedList" :key="index">
                  <img class="previewer-demo-img m-auto max-w-100 max-h-100"
                       :src="item.src" @click="showPicDetail(index)"/>
                  <img src="../../assets/img/delete-pic.png" class="position-absolute deletePic-btn-class" @click="openDeleteConfirm(index)"/>
                </div>
              </div>
            </div>
            <div>
              <actionsheet v-model="showPicActionsheet" :cancel-text="$t('message.cancel')" :menus="menus" @on-click-menu="chosePicType" show-cancel></actionsheet>
            </div>
            <!-- 预览 -->
            <div v-transfer-dom>
              <!-- dialog previewer配置 -->
              <previewer :list="picHasUploaded ? uploadedList : list" ref="previewer" :options="options" @on-close="picPreviewerClose"></previewer>
            </div>
            <!-- dialog -->
            <div v-transfer-dom>
              <x-dialog v-model="showPicDialog" class="flex-column" :dialog-style="{'max-width': '90%', width: '90%', 'max-height':'90&', height:'60%', 'border-radius': '5px', display: 'flex', 'flex-direction': 'column'}">
                <div class="flex-column justify-content-space-between">
                  <div class="dio-header-class flex-column">
                    <div class="p-l-10 p-r-10 p-t-20 p-b-20 flex-row justify-content-space-between align-items-center">
                      <div></div>
                      <div class="color-kpmgBlue font-size-18">
                        title
                      </div>
                      <div class="click-highLight-class" @click="closePicDialog">
                        <img src="../../assets/img/dialog-close.png" class="w-14"/>
                      </div>
                    </div>
                    <div class="driver-line-class"></div>
                  </div>
                </div>
                <div class="conten-class p-a-10 flex-grow flex-column">
                  <img class="previewer-demo-img m-auto max-w-200 max-h-200" v-for="(item, index) in list" :key="index" :src="item.src" @click="showPicDetail(index)"/>
                </div>
                <div class="dio-bottom-class flex-column justify-content-end">
                  <div class="driver-line-class"></div>
                  <div class="flex-row p-a-10 align-items-center">
                    <div class="w-per-50 p-a-5">
                      <x-button mini @click.native="closePicDialog" class="bg-white dialog-cancle-btn-color click-highLight-class w-100 h-30 color-btn-cancle font-size-14">{{$t("message.cancel")}}</x-button>
                    </div>
                    <div class="w-per-50 p-a-5">
                      <x-button mini @click.native="uploadPic" type="primary" class="bg-class click-highLight-class w-100 h-30 font-size-14">{{$t("message.ok")}}</x-button>
                    </div>
                  </div>
                </div>
              </x-dialog>
            </div>
            <!-- delete confirm -->
            <div v-transfer-dom>
              <confirm v-model="showDeletePicConfirm"
                       :title="$t('message.deleteThisPic')"
                       @on-confirm="deletePic"
                       @on-show="showDeletePicConfirm = true"
                       @on-hide="showDeletePicConfirm = false"
                       :confirm-text="$t('message.ok')"
                       :cancel-text="$t('message.cancel')">
                <p style="text-align:center;">{{$t('message.doYouWantToDeleteThisRecord')}}</p>
              </confirm>
            </div>
          </div>
          <group>
            <div class=" m-t-10">
              <div class="color-subTitle">{{$t("message.deductionCategory")}}<span class="color-red m-l-1">*</span></div>
              <cell is-link @click.native="showCategoryPlugin = true" class="border-a-class h-20" required>
                <span class="font-family-sansSerif" slot="title" :class="deductionCategoryObj[categoryValue] ?  'color-black' : 'color-subTitle'">{{deductionCategoryObj[categoryValue] || $t('message.pleaseSelect')}}</span>
              </cell>
              <popup-picker show-value :cancel-text="$t('message.cancel')" :confirm-text="$t('message.ok')" :show.sync="showCategoryPlugin" :show-cell="false" :data="deductionCategoryList"
                            v-model="categoryValue" @on-change="changeCategory"></popup-picker>
            </div>
            <div class="m-t-10">
              <div class="color-subTitle">{{$t("message.fapiaoNumber")}}<span class="color-red m-l-1">*</span></div>
              <x-input :max="8" :should-toast-error="false" @on-click-error-icon="toastFapiaoNumberError" :placeholder="$t('message.pleaseInput')" class="border-a-class" required :is-type="checkFapiaoNumber"></x-input>
            </div>
            <div class="m-t-10">
              <div class="color-subTitle">{{$t("message.fapiaoCode")}}<span class="color-red m-l-1">*</span></div>
              <x-input :max="12" :should-toast-error="false" @on-click-error-icon="toastFapiaoCodeError" :placeholder="$t('message.pleaseInput')" class="border-a-class" required :is-type="checkFapiaoCode"></x-input>
            </div>
            <div class="m-t-10">
              <div class="color-subTitle">{{$t("message.taxInclusiveAmount")}}<span class="color-red m-l-1">*</span></div>
              <div class="flex-row">
                <x-input :max="17" :should-toast-error="false" @on-click-error-icon="toastAmountError" :placeholder="$t('message.pleaseInput')" class="border-a-class w-per-50" required :is-type="checkAmount"></x-input>
                <div class="p-a-10 font-size-18 color-subTitle">{{$t('message.cny')}}</div>
              </div>
            </div>
            <!--<div class="m-t-10">
              <div class="color-subTitle m-t-10">{{$t("message.period")}}</div>
              <div class="m-t-2 flex-row">
                <div class="w-per-50 flex-column p-r-5">
                  <div class="color-subTitle">{{$t('message.from')}}</div>
                  <datetime format="DD/MM/YYYY" :order-map="{day: 1,month: 2, year: 3}"  :cancel-text="$t('message.cancel')" :confirm-text="$t('message.ok')" v-model="startTime" :show="showDate1" class="border-a-class no-text-decoration date-picker-class h-20 line-height-20" @on-hide="showDate1 = false" @on-show="showDate1 = true">
                    <span slot="title" class="font-size-16">{{startTime}}</span>
                  </datetime>
                </div>
                <div class="w-per-50 flex-column p-l-5">
                  <div class="color-subTitle">{{$t('message.to')}}</div>
                  <datetime format="DD/MM/YYYY" :order-map="{day: 1,month: 2, year: 3}" :cancel-text="$t('message.cancel')" :confirm-text="$t('message.ok')" v-model="endTime" class="border-a-class no-text-decoration date-picker-class h-20 line-height-20">
                    <span slot="title" class="font-size-16">{{endTime}}</span>
                  </datetime>
                </div>
              </div>
            </div>-->
          </group>
        </div>
        <!-- loading -->
        <loading-component v-if="$store.state.loadingFlag"></loading-component>
      </div>
    </div>
</template>

<script>
import util from '../../common/util/util'
import { Previewer, TransferDomDirective as TransferDom } from 'vux'
import loadingComponent from '../../components/LoadingCompoent'
export default {
  name: 'FapiaoUploadSave',
  components: {loadingComponent, Previewer},
  directives: {
    TransferDom
  },
  data () {
    return {
      deductionCategoryList: [],
      deductionCategoryObj: {},
      year: '',
      month: '',
      showCategoryPlugin: false,
      categoryValue: [],
      mobileFlag: '',
      // 上传发票参数
      commitFapiaoParams: {
        employeeId: '',
        faPiaoType: '',
        month: '',
        year: '',
        fileUploadParam: {
          fileName: '',
          fileUUID: ''
        }
      },
      proceedParams: {
        deductionCategory: '',
        fapiaoNumber: '',
        fapiaoCode: '',
        taxInclusiveAmount: '',
        eeFapiaoId: ''
      },
      // 返回是1  跳转是2
      backOrSave: '1',
      showPicActionsheet: false,
      menus: [this.$t('message.chooseFromAlbum'), this.$t('message.takePhoto')],
      destinationType: '',
      //  拍照后显示dialog
      showPicDialog: false,
      // 预览窗口
      showPreviewer: false,
      // 删除图片的confirm
      showDeletePicConfirm: false,
      // 上传前预览的图片list
      list: [
        //   {
        //   msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
        //   src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
        //   w: 800,
        //   h: 400
        // }
      ],
      // 上传后预览的图片list
      uploadedList: [

      ],
      // 预览的optios
      options: {
        getThumbBoundsFn (index) {
          let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          let rect = thumbnail.getBoundingClientRect()
          return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
        }
      },
      // 删除图片index
      deleteIndex: '',
      // 图片是否上传
      picHasUploaded: false,
      // 上传图片后的 url
      picUrl: '',
      src: 'https://media1.rrl360.com/product/0002/22/thumb_121601_default.jpg'
    }
  },
  mounted () {
    document.addEventListener('deviceready', this.onDeviceReady, false)
    this.deductionCategoryList = [[
      {value: '1', name: this.$t('message.housingMortgageInterest')},
      {value: '2', name: this.$t('message.rentalCosts')},
      {value: '3', name: this.$t('message.dependentChildrenEducation')},
      {value: '4', name: this.$t('message.continuingEducation')},
      {value: '5', name: this.$t('message.supplementaryInsurance')},
      {value: '6', name: this.$t('message.seriousIIIness')}
    ]]
    this.deductionCategoryObj = {
      '1': this.$t('message.housingMortgageInterest'),
      '2': this.$t('message.rentalCosts'),
      '3': this.$t('message.dependentChildrenEducation'),
      '4': this.$t('message.continuingEducation'),
      '5': this.$t('message.supplementaryInsurance'),
      '6': this.$t('message.seriousIIIness')
    }
    this.year = this.$route.query.year
    this.month = this.$route.query.month
  },
  beforeRouteLeave (to, from, next) {
    this.$store.commit('setLoadingFlag', false)
    // 设置下一个路由的 meta
    if (this.backOrSave === '1') {
      to.meta.isBack = true
    }
    next()
  },
  methods: {
    goback () {
      history.back()
    },
    save () {
      this.backOrSave = '2'
      history.back()
    },
    changeCategory (value) {
      this.proceedParams['deductionCategory'] = value[0]
    },
    // 修改发票number的错误提示
    toastFapiaoNumberError (value) {
      if (value === '必填哦') {
        this.$vux.toast.text(this.$t('message.tipCannotEmpty'))
      } else {
        this.$vux.toast.text(value)
      }
    },
    checkFapiaoNumber (value) {
      const reg = /^\d{8}$/
      if (reg.test(value)) {
        return {valid: true}
      }
      return {valid: false, msg: this.$t('message.integerLength8')}
    },
    // 修改发票code的错误提示
    toastFapiaoCodeError (value) {
      if (value === '必填哦') {
        this.$vux.toast.text(this.$t('message.tipCannotEmpty'))
      } else {
        this.$vux.toast.text(value)
      }
    },
    checkFapiaoCode (value) {
      const reg = /^(\d{12}|\d{10})$/
      if (reg.test(value)) {
        return {valid: true}
      }
      return {valid: false, msg: this.$t('message.integerLength10or12')}
    },
    // 修改发票amount的错误提示
    toastAmountError (value) {
      if (value === '必填哦') {
        this.$vux.toast.text(this.$t('message.tipCannotEmpty'))
      } else {
        // this.$vux.toast.show({
        //   text: value,
        //   time: 300000,
        //   type: 'text'
        // })
        this.$vux.toast.text(value)
      }
    },
    checkAmount (value) {
      const reg = /^(0|[1-9][0-9]{0,13})(\.[0-9]{1,2})?$/
      if (reg.test(value)) {
        return {valid: true}
      }
      return {valid: false, msg: this.$t('message.amountFailed')}
    },
    onDeviceReady () {
      this.destinationType = navigator.camera.DestinationType
      this.mobileFlag = util.isMobile()
      if (this.mobileFlag === 'android') {
        document.addEventListener('deviceready', this.onBackKeyDown, false)
      }
    },
    // 監聽安卓物理返回鍵
    onBackKeyDown () {
      if (this.$store.state.keyboardFlag) {
        window.cordova.plugins.Keyboard.close()
        // cordova.plugin.Keyboard.close()
      } else if (this.showPreviewer) {
        this.$refs.previewer.close()
      } else if (this.showPicDialog) {
        this.showPicDialog = false
      } else if (this.showPicActionsheet) {
        this.showPicActionsheet = false
      } else {
        history.back()
      }
    },
    addPic () {
      this.showPicActionsheet = true
    },
    chosePicType (value) {
      this.list.push({
        src: this.src,
        msrc: this.src
      })
      this.showPicDialog = true
      // 选择图片后弹出确认的dialog
      // if (value === 0) {
      //   this.openAlbum().then(res => {
      //     this.list.push({
      //       msrc: res,
      //       src: res
      //     })
      //     this.showPicDialog = true
      //   })
      // }
      // if (value === 1) {
      //   this.takePicture().then(res => {
      //     this.list.push({
      //       msrc: res,
      //       src: res
      //     })
      //     this.showPicDialog = true
      //   })
      // }
    },
    // 从相册
    openAlbum () {
      return new Promise((resolve, reject) => {
        navigator.camera.getPicture(onSuccess, onFail, {
          quality: 100,
          destinationType: navigator.camera.DestinationType.DATA_URL,
          encodingType: navigator.camera.EncodingType.JPEG,
          sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM,
          targetWidth: 2000,
          targetHeight: 2000,
          correctOrientation: true
        })

        function onSuccess (imageData) {
          resolve('data:image/jpeg;base64,' + imageData)
        }

        function onFail (message) {
          reject(message)
          alert(message)
        }
      })
    },
    // 从相机
    takePicture () {
      return new Promise((resolve, reject) => {
        navigator.camera.getPicture(onSuccess, onFail, {
          quality: 100,
          destinationType: navigator.camera.DestinationType.DATA_URL,
          encodingType: navigator.camera.EncodingType.JPEG,
          sourceType: navigator.camera.PictureSourceType.CAMERA,
          targetWidth: 2000,
          targetHeight: 2000,
          saveToPhotoAlbum: true,
          correctOrientation: true
        })
        function onSuccess (imageData) {
          resolve('data:image/jpeg;base64,' + imageData)
        }
        function onFail (message) {
          reject(message)
          alert(message)
        }
      })
    },
    // 显示图片预览
    showPicDetail (index) {
      this.$refs.previewer.show(index)
      this.showPreviewer = true
      this.showPicDialog = false
      // setTimeout(() => {
      //   this.$refs.previewer.close()
      // }, 1000)
    },
    // 图片预览关闭事件
    picPreviewerClose () {
      this.showPreviewer = false
      if (!this.picHasUploaded) {
        this.showPicDialog = true
      }
    },
    // 上传图片
    uploadPic () {
      this.showPicDialog = false
      this.picHasUploaded = true
      this.uploadedList.push({
        src: this.src,
        msrc: this.src
      })
      this.list = []
    },
    // 关闭dialog
    closePicDialog () {
      this.showPicDialog = false
      this.list = []
    },
    openDeleteConfirm (index) {
      this.deleteIndex = index
      this.showDeletePicConfirm = true
    },
    // 打开删除图片confirm
    deletePic () {
      this.uploadedList.splice(this.deleteIndex, 1)
      this.picHasUploaded = false
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../../assets/style/variables/color';
  .upload-img-class {
    width: 2rem;
    height: 2rem;
  }
  .w-200 {
    width: 4rem;
  }
  .h-200 {
    height: 4rem;
  }
  .max-w-100{
    max-width: 2rem;
  }
  .max-w-200{
    max-width: 4rem;
  }
  .max-h-100{
    max-height: 2rem;
  }
  .max-h-200{
    max-height: 4rem;
  }
  .deletePic-btn-class{
    top: 0rem;
    right: 0rem;
    width: 0.4rem;
  }
</style>
