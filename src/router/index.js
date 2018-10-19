import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login/Login'
import Home from '@/pages/home/Home'
import PersonalDetails from '@/pages/personalDetails/PersonalDetails'
import ContractUploadHome from '@/pages/contractUpload/ContractUploadHome'
import ContractUploadList from '@/pages/contractUpload/ContractUploadList'
import NoUploads from '@/pages/contractUpload/NoUploads'
import UploadDetails from '@/pages/contractUpload/UploadDetails.vue'
import FapiaoUpload from '@/pages/fapiaoUpload/FapiaoUpload'
import FapiaoList from '@/pages/fapiaoUpload/FapiaoList'
import FapiaoUploadSave from '@/pages/fapiaoUpload/FapiaoUploadSave'
import BusinessTravelTracker from '@/pages/businessTravelTracker/BusinessTravelTracker'
import TrendAnalysis from '@/pages/trendAnalysis/TrendAnalysis'
import AddLocation from '@/pages/businessTravelTracker/AddLocation'
import SelectLocation from '@/pages/businessTravelTracker/SelectLocation'
import NotificationsAndGuidance from '@/pages/notificationsAndGuidance/NotificationsAndGuidance'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      name: 'Login',
      redirect: 'Login',
      component: Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/personalDetails',
      name: 'PersonalDetails',
      component: PersonalDetails
    },
    {
      path: '/contractUploadHome',
      name: 'ContractUploadHome',
      component: ContractUploadHome
    },
    {
      path: '/contractUploadList',
      name: 'ContractUploadList',
      component: ContractUploadList,
      meta: {
        keepAlive: true, //  是否需要被缓存
        isBack: false
      }
    },
    {
      path: '/noUploads',
      name: 'NoUploads',
      component: NoUploads
    },
    {
      path: '/uploadDetails',
      name: 'UploadDetails',
      component: UploadDetails
    },
    {
      path: '/fapiaoUpload',
      name: 'FapiaoUpload',
      component: FapiaoUpload,
      meta: {
        keepAlive: true, //  是否需要被缓存
        isBack: false
      }
    },
    {
      path: '/fapiaoList',
      name: 'FapiaoList',
      component: FapiaoList,
      meta: {
        keepAlive: true, //  是否需要被缓存
        isBack: false
      }
    },
    {
      path: '/fapiaoUploadSave',
      name: 'FapiaoUploadSave',
      component: FapiaoUploadSave
    },
    {
      path: '/businessTravelTracker',
      name: 'BusinessTravelTracker',
      component: BusinessTravelTracker,
      meta: {
        keepAlive: true, //  是否需要被缓存
        isBack: false
      }
    },
    {
      path: '/trendAnalysis',
      name: 'TrendAnalysis',
      component: TrendAnalysis
    },
    {
      path: '/addLocation',
      name: 'AddLocation',
      component: AddLocation
    },
    {
      path: '/selectLocation',
      name: 'SelectLocation',
      component: SelectLocation
    },
    {
      path: '/notificationsAndGuidance',
      name: 'NotificationsAndGuidance',
      component: NotificationsAndGuidance
    }
  ]
})
