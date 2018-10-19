<template>
  <div class="flex-column flex-shrink">
    <div class="color-subTitle">{{uploadTitle}}</div>
    <div class="flex-row m-t-5">
      <div  v-if="uploadedList.length === 0" class="upload-img-class border-a-class flex-row" @click="addPic">
        <div class="m-auto">
          <img src="../assets/img/plus-camera.png">
        </div>
      </div>
      <div v-if="uploadedList.length > 0" class="position-relative">
        <div  v-for="(item, index) in uploadedList" :key="index">
          <img class="previewer-demo-img m-auto max-w-200 max-h-200"
              :src="item.src" @click="showPicDetail(index)"/>
          <img src="../assets/img/delete-pic.png" class="position-absolute deletePic-btn-class" @click="openDeleteConfirm(index)"/>
        </div>
      </div>
    </div>
    <div>
      <actionsheet v-model="showPicActionsheet" :menus="menus2" @on-click-menu="chosePicType" show-cancel></actionsheet>
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
                <img src="../assets/img/dialog-close.png" class="w-14"/>
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
               title="操作提示"
               @on-confirm="deletePic"
               @on-show="showDeletePicConfirm = true"
               @on-hide="showDeletePicConfirm = false">
        <p style="text-align:center;">删除</p>
      </confirm>
    </div>
  </div>
</template>

<script>
import { Previewer, TransferDomDirective as TransferDom } from 'vux'
export default {
  props: ['uploadTitle'],
  name: 'UploadComponent',
  components: {Previewer},
  directives: {
    TransferDom
  },
  data () {
    return {
      showPicActionsheet: false,
      menus2: ['照片库', '相机'],
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
  },
  methods: {
    onDeviceReady () {
      this.destinationType = navigator.camera.DestinationType
    },
    addPic () {
      this.showPicActionsheet = true
    },
    chosePicType (value) {
      console.log(value)
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
    logIndexChange (arg) {
      console.log(arg)
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
    }
    // upLoadImg (imageURI) {
    //   var options = new FileUploadOptions()
    //   options.chunkedMode = false
    //   options.fileKey = 'file'
    //   options.fileName = imageURI.substring(imageURI.lastIndexOf('/')+1)
    //   options.mimeType = 'image/jpeg'
    //   options.httpMethod = 'POST'
    //   console.log('options=======')
    //   console.log(options)
    //   var fileTransfer = new FileTransfer()
    //   var successCallback = function (r) {
    //     console.log('Code = ' + r.responseCode)
    //     console.log('Response = ' + r.response)
    //     console.log('Sent = ' + r.bytesSent)
    //   }
    //   var errorCallback = function (error) {
    //     console.log('An error has occurred: Code = ' + error.code)
    //     console.log('upload error source ' + error.source)
    //     console.log('upload error target ' + error.target)
    //   }
    //   fileTransfer.upload(
    //     imageURI,
    //     encodeURI('http://10.1.10.53:8089/oss/UploadServlet'),
    //     successCallback,
    //     errorCallback,
    //     options
    //   )
    // }

  }
}
</script>

<style scoped lang="scss">
  @import '../assets/style/variables/color';
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
  }

</style>
