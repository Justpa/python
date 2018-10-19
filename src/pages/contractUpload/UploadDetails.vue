<template>
  <div class="h-per-100 flex-column no-overflow uploadDetails-class">
    <div class="flex-shrink">
      <x-header style="background-color: #013695">
        <a slot="overwrite-left" class="font-size-16 flex-row m-l-negative-16" @click="goback">
          <div class="h-40">
            <img src="../../assets/img/back.png" class="header-left-btn"/>
          </div>
          <div class="m-l-negative-5">{{$t("message.back")}}</div>
        </a>
        <a slot="right"  class="color-white" @click="save">{{$t("message.save")}}</a>
        {{$t('message.uploadContract')}}
      </x-header>
    </div>
    <div class="flex-column p-a-10 overflow-y-scroll flex-grow">
      <div class="flex-column flex-shrink">
        <div class="color-subTitle">{{$t('message.uploadContractCameraTitle')}}</div>
        <div class="flex-row">
          <div class="flex-row flex-wrap">
            <div class="upload-img-class border-a-class flex-row m-t-5" @click="addPic">
              <div class="m-auto">
                <img src="../../assets/img/plus-camera.png">
              </div>
            </div>
            <div  v-for="(item, index) in uploadedList" :key="index" class="m-l-10 position-relative m-t-5">
              <img class="previewer-demo-img m-auto max-w-100 max-h-100" :src="item.src" @click="showPicDetail(index)"/>
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
      <div class="flex-column flex-shrink">
        <group>
          <div class="m-t-10">
            <div class="color-subTitle">{{$t("message.contractNumber")}}<span class="color-red m-l-1">*</span></div>
            <x-input required :max="45" :should-toast-error="false" :placeholder="$t('message.pleaseInput')" class="border-a-class"
                     @on-click-error-icon="toastError" keyboard="number" v-model="submitParams['contractNumber']"></x-input>
          </div>
          <div class="m-t-10">
            <div class="color-subTitle m-t-10">{{$t("message.dateMortgageCommenced")}}</div>
            <div class="m-t-2 flex-row">
              <div class="w-per-50 flex-column p-r-5">
                <div class="color-subTitle">{{$t('message.from')}}<span class="color-red m-l-1">*</span></div>
                <datetime :default-selected-value="defaultDate" :min-year="2011" :max-year="2025" format="DD/MM/YYYY" :end-date="dateFormat(submitParams['endDate'])"
                          :order-map="{day: 1,month: 2, year: 3}" :cancel-text="$t('message.cancel')" :confirm-text="$t('message.ok')" v-model="submitParams['startDate']" :show="showDate1" class="border-a-class no-text-decoration date-picker-class h-20 line-height-20" @on-hide="showDate1 = false" @on-show="showDate1 = true">
                  <span slot="title" class="font-size-16" :class="submitParams['startDate'] ?  'color-black' : 'color-subTitle'">{{submitParams['startDate'] || $t('message.pleaseSelect')}}</span>
                </datetime>
              </div>
              <div class="w-per-50 flex-column p-l-5">
                <div class="color-subTitle">{{$t('message.to')}}<span class="color-red m-l-1">*</span></div>
                <datetime :default-selected-value="defaultDate" :min-year="2011" :max-year="2025" format="DD/MM/YYYY" :start-date="dateFormat(submitParams['startDate'])"
                          :order-map="{day: 1,month: 2, year: 3}" :cancel-text="$t('message.cancel')" :confirm-text="$t('message.ok')" v-model="submitParams['endDate']" class="border-a-class no-text-decoration date-picker-class h-20 line-height-20">
                  <span slot="title" class="font-size-16" :class="submitParams['endDate'] ?  'color-black' : 'color-subTitle'">{{submitParams['endDate'] || $t('message.pleaseSelect')}}</span>
                </datetime>
              </div>
            </div>
          </div>
          <div class="m-t-10 flex-row h-40">
            <div class="color-subTitle">{{$t("message.lengthOfMortgage")}}</div>
            <div class="counts-class font-size-18">{{differenceYear}}</div>
            <div class="color-subTitle">{{$t("message.years")}}</div>
          </div>
          <div class="m-t-10">
            <div class="color-subTitle">{{$t("message.propertyAddress")}}<span class="color-red">*</span></div>
            <x-input required :should-toast-error="false" @on-click-error-icon="toastError" placeholder="Pleact input" class="border-a-class"></x-input>
          </div>
        </group>
      </div>
      <!-- loading -->
      <loading-component v-if="$store.state.loadingFlag"></loading-component>
    </div>
  </div>
</template>

<script>
import util from '../../common/util/util'
import loadingComponent from '../../components/LoadingCompoent'
import { Previewer, TransferDomDirective as TransferDom } from 'vux'
// import {addContractHmi} from './contractUploadApi'

export default {
  name: 'Upload',
  components: {Previewer, loadingComponent},
  directives: {
    TransferDom
  },
  data () {
    return {
      mobileFlag: '',
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
      src: 'https://media1.rrl360.com/product/0002/22/thumb_121601_default.jpg',
      showDate1: false,
      showDate2: false,
      submitParams: {
        contractNumber: '',
        employeeId: JSON.parse(window.localStorage.getItem('userInfo'))['employeeId'],
        startDate: '',
        endDate: '',
        propertyAddress: '',
        fileUploadResultList: []
      },
      // 选择时间是默认值
      defaultDate: util.dateFormat(new Date(), 'dd/MM/yyyy'),
      // 年差
      differenceYear: 0,
      // 是跳转还是返回
      backOrSave: '1'
    }
  },
  watch: {
    submitParams: {
      handler (newName) {
        if (newName['startDate'] && newName['endDate']) {
          this.differenceYear = newName['endDate'].slice(6) - newName['startDate'].slice(6) + 1
        }
      },
      immediate: true,
      deep: true
    }
  },
  mounted () {
    document.addEventListener('deviceready', this.onDeviceReady, false)
  },
  beforeRouteLeave (to, from, next) {
    this.$store.commit('setLoadingFlag', false)
    // 设置下一个路由的 meta
    if (to.name === 'ContractUploadList') {
      if (this.backOrSave === '1') {
        to.meta.isBack = true
      } else {
        to.meta.isBack = false
      }
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
    onDeviceReady () {
      this.destinationType = navigator.camera.DestinationType
      this.mobileFlag = util.isMobile()
      if (this.mobileFlag === 'android') {
        document.addEventListener('backbutton', this.onBackKeyDown, false)
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
      } else if (this.showDate1) {
        this.showDate1 = false
      } else if (this.showDate2) {
        this.showDate2 = false
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
          // alert(message)
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
          // alert(message)
        }
      })
    },
    // 显示图片预览
    showPicDetail (index) {
      this.$refs.previewer.show(index)
      this.showPreviewer = true
      this.showPicDialog = false
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
    },
    // 校验的错误提示
    toastError () {
      this.$vux.toast.text(this.$t('message.tipCannotEmpty'))
    },
    // 將dd/MM/yyyy 轉成 yyyy/MM/dd
    dateFormat (value) {
      if (value) {
        const list = value.split('/')
        return list[2] + '/' + list[1] + '/' + list[0]
      } else {
        return ''
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
  @import '../../assets/style/variables/color';
  .upload-img-class {
    width: 2rem;
    height: 2rem;
  }
  .font-size-88 {
    font-size: 1.76rem;
  }
  .counts-class {
    width: 2rem;
    text-align: center;
    background-color: $perDtlsBannerInputBorderOrDataBg;
    margin: 0px 10px;
  }
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
