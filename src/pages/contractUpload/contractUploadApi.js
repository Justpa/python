import axios from 'axios'
import {businessPrefix} from '../../api/config'

export const queryContractHmiList = async (params) => {
  const {data} = await axios.post(`/${businessPrefix}/contractHmi/queryContractHmi`, params)
  return data
  // callback()
}
export const addContractHmi = async (params) => {
  const {data} = await axios.post(`/${businessPrefix}/contractHmi`, params)
  return data
  // callback()
}
