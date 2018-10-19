import axios from 'axios'
import {businessPrefix, systemPrefix} from '../../api/config'

export const getEmployeeInfo = async (params) => {
  const {data} = await axios.post(`/${businessPrefix}/employee/getById`, params)
  return data
  // callback()
}
export const getEmployeeTax = async (value) => {
  const {data} = await axios.get(`/${businessPrefix}/employeeTax/getByEmployeeId/${value}`)
  return data
  // callback()
}

export const getConfigQueryList = async (params) => {
  const {data} = await axios.post(`/${systemPrefix}/config/queryList`, params)
  return data
  // callback()
}

// 获取employer
export const getEmployer = async (value) => {
  const {data} = await axios.get(`/${businessPrefix}/employeeAndEmployer/getByEmployeeId/${value}`)
  return data
  // callback()
}

// 保存对话框的值 employer
export const saveEmployer = async (params) => {
  const {data} = await axios.post(`/${businessPrefix}/employeeAndEmployer/create`, params)
  return data
  // callback()
}

// 更新对话框的值 employer
export const updateEmployer = async (params) => {
  const {data} = await axios.put(`/${businessPrefix}/employeeAndEmployer/update`, params)
  return data
  // callback()
}

// 删除 employer
export const deleteEmployer = async (value) => {
  const {data} = await axios.delete(`/${businessPrefix}/employeeAndEmployer/delete/${value}`)
  return data
  // callback()
}

export const saveEmployeeInfo = async (params) => {
  const {data} = await axios.put(`/${businessPrefix}/employee/save`, params)
  return data
  // callback()
}

export const updateEmployeeTax = async (params) => {
  const {data} = await axios.put(`/${businessPrefix}/employeeTax/update`, params)
  return data
  // callback()
}
