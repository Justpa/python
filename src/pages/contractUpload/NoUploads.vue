<template>
  <div class="h-per-100  no-overflow flex-column">
    <div class="flex-column flex-grow">
      <div class="flex-column m-t-75">
          <div class="flex-column m-auto">
            <div class="img-bg flex-column">
              <img src="../../assets/img/icon-contract-empty.png" class="img-class"/>
            </div>
          </div>
        <div class="text-class">{{$t("message.noContractUpload")}}</div>
      </div>
      <div class="m-t-30 flex-column">
        <x-button mini class="btn-class" @click.native="goUploadDetail"><span>{{$t("message.goContractUploadBtn")}}</span></x-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title'],
  name: 'PublicUpload',
  data () {
    return {
    }
  },
  methods: {
    goUploadDetail () {
      this.$router.push('uploadDetails')
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
  .btn-class{
    width: 50%;
    margin: auto;
    height: 1rem;
    line-height: 1rem;
    background-color: $loginForgetPsdBtnBg;
    color: $white;
    font-size: 0.32rem;
  }
</style>
