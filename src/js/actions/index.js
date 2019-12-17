import {
  GET_PAGE,
} from '../constants/action-types'

export function getPage(payload) {
  return { type: GET_PAGE, payload }
}
