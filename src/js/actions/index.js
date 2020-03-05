import {
  GET_PAGE,
  GET_MAP,
} from '../constants/action-types'

export function getPage(payload) {
  return { type: GET_PAGE, payload }
}

export function getMap(payload) {
  return { type: GET_MAP, payload }
}
