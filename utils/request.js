import Axios from 'axios'
import { entry } from '@/values/api'

export const post = async ({ entryUrl = entry, url, data }) => {
  return await Axios.post(entryUrl + url, data)
}

export const get = async ({ entryUrl = entry, url, data = {} }) => {
  return await Axios.get(entryUrl + url, {
    params: data,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  })
}
