import Axios from 'axios'
import { entry } from '@/values/api'

export const get = async ({ entryUrl = entry, url, data = {}, headers = null, token = null }) => {
  return !token
    ? await Axios.get(entryUrl + url, {
      params: data
    })
    : await Axios.get(entryUrl + url, {
      params: data,
      headers: { Authorization: 'Bearer ' + token, ...headers }
    })
}

export const post = async ({ entryUrl = entry, url, data = {}, headers = null, token = null }) => {
  return !token
    ? await Axios.post(entryUrl + url, data)
    : await Axios.post(entryUrl + url, data, {
      headers: { Authorization: 'Bearer ' + token, ...headers }
    })
}

export const put = async ({ entryUrl = entry, url, data = {}, headers = null, token = null }) => {
  return !token
    ? await Axios.put(entryUrl + url, data)
    : await Axios.put(entryUrl + url, data, {
      headers: { Authorization: 'Bearer ' + token, ...headers }
    })
}

export const patch = async ({ entryUrl = entry, url, data = {}, headers = null, token = null }) => {
  return !token
    ? await Axios.patch(entryUrl + url, data)
    : await Axios.patch(entryUrl + url, data, {
      headers: { Authorization: 'Bearer ' + token, ...headers }
    })
}

export const del = async ({ entryUrl = entry, url, data = {}, headers = null, token = null }) => {
  return !token
    ? await Axios.delete(entryUrl + url, {
      params: data
    })
    : await Axios.delete(entryUrl + url, {
      params: data,
      headers: { Authorization: 'Bearer ' + token, ...headers }
    })
}
