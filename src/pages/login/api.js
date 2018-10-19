import axios from 'axios'
import {businessPrefix} from '../../api/config'

export const loginByName = async (params) => {
  const data = await axios.post(`/${businessPrefix}/authentication/authenticationByUserNameAndPassword`, params)
  return data
  // callback()
}
