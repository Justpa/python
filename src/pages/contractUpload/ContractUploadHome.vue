<template>
    <div class="h-per-100 no-overflow flex-column contract-upload">
      <div class="flex-shrink">
        <!--<header-compoent :title="$t('message.contractUpload')" @goback="goback"></header-compoent>-->
        <x-header style="background-color: #013695">
          <a slot="overwrite-left" class="font-size-16 flex-row m-l-negative-16" @click="goback">
            <div class="h-40">
              <img src="../../assets/img/back.png" class="header-left-btn"/>
            </div>
            <div class="m-l-negative-5">{{$t("message.back")}}</div>
          </a>
          {{$t('message.contractUpload')}}
        </x-header>
      </div>
      <div class="flex-grow bg-gray-light flex-column overflow-y-scroll">
        <div class="flex-column p-t-10 p-b-10 flex-grow">
          <div class="flex-row" style="height: 3.75rem">
            <div class="w-per-50 p-a-10" @click="goDifferencePage('contractUploadList',$t('message.housingMortgageInterestLow'))">
              <div  class="w-per-100 h-per-100 flex-column align-items-center bg-white border-radius-5px">
                <div class="align-items-center flex-column m-t-20">
                  <div class="inner-bg-class flex-column">
                    <div class="m-auto"><img src="../../assets/img/icon-contract-01.png" class="img-class"/></div>
                  </div>
                  <div class="color-kpmgBlue m-t-5 font-size-18 text-center">{{$t("message.housingMortgageInterest")}}</div>
                </div>
              </div>
            </div>
            <div class="w-per-50 p-a-10">
              <div  class="w-per-100 h-per-100 flex-column align-items-center bg-white border-radius-5px">
                <div class="align-items-center flex-column m-t-20">
                  <div class="inner-bg-class flex-column">
                    <div class="m-auto"><img src="../../assets/img/icon-contract-02.png" class="img-class"/></div>
                  </div>
                  <div class="color-kpmgBlue m-t-5 font-size-18 text-center">{{$t("message.rentalCosts")}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex-row" style="height: 3.75rem">
            <div class="w-per-50 p-a-10">
              <div  class="w-per-100 h-per-100 flex-column align-items-center bg-white border-radius-5px">
                <div class="align-items-center flex-column m-t-20">
                  <div class="inner-bg-class flex-column">
                    <div class="m-auto"><img src="../../assets/img/icon-contract-03.png" class="img-class"/></div>
                  </div>
                  <div class="color-kpmgBlue m-t-5 font-size-18 text-center">{{$t("message.dependentChildrenEducation")}}</div>
                </div>
              </div>
            </div>
            <div class="w-per-50 p-a-10">
              <div  class="w-per-100 h-per-100 flex-column align-items-center bg-white border-radius-5px">
                <div class="align-items-center flex-column m-t-20">
                  <div class="inner-bg-class flex-column">
                    <div class="m-auto"><img src="../../assets/img/icon-contract-04.png" class="img-class"/></div>
                  </div>
                  <div class="color-kpmgBlue m-t-5 font-size-18 text-center">{{$t("message.continuingEducation")}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex-row" style="height: 3.75rem">
            <div class="w-per-50 p-a-10">
              <div  class="w-per-100 h-per-100 flex-column align-items-center bg-white border-radius-5px">
                <div class="align-items-center flex-column m-t-20">
                  <div class="inner-bg-class flex-column">
                    <div class="m-auto"><img src="../../assets/img/icon-contract-05.png" class="img-class"/></div>
                  </div>
                  <div class="color-kpmgBlue m-t-5 font-size-18 text-center">{{$t("message.supplementaryInsurance")}}</div>
                </div>
              </div>
            </div>
            <div class="w-per-50 p-a-10">
              <div  class="w-per-100 h-per-100 flex-column align-items-center bg-white border-radius-5px">
                <div class="align-items-center flex-column m-t-20">
                  <div class="inner-bg-class flex-column">
                    <div class="m-auto"><img src="../../assets/img/icon-contract-06.png" class="img-class"/></div>
                  </div>
                  <div class="color-kpmgBlue m-t-5 font-size-18 text-center">{{$t("message.seriousIIIness")}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import headerCompoent from '../../components/HeaderCompoent'
export default {
  name: 'ContractUpload',
  components: {headerCompoent},
  methods: {
    goback () {
      history.back()
    },
    goDifferencePage (path, title) {
      this.$router.push({path: path, query: {title: title}})
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$store.commit('setLoadingFlag', false)
    // 设置下一个路由的 meta
    if (to.name === 'ContractUploadList') {
      to.meta.isBack = false
    }
    next()
  }
}
</script>

<style scoped lang="scss">
  @import '../../assets/style/variables/color';
  .height-class{
    height: 3.35rem;
  }
  .width-class{
    width: 3rem;
  }
  .inner-bg-class{
    height: 1.6rem;
    width: 1.6rem;
    border-radius: 100%;
    background-color: $contractUploadBg
  }
  .img-class{
    width: 1.4rem;
    width: 1.4rem
  }
</style>
