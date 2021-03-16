import {
  GET_PAGE,
  GET_MAP,
  GET_ARTWORK,
  GET_ARTISTS,
  GET_IMAGE,
  GET_NEARBY_ARTWORKS,
  GET_ARTWORKS_BY_ARTIST,
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

export function getArtists(payload) {
  return { type: GET_ARTISTS, payload }
}

export function getImage(payload) {
  return { type: GET_IMAGE, payload }
}

export function getNearbyArtworks(payload) {
  return { type: GET_NEARBY_ARTWORKS, payload }
}

export function getArtworksByArtist(payload) {
  return { type: GET_ARTWORKS_BY_ARTIST, payload }
}

