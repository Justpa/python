import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const state = {
  loadingFlag: false,
  keyboardFlag: false,
  // 点击跳转页面时的本条数据
  businessTravelTrackerItem: {},
  // 接口返回的所有的list
  businessTravelTrackerAllList: [],
  // 新增还是更新
  businessTravelTrackerSaveOrUpdate: '',
  // 保存选择国家的信息
  businessTravelTrackerLocationMsg: null,
  // 记录滚动
  contractListScrollTop: 0,
  // fapiao头部的year和month
  fapiaoUploadYear: '',
  fapiaoUploadMonth: '',
  // fapiaolist页面跳转保存当前的scrollTop
  fapiaoListScrollTop: 0
}

const mutations = {
  setLoadingFlag (state, newValue) {
    state.loadingFlag = newValue
  },
  setKeyboardFlag (state, newValue) {
    state.keyboardFlag = newValue
  },
  setBusinessTravelTrackerItem (state, newValue) {
    state.businessTravelTrackerItem = newValue
  },
  setBusinessTravelTrackerAllList (state, newValue) {
    state.businessTravelTrackerAllList = newValue
  },
  setBusinessTravelTrackerSaveOrUpdate (state, newValue) {
    state.businessTravelTrackerSaveOrUpdate = newValue
  },
  setBusinessTravelTrackerLocationMsg (state, newValue) {
    state.businessTravelTrackerLocationMsg = newValue
  },
  setContractListScrollTop (state, newValue) {
    state.contractListScrollTop = newValue
  },
  setFapiaoUploadYear (state, newValue) {
    state.fapiaoUploadYear = newValue
  },
  setFapiaoUploadMonth (state, newValue) {
    state.fapiaoUploadMonth = newValue
  },
  setFapiaoListScrollTop (state, newValue) {
    state.fapiaoListScrollTop = newValue
  }
}

export default new Vuex.Store({
  state, mutations
})
