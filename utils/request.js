import Axios from 'axios'
import { entry } from '@/values/api'

export const post = async ({ url, data }) => {
  return await Axios.post(entry + url, data)
}

export const get = async ({ url, data }) => {
  return await Axios.get(entry + url, {
    params: data
  })
}
