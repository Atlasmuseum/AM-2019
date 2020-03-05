import {
  GET_PAGE,
  GET_PAGE_READY,
  GET_MAP,
  GET_MAP_READY,
} from '../constants/action-types'

// État initial : aucun résultat, recherche pas encore activée
const initialState = {
  apiLoading: false,
  apiResults: [],
}

function rootReducer(state = initialState, action) {
  if (action.type === GET_PAGE) {
    // Appel API pour récupérer le contenu d'une page
    return Object.assign({}, state, {
      apiLoading: true,
      apiResults: [],
    })
  }

  if (action.type === GET_PAGE_READY) {
    // L'API a retourné un résultat
    return Object.assign({}, state, {
      apiLoading: false,
      apiResults: action.payload,
    })
  }

  if (action.type === GET_MAP) {
    // Appel API pour récupérer les données de carte
    return Object.assign({}, state, {
      apiLoading: true,
      apiResults: [],
    })
  }

  if (action.type === GET_MAP_READY) {
    // L'API a retourné un résultat
    return Object.assign({}, state, {
      apiLoading: false,
      apiResults: action.payload,
    })
  }

  return state
}

export default rootReducer
