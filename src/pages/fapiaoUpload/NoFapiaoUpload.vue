<template>
  <div class="h-per-100  no-overflow flex-column flex-grow">
    <div class="flex-column flex-grow">
      <div class="flex-column m-t-75">
        <div class="flex-column m-auto">
          <div class="img-bg flex-column">
            <img src="../../assets/img/icon-contract-empty.png" class="img-class"/>
          </div>
        </div>
        <div class="text-class">{{$t("message.noFapiaoUploadMsg")}}</div>
        <div class="m-auto m-t-20 flex-row click-highLight-class" @click="changeValue">
          <div class="check-class m-auto flex-row">
            <img v-show="!checkedValue" src="../../assets/img/no-fp-to-sbt-check.png" class="arrow-checked-class m-auto"/>
          </div>
          <div class="font-size-16 color-kpmgBlue m-l-10">{{$t("message.noFapiaoToSubmit")}}</div>
        </div>
      </div>
      <div class="m-t-30 flex-column">
        <x-button mini :disabled="!checkedValue" class="btn-class" :class="!checkedValue ? 'btn-disabled-class' : ''" @click.native="goUploadDetail"><span>{{$t("message.goFapiaoUploadBtn")}}</span></x-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['canChange', 'checkValue'],
  name: 'NoFapiaoUpload',
  data () {
    return {
      checkedValue: this.checkValue
    }
  },
  mounted () {
  },
  watch: {
    checkValue (newValue) {
      this.checkedValue = newValue
    }
  },
  methods: {
    goUploadDetail () {
      this.$emit('goSave')
    },
    changeValue () {
      if (this.canChange) {
        this.checkedValue = !this.checkedValue
        this.$emit('clickToAddFlagFn', this.checkedValue)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../../assets/style/variables/color';
  .img-bg{
    width: 3.5rem;
    height: 3.5rem;
    background-color: $contractUploadBg;
    border-radius: 100%;
  }
  .img-class{
    width: 1.2rem;
    margin: auto;
  }
  .m-t-75{
    margin-top: 1.5rem;
  }
  .text-class{
    padding:0.5rem 0.5rem;
    font-size: 0.32rem;
    text-align: center;
    color: $perDtlsBannerInputTitle;
  }
  .btn-class {
    width: 50%;
    margin: auto;
    height: 1rem;
    line-height: 1rem;
    background-color: $loginForgetPsdBtnBg;
    color: $white;
    font-size: 0.32rem;
  }
  .check-class{
    width: 0.3rem;
    height: 0.3rem;
    background-color: $contractUploadBg;
  }
  .arrow-checked-class{
    width: 0.24rem;
  }

  input[type="checkbox"] {
    width: 0.3rem;
    height: 0.3rem;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    line-height: 0.3rem;
    position: relative;
    margin: auto;
    border: 0rem !important;
  }

  input[type="checkbox"]::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    background: $contractUploadBg;
    width: 100%;
    height: 100%;
    border: 0rem !important;
  }

  input[type="checkbox"]:checked::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    border: 0rem !important;
    color: #013695;
    font-size: 0.28rem;
    font-weight: lighter;

    background: url("../../assets/img/no-fp-to-sbt-check.png") no-repeat $contractUploadBg center;
    background-size: 0.24rem 0.24rem;
  }
  .btn-disabled-class{
    background-color: $btnDisabled;
    color: gray !important;
    &::after{
      border: none !important;
    }
  }
</style>
