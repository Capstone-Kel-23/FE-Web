import Axios from 'axios'
import { entry } from '@/values/api'

export const get = async ({ entryUrl = entry, url, data = {} }) => {
  return await Axios.get(entryUrl + url, {
    params: data
    // headers: {
    //   'Access-Control-Allow-Origin': '*'
    // }
  })
}

export const post = async ({ entryUrl = entry, url, data }) => {
  return await Axios.post(entryUrl + url, data)
}

export const put = async ({ entryUrl = entry, url, data }) => {
  return await Axios.put(entryUrl + url, data)
}

export const del = async ({ entryUrl = entry, url, data }) => {
  return await Axios.delete(entryUrl + url, data)
}
