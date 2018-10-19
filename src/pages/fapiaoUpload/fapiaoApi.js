import axios from 'axios'
import {businessPrefix} from '../../api/config'

export const getQueryList = async (params) => {
  const {data} = await axios.post(`/${businessPrefix}/fapiao/queryList`, params)
  return data
  // callback()
}
export const getFapiaoAmount = async (params) => {
  const {data} = await axios.post(`/${businessPrefix}/fapiao/queryFapiaoAmount`, params)
  return data
  // callback()
}
