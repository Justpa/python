<template>
  <div class="h-per-100 no-overflow contract-upload-list flex-column">
    <div class="flex-shrink">
      <x-header style="background-color: #013695">
        <a slot="overwrite-left" class="font-size-16 flex-row m-l-negative-16" @click="goback">
          <div class="h-40">
            <img src="../../assets/img/back.png" class="header-left-btn"/>
          </div>
          <div class="m-l-negative-5">{{$t("message.back")}}</div>
        </a>
        <a slot="right" class="color-white font-size-22" v-if="hasDataFlag === '2'"  @click="goSave">+</a>
        {{title}}
      </x-header>
    </div>
    <div class="flex-grow flex-column">
      <div v-if="hasDataFlag === '1'">
        <no-uploads :title="title"></no-uploads>
      </div>
      <div v-if="hasDataFlag === '2'" class="flex-column flex-grow">
        <div class="flex-grow overflow-y-scroll p-a-10 bg-gray-light flex-column p-t-0" ref="contractList">
          <div v-for="(item, index) of dataList" :key="index">
            <!--<div class="flex-column flex-shrink" v-if="item['status'] === 'Current'">
              <div class="bg-banner h-banner1-class border-radius-5px flex-column p-a-5 position-relative">
                <div class="p-a-5 flex-column">
                  <div class="flex-grow p-a-5 flex-column">
                    <div class="color-subTitle font-size-12">{{$t("message.contractType")}}</div>
                    <div class="color-white font-size-14">Mortgage</div>
                  </div>
                  <div class="flex-grow p-a-5 flex-column">
                    <div class="color-subTitle font-size-12">{{$t("message.contractPerio")}}</div>
                    <div class="color-white font-size-14">
                      <span>{{$t("message.from")}}</span>
                      <span>{{item['startDate']}}</span>
                      <span>{{$t("message.to")}}</span>
                      <span>{{item['endDate']}}</span>
                    </div>
                  </div>
                  <div class="flex-grow p-a-5 flex-column">
                    <div class="color-subTitle font-size-12">{{$t("message.propertyAddress")}}</div>
                    <div class="color-white font-size-14">{{item['propertyAddress']}}</div>
                  </div>
                </div>
                <div class="position-absolute top-10 right-10">
                  <div class="current-class color-subTitle font-size-14 opacity-5">
                    {{$t("message.current")}}
                  </div>
                </div>
                <div class="position-absolute right-10 bottom-10">
                  <img src="../../assets/img/icon-contract-empty.png" class="w-40 opacity-5"/>
                </div>
              </div>
              <div class="h-banner2-class bg-banner border-radius-5px p-a-5 flex-column">
                <div class="flex-grow p-a-10 flex-row align-items-center">
                  <div class="color-white font-size-12">{{$t("message.attachments")}}</div>
                  <div class="color-red  font-size-12 p-l-10"><span class="color-orange">{{item['contractList'] ? item['contractList'].length : '0'}}</span>
                    <span class="p-l-5 color-orange">{{item['contractList'] && item['contractList'].length > 1 ? $t("message.items") : $t("message.item")}}</span></div>
                </div>
              </div>
            </div>
            <div class="m-t-15 flex-shrink flex-row" v-if="item['status'] === 'Current'">
              <div></div>
              <div class="color-kpmgBlue font-bold">{{$t("message.perviousContracts")}}</div>
            </div>-->
            <div class="flex-column flex-shrink m-t-10">
              <div class="bg-white h-banner1-class border-radius-5px flex-column p-a-5 position-relative">
                <div class="position-absolute right-10 bottom-10">
                  <img src="../../assets/img/icon-contract-empty.png" class="w-40 opacity-5"/>
                </div>
                <div class="p-a-5 flex-column">
                  <div class="flex-grow p-a-5 flex-column">
                    <div class="color-subTitle font-size-12">{{$t("message.contractType")}}</div>
                    <div class="color-kpmgBlue font-size-14">Mortgage</div>
                  </div>
                  <div class="flex-grow p-a-5 flex-column">
                    <div class="color-subTitle font-size-12">{{$t("message.contractPerio")}}</div>
                    <div class="color-kpmgBlue font-size-14">
                      <span>{{$t("message.from")}}</span>
                      <span>{{item['startDate']}}</span>
                      <span>{{$t("message.to")}}</span>
                      <span>{{item['endDate']}}</span>
                    </div>
                  </div>
                  <div class="flex-grow p-a-5 flex-column">
                    <div class="color-subTitle font-size-12">{{$t("message.propertyAddress")}}</div>
                    <div class="color-kpmgBlue font-size-14 word-break">{{item['propertyAddress']}}</div>
                  </div>
                </div>
              </div>
              <div class="h-banner2-class bg-white border-radius-5px p-a-5 flex-column">
                <div class="flex-grow p-a-10 flex-row align-items-center">
                  <div class="font-size-12">{{$t("message.attachments")}}</div>
                  <div class="color-red  font-size-12 p-l-10"><span class="color-orange">{{item['contractList'] ? item['contractList']['lenght'] : 0}}</span><span class="p-l-5 color-orange">{{ $t("message.item")}}</span></div>
                </div>
              </div>
            </div>
          </div>
          <!--        <div class="flex-column flex-shrink m-t-10">
                    <div class="bg-white h-banner1-class border-radius-5px flex-column p-a-5 position-relative">
                      <div class="position-absolute right-10 bottom-10">
                        <img src="../../assets/img/icon-contract-empty.png" class="w-40"/>
                      </div>
                      <div class="p-a-5 flex-column">
                        <div class="flex-grow p-a-5 flex-column">
                          <div class="color-subTitle font-size-12">{{$t("message.contractType")}}</div>
                          <div class="color-kpmgBlue font-size-14">Mortgage</div>
                        </div>
                        <div class="flex-grow p-a-5 flex-column">
                          <div class="color-subTitle font-size-12">{{$t("message.contractPerio")}}</div>
                          <div class="color-kpmgBlue font-size-14">
                            <span>{{$t("message.from")}}</span>
                            <span>01/01/2018</span>
                            <span>{{$t("message.to")}}</span>
                            <span>31/12/2030</span>
                          </div>
                        </div>
                        <div class="flex-grow p-a-5 flex-column">
                          <div class="color-subTitle font-size-12">{{$t("message.propertyAddress")}}</div>
                          <div class="color-kpmgBlue font-size-14">1266 Nanjing West Road, Shanghai</div>
                        </div>
                      </div>
                    </div>
                    <div class="h-banner2-class bg-white border-radius-5px p-a-5 flex-column">
                      <div class="flex-grow p-a-10 flex-row align-items-center">
                        <div class="font-size-12">{{$t("message.attachments")}}</div>
                        <div class="color-red  font-size-12 p-l-10"><span>1</span><span class="p-l-5">{{$t("message.item")}}</span></div>
                      </div>
                    </div>
                  </div>
                  <div class="flex-column flex-shrink m-t-10">
                    <div class="bg-white h-banner1-class border-radius-5px flex-column p-a-5 position-relative">
                      <div class="position-absolute right-10 bottom-10">
                        <img src="../../assets/img/icon-contract-empty.png" class="w-40"/>
                      </div>
                      <div class="p-a-5 flex-column">
                        <div class="flex-grow p-a-5 flex-column">
                          <div class="color-subTitle font-size-12">{{$t("message.contractType")}}</div>
                          <div class="color-kpmgBlue font-size-14">Mortgage</div>
                        </div>
                        <div class="flex-grow p-a-5 flex-column">
                          <div class="color-subTitle font-size-12">{{$t("message.contractPerio")}}</div>
                          <div class="color-kpmgBlue font-size-14">
                            <span>{{$t("message.from")}}</span>
                            <span>01/01/2018</span>
                            <span>{{$t("message.to")}}</span>
                            <span>31/12/2030</span>
                          </div>
                        </div>
                        <div class="flex-grow p-a-5 flex-column">
                          <div class="color-subTitle font-size-12">{{$t("message.propertyAddress")}}</div>
                          <div class="color-kpmgBlue font-size-14">1266 Nanjing West Road, Shanghai</div>
                        </div>
                      </div>
                    </div>
                    <div class="h-banner2-class bg-white border-radius-5px p-a-5 flex-column">
                      <div class="flex-grow p-a-10 flex-row align-items-center">
                        <div class="font-size-12">{{$t("message.attachments")}}</div>
                        <div class="color-red  font-size-12 p-l-10"><span>1</span><span class="p-l-5">{{$t("message.item")}}</span></div>
                      </div>
                    </div>
                  </div>
                  <div class="flex-column flex-shrink m-t-10">
                    <div class="bg-white h-banner1-class border-radius-5px flex-column p-a-5 position-relative">
                      <div class="position-absolute right-10 bottom-10">
                        <img src="../../assets/img/icon-contract-empty.png" class="w-40"/>
                      </div>
                      <div class="p-a-5 flex-column">
                        <div class="flex-grow p-a-5 flex-column">
                          <div class="color-subTitle font-size-12">{{$t("message.contractType")}}</div>
                          <div class="color-kpmgBlue font-size-14">Mortgage</div>
                        </div>
                        <div class="flex-grow p-a-5 flex-column">
                          <div class="color-subTitle font-size-12">{{$t("message.contractPerio")}}</div>
                          <div class="color-kpmgBlue font-size-14">
                            <span>{{$t("message.from")}}</span>
                            <span>01/01/2018</span>
                            <span>{{$t("message.to")}}</span>
                            <span>31/12/2030</span>
                          </div>
                        </div>
                        <div class="flex-grow p-a-5 flex-column">
                          <div class="color-subTitle font-size-12">{{$t("message.propertyAddress")}}</div>
                          <div class="color-kpmgBlue font-size-14">1266 Nanjing West Road, Shanghai</div>
                        </div>
                      </div>
                    </div>
                    <div class="h-banner2-class bg-white border-radius-5px p-a-5 flex-column">
                      <div class="flex-grow p-a-10 flex-row align-items-center">
                        <div class="font-size-12">{{$t("message.attachments")}}</div>
                        <div class="color-red  font-size-12 p-l-10"><span>1</span><span class="p-l-5">{{$t("message.item")}}</span></div>
                      </div>
                    </div>
                  </div>-->
        </div>
      </div>
      <!-- loading -->
      <loading-component v-if="$store.state.loadingFlag"></loading-component>
    </div>
  </div>
