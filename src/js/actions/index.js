import {
  GET_PAGE,
  GET_MAP,
  GET_ARTWORK,
  GET_IMAGE,
} from '../constants/action-types'

export function getPage(payload) {
  return { type: GET_PAGE, payload }
}

export function getMap(payload) {
  return { type: GET_MAP, payload }
}

export function getArtwork(payload) {
  return { type: GET_ARTWORK, payload }
}

export function getImage(payload) {
  return { type: GET_IMAGE, payload }
}
