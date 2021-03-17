import {
  GET_PAGE,
  GET_PAGE_READY,
  GET_MAP,
  GET_MAP_READY,
  GET_ARTWORK,
  GET_ARTWORK_READY,
  GET_ARTISTS,
  GET_ARTISTS_READY,
  GET_IMAGE,
  GET_IMAGE_READY,
  GET_NEARBY_ARTWORKS,
  GET_NEARBY_ARTWORKS_READY,
  GET_ARTWORKS_BY_ARTIST,
  GET_ARTWORKS_BY_ARTIST_READY,
  GET_SEARCH,
  GET_SEARCH_READY,
} from '../constants/action-types'

// État initial : aucun résultat, recherche pas encore activée
const initialState = {
  apiLoading: false,
  imageLoading: false,
  apiResults: [],
  apiImageResults: [],
}

function rootReducer(state = initialState, action) {
  if (action.type === GET_PAGE
    || action.type === GET_MAP
    || action.type === GET_ARTWORK
    || action.type === GET_ARTISTS
    || action.type === GET_NEARBY_ARTWORKS
    || action.type === GET_ARTWORKS_BY_ARTIST
    || action.type === GET_SEARCH
  ) {
    // Appel API
    return Object.assign({}, state, {
      apiLoading: true,
      apiResults: [],
    })
  }

  if (action.type === GET_IMAGE) {
    // Appel API
    return Object.assign({}, state, {
      imageLoading: true,
      apiImageResults: [],
    })
  }

  if (action.type === GET_PAGE_READY
    || action.type === GET_MAP_READY
    || action.type === GET_ARTWORK_READY
    || action.type === GET_ARTISTS_READY
    || action.type === GET_NEARBY_ARTWORKS_READY
    || action.type === GET_ARTWORKS_BY_ARTIST_READY
    || action.type === GET_SEARCH_READY
  ) {
    // L'API a retourné un résultat
    return Object.assign({}, state, {
      apiLoading: false,
      apiResults: action.payload,
    })
  }

  if (action.type === GET_IMAGE_READY) {
    // L'API a retourné un résultat
    return Object.assign({}, state, {
      imageLoading: false,
      apiImageResults: action.payload,
    })
  }

  return state
}

export default rootReducer