</template>

<script>
import noUploads from './NoUploads'
import {queryContractHmiList} from './contractUploadApi'
import loadingComponent from '../../components/LoadingCompoent'

export default {
  name: 'ContractUploadList',
  components: {noUploads, loadingComponent},
  data () {
    return {
      employeeId: JSON.parse(window.localStorage.getItem('userInfo'))['userName'],
      hasDataFlag: '0', // 0 表示不确定  1为没有数据 2为有数据
      title: this.$route.query.title,
      dataList: []
    }
  },
  mounted () {
  },
  activated () {
    // 跳转过来
    if (!this.$route.meta.isBack) {
      this.getContractHmiList()
    } else {
      // 返回过来
      if (this.hasDataFlag === '2') {
        this.$refs.contractList.scrollTop = this.$store.state.contractListScrollTop
        this.$store.commit('setContractListScrollTop', 0)
      }
    }
    this.$route.meta.isBack = false
  },
  beforeRouteLeave (to, from, next) {
    this.$store.commit('setLoadingFlag', false)
    // 有数据  把滚动的记录保存到缓存里
    if (this.hasDataFlag === '2') {
      const scrollTop = this.$refs.contractList.scrollTop
      this.$store.commit('setContractListScrollTop', scrollTop)
    }
    next()
  },
  methods: {
    goback () {
      history.back()
    },
    goSave () {
      this.$router.push('uploadDetails')
    },
    getContractHmiList () {
      this.$store.commit('setLoadingFlag', true)
      queryContractHmiList({employeeId: this.employeeId}).then(res => {
        if (res['success']) {
          this.dataList = res['data']
          if (this.dataList.length > 0) {
            this.dataList.reverse()
            this.hasDataFlag = '2'
          } else {
            this.hasDataFlag = '1'
          }
        }
        this.$store.commit('setLoadingFlag', false)
      })
    }
  }

}
</script>

<style scoped lang="scss">
  @import '../../assets/style/variables/color';
  .h-banner1-class{
    height: auto;
  }
  .h-banner2-class{
    height: 0.8rem;
    border-top: 0.5px dashed $contractUploadBg;
  }
  .current-class{
    width: 1.6rem;
    line-height: 0.6rem;
    height: 0.6rem;
    text-align: center;
    border: 0.05rem solid $perDtlsBannerInputTitle;
    opacity: 0.5;
  }
  .top-10{
    top: 0.2rem;
  }
  .right-10{
    right: 0.2rem;
  }
  .bottom-10{
    bottom: 0.2rem;
  }
  .w-40{
    width: 0.8rem;
  }
  .opacity-5{
    opacity: 0.5;
  }
  .color-orange{
    color: $orange;
  }
</style>
