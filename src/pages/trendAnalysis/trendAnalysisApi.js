import axios from 'axios'
import {businessPrefix} from '../../api/config'

export const queryAnnualOverallAnalysis = async (params) => {
  const {data} = await axios.post(`/${businessPrefix}/employeeMonthlyWithholding/queryAnnualOverallAnalysisForEmployee`, params)
  return data
  // callback()
}
export const queryAnnualDetailTrends = async (params) => {
  const {data} = await axios.post(`/${businessPrefix}/employeeMonthlyWithholding/queryAnnualDetailTrendsForEmployee`, params)
  return data
  // callback()
}
