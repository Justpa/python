<template>
  <div class="h-per-100 no-overflow flex-column notifications-class">
    <div class="flex-shrink">
      <x-header style="background-color: #013695">
        <a slot="overwrite-left" class="font-size-16 flex-row m-l-negative-16" @click="goback">
          <div class="h-40">
            <img src="../../assets/img/back.png" class="header-left-btn"/>
          </div>
          <div class="m-l-negative-5">{{$t("message.back")}}</div>
        </a>
        {{$t('message.notificationsAndGuidance')}}
      </x-header>
    </div>
    <div class="overflow-y-scroll flex-grow bg-gray-light">
      <div class="flex-grow flex-column p-a-15">
        <div class="m-t-15 flex-row">
          <div class="left-item-class bg-color-1"></div>
          <div class="right-item-class flex-row">
            <div class="flex-row p-a-15 flex-grow">
              <div class="w-per-75 m-auto font-size-26">
                {{$t("message.taxFilingDueDates")}}
              </div>
              <div class="w-per-25 flex-row align-items-center justify-content-end">
                <img src="../../assets/img/icon-notificatioin-01.png" class="icon-class"/>
              </div>
            </div>
          </div>
        </div>
        <div class="m-t-15 flex-row">
          <div class="left-item-class bg-color-2"></div>
          <div class="right-item-class flex-row">
            <div class="flex-row p-a-15 flex-grow">
              <div class="w-per-75 m-auto font-size-26">
                {{$t("message.taxFilingGuidance")}}
              </div>
              <div class="w-per-25 flex-row align-items-center justify-content-end">
                <img src="../../assets/img/icon-notificatioin-02.png" class="icon-class"/>
              </div>
            </div>
          </div>
        </div>
        <div class="m-t-15 flex-row">
          <div class="left-item-class bg-color-3"></div>
          <div class="right-item-class flex-row">
            <div class="flex-row p-a-15 flex-grow">
              <div class="w-per-75 m-auto font-size-26">
                {{$t("message.taxEvents")}}
              </div>
              <div class="w-per-25 flex-row align-items-center justify-content-end">
                <img src="../../assets/img/icon-notificatioin-03.png" class="icon-class"/>
              </div>
            </div>
          </div>
        </div>
        <div class="m-t-15 flex-row">
          <div class="left-item-class bg-color-4"></div>
          <div class="right-item-class flex-row">
            <div class="flex-row p-a-15 flex-grow">
              <div class="w-per-75 m-auto font-size-26">
                {{$t("message.subscribedCountryTaxAlerts")}}
              </div>
              <div class="w-per-25 flex-row align-items-center justify-content-end">
                <img src="../../assets/img/icon-notificatioin-04.png" class="icon-class"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotificationsAndGuidance',
  data () {
    return {

    }
  },
  mounted () {

  },
  methods: {
    goback () {
      history.back()
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../../assets/style/variables/color';
  .left-item-class{
    height: 2.4rem;
    width: 3%;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  .bg-color-1{
    background-color: $greenLitter;
  }
  .bg-color-2{
    background-color: $orangeLitter;
  }
  .bg-color-3{
    background-color: $blueLitter;
  }
  .bg-color-4{
    background-color: $purpleLitter;
  }
  .right-item-class{
    height: 2.4rem;
    width: 97%;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    background-color: white;
  }
  .icon-class {
    width: 1.4rem;
    height: 1.4rem;
  }
  .w-per-75 {
    width: 75%;
  }
  .w-per-25 {
    width: 25%;
  }
</style>
