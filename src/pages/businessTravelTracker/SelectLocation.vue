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
        {{$t('message.addLocation')}}
      </x-header>
    </div>
    <div class="index-list flex-grow no-overflow">
      <ul class="index-list-wrap" ref="indexWrap" @scroll="onListWrapScroll">
        <li v-for="(group,index) in data" :key="index" class="index-group" ref="indexGroup">
          <h3 class="index-group-title" @click="doNothing">{{group.title}}</h3>
          <ul>
            <li @click="clickItem(item)" v-for="(item,index) in group['countryData']" :key="index" class="index-group-item click-highLight" :class="index !== group.countryData['length'] - 1 ? 'border-b' : ''">
              <span class="name">{{item['countryName']}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="index-nav">
        <ul>
          <!--<li v-for="(item,index) in indexList" :key="index">{{item}}</li>-->
          <li v-for="(item,index) in indexList" :key="index" @click.prevent="_onTouchStartIndex(index)" :data-index="index" class="nav-item" :class="{'active':currentIndex===index}">{{item}}</li>
        </ul>
      </div>
      <transition name="fade">
        <div class="index-indicator" v-show="moving">{{currentIndicator}}</div>
      </transition>
      <!-- loading -->
      <loading-component v-if="$store.state.loadingFlag"></loading-component>
    </div>
  </div>
</template>

<script>
import loadingComponent from '../../components/LoadingCompoent'
import {
  getAllCountryBySort
} from './businessTravelTrackerApi'
// const INDICATOR_INDURATION = 500
// const TITLE_HEIGHT = 30
export default {
  name: 'SelectLocation',
  components: {loadingComponent},
  data () {
    return {
      data: [
        // {
        //   title: 'A',
        //   items: [
        //     {id: '100', value: 'A'},
        //     {id: '101', value: 'AA'},
        //     {id: '102', value: 'AAA'},
        //     {id: '103', value: 'AAAA'},
        //     {id: '104', value: 'AAAAA'}
        //
        //   ]
        // },
        // {
        //   title: 'B',
        //   items: [
        //     {id: '110', value: 'B'},
        //     {id: '111', value: 'BB'},
        //     {id: '112', value: 'BBB'},
        //     {id: '113', value: 'BBBB'},
        //     {id: '114', value: 'BBBBB'}
        //
        //   ]
        // },
        // {
        //   title: 'C',
        //   items: [
        //     {id: '120', value: 'C'},
        //     {id: '121', value: 'CC'},
        //     {id: '122', value: 'CCC'},
        //     {id: '123', value: 'CCCC'},
        //     {id: '124', value: 'CCCCC'}
        //   ]
        // },
        // {
        //   title: 'D',
        //   items: [
        //     {id: '120', value: 'C'},
        //     {id: '121', value: 'CC'},
        //     {id: '122', value: 'CCC'},
        //     {id: '123', value: 'CCCC'},
        //     {id: '124', value: 'CCCCC'}
        //
        //   ]
        // },
        // {
        //   title: 'E',
        //   items: [
        //     {id: '120', value: 'C'},
        //     {id: '121', value: 'CC'},
        //     {id: '122', value: 'CCC'},
        //     {id: '123', value: 'CCCC'},
        //     {id: '124', value: 'CCCCC'}
        //
        //   ]
        // },
        // {
        //   title: 'F',
        //   items: [
        //     {id: '120', value: 'C'},
        //     {id: '121', value: 'CC'},
        //     {id: '122', value: 'CCC'},
        //     {id: '123', value: 'CCCC'},
        //     {id: '124', value: 'CCCCC'}
        //
        //   ]
        // },
        // {
        //   title: 'G',
        //   items: [
        //     {id: '120', value: 'C'},
        //     {id: '121', value: 'CC'},
        //     {id: '122', value: 'CCC'},
        //     {id: '123', value: 'CCCC'},
        //     {id: '124', value: 'CCCCC'}
        //
        //   ]
        // }
      ],
      currentIndex: 0,
      moving: false,
      currentIndicator: ''
    }
  },
  created () {
    this.listHeight = []
    this.timer = null
    this.scrollTimer = null
  },
  watch: {
    currentIndex (newVal) {
      clearTimeout(this.timer)
      this.currentIndicator = this.indexList[this.currentIndex]
      // this.moving = true
      // this.timer = setTimeout(() => {
      //   this.moving = false
      // }, INDICATOR_INDURATION)
    }
  },
  computed: {
    indexList () {
      return this.data.map(group => {
        return group.title.substring(0, 1)
      })
    }
  },

  mounted () {
    this.getCountryList()
  },
  methods: {
    goback () {
      history.back()
    },
    _calculateHeight () {
      this.listHeight = []
      const list = this.$refs.indexGroup
      let height = 0
      this.listHeight.push(height)
      if (list) {
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      }
    },
    _onTouchStartIndex (index) {
      this.currentIndex = index
      this.$refs.indexWrap.scrollTop = this.listHeight[index] + 5
    },
    clickItem (item) {
      // this.$emit('choose', item)
      this.$store.commit('setBusinessTravelTrackerLocationMsg', item)
      // this.$router.replace({path: 'addLocation', query: {locationMsg: item}})
      this.$router.go(-1)
    },
    onListWrapScroll () {
      clearTimeout(this.scrollTimer)
      this.scrollTimer = setTimeout(() => {
        let scrollTop = this.$refs.indexWrap.scrollTop
        const listHeight = this.listHeight
        for (let i = 0; i < listHeight.length - 1; i++) {
          if (
            scrollTop <= listHeight[i + 1] &&
            scrollTop >= listHeight[i]
          ) {
            this.currentIndex = i
            return
          }
        }
      }, 20)
    },
    doNothing () {

    },
    getCountryList () {
      this.$store.commit('setLoadingFlag', true)
      getAllCountryBySort().then(res => {
        if (res['success']) {
          this.data = res['data']
          setTimeout(() => {
            this._calculateHeight()
          }, 20)
        }
        this.$store.commit('setLoadingFlag', false)
      })
    }
  },
  destroyed () {
    this.$store.commit('setLoadingFlag', false)
    clearTimeout(this.timer)
    clearTimeout(this.scrollTimer)
  }
}
</script>

<style scoped lang="scss">
  @import '../../assets/style/common';

  ul, li, h3{
    margin: 0!important;
    padding: 0!important;
  }
  .index-list {
    position: relative;
    width: 100%;
    height: 100%;
    background: #FFF;
    .index-list-wrap {
      height: 100%;
      overflow: auto;
    }
    .index-group {
      padding-bottom: 30px;
    }
    .index-group-title {
      height: 0.6rem;
      line-height:  0.6rem;
      padding-left: 0.2rem !important;
      font-size: 0.28rem;
      color: $kpmgBlue;
      background: $contractUploadBg;
    }
    .index-group-item {
      display: flex;
      align-items: center;
      height: 0.6rem;
      line-height:  0.6rem;
      margin: 0rem 0.4rem !important;
      list-style: none;
      .name {
        /*margin-left: 20px;*/
        /*color: rgba(255, 255, 255, 0.5);*/
        font-size: 0.32rem;
      }
    }
    .index-nav {
      position: absolute;
      right: 0;
      top: 50%;
      z-index: 100;
      width: 20px;
      padding: 20px 0;
      text-align: center;
      border-radius: 10px;
      background: rgba(0, 0, 0, 0.3);
      transform: translateY(-50%);
      .nav-item {
        padding: 3px;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.5);
        list-style: none;
        &.active {
          color: $kpmgBlue;
        }
      }
    }
    .index-indicator {
      position: absolute;
      width: 50px;
      height: 50px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      line-height: 50px;
      background: rgba(0, 0, 0, 0.7);
      color: #fff;
      font-size: 22px;
      border-radius: 5px;
      pointer-events: none;
    }
  }
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  .border-b{
    border-bottom: 1px solid $contractUploadBg;
  }
  .click-highLight{
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  .click-highLight:active {
    opacity: 0.2;
    background-color: $contractUploadBg;
    user-select: none;
  }
</style>
