import axios from 'axios'
import {interfaceUrl} from './config'

function initAxios (vm) {
  axios.defaults.baseURL = `${interfaceUrl}`
  axios.defaults.timeout = 10000
  // request add header token
  axios.interceptors.request.use((config) => {
    // config.cancelToken = new axios.CancelToken(cancel => {
    //   this.$allRequest.push({cancel})
    // })
    const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
    if (userInfo && userInfo.tokenId) {
      config.headers.Authorization = userInfo.tokenId
    }
    return config
  })
  axios.interceptors.response.use(function (res) {
    if (res['status'] === 200) {
      return res
    }
  }, function (err) {
    const error = err.response
    let errorMsg = vm.$t(`exception.internalSystemError`)
    if (error.status === 400) {
      const details = error.data.fieldsError
      const errorCode = error.data.errCode
      if (errorCode !== 'ERR_SYS_COM_002') {
        errorMsg = vm.$t(`exception.businessError.${errorCode}`)
        if (errorMsg.indexOf(errorCode) !== -1) {
          errorMsg = vm.$t(`exception.requestInvalid`)
        }
      } else if (errorCode === 'ERR_SYS_COM_002' && details) {
        Object.keys(details).forEach(key => {
          errorMsg = vm.$t(`exception.businessError.${details[key]}`)
        })
      }
    } else if (error.status === 401 && error.data.errCode === 'ERR_SYS_COM_099') {
      sessionStorage.removeItem('userInfo')
      vm.$router.push({path: '/'})
    } else if (error.status === 403) {
      errorMsg = vm.$t(`exception.operationNotAllowed`)
    }
    vm.$store.commit('setLoadingFlag', false)
    vm.$vux.toast.show({
      type: 'warn',
      text: errorMsg,
      isShowMask: true,
      time: '1000'
    })
    return Promise.reject(error)
  })
}

export default initAxios
