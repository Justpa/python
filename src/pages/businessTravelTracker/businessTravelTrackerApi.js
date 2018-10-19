import axios from 'axios'
import {businessPrefix} from '../../api/config'

export const getByEmployeeId = async (params) => {
  const {data} = await axios.post(`/${businessPrefix}/employeeTravel/getByEmployeeId`, params)
  return data
}
export const updateEmployeeTravel = async (params) => {
  const {data} = await axios.put(`/${businessPrefix}/employeeTravel/update`, params)
  return data
}
export const addEmployeeTravel = async (params) => {
  const {data} = await axios.post(`/${businessPrefix}/employeeTravel/create`, params)
  return data
}
export const deleteEmployeeTravel = async (params) => {
  const {data} = await axios.delete(`/${businessPrefix}/employeeTravel/delete`, {data: params})
  return data
}
export const getAllCountryBySort = async () => {
  const {data} = await axios.get(`/${businessPrefix}/employee/getAllCountryBySort`)
  return data
}
