import { takeEvery, call, put } from 'redux-saga/effects'
import { 
  API_ERROR,
  GET_PAGE,
  GET_PAGE_READY,
  GET_MAP,
  GET_MAP_READY,
} from '../constants/action-types'

export default function* watcherSaga() {
  yield takeEvery(GET_PAGE, getPageSaga)
  yield takeEvery(GET_MAP, getMapSaga)
}

function* getPageSaga(args) {
  try {
    const payload = yield call(getPage, args)
    yield put({ type: GET_PAGE_READY, payload })
  } catch (e) {
    yield put({ type: API_ERROR, payload: e })
  }
}

function* getMapSaga(args) {
  try {
    const payload = yield call(getMap, args)
    yield put({ type: GET_MAP_READY, payload })
  } catch (e) {
    yield put({ type: API_ERROR, payload: e })
  }
}

/**
 * Appelle l'API atlasmuseum pour récupérer le contenu d'une page, sans la table des matières
 *
 * @param {Object} args - args.payload.page contient le nom de la page à récupérer
 */
function getPage(args) {
  if (args && args.payload && args.payload.page && typeof args.payload.page === 'string') {
    // Paramêtres de requête API
    const requestParameters = {
      action: 'parse',
      disabletoc: false,
      prop: 'text',
      redirects: true,
      disableeditsection: true,
      page: args.payload.page,
      format: 'json'
    }
    
    
    return getAPI(requestParameters)
      .then(data => {
        if (!data.error) {
          return [data.parse.text['*'].replace('<a href="/wiki', '<a href="http://publicartmuseum.net/wiki')]
        }

        return []
      })
  }

  return []
}

/**
 * Récupération des données de carte
 * @param {*} args 
 */
function getMap(args) {
  // Paramêtres de requête API
  const requestParameters = {
    action: 'amgetmap',
  }

  return getAMAPI(requestParameters)
    .then(data => {
      if (data.success) {
        return data.entities
      }

      return []
    })
}

/**
 * Appel de l'API atlasmuseum avec une méthode GET
 *
 * @param {Object} requestParameters - Paramètres à passer à l'API
 */
function getAPI(requestParameters) {
  // Paramêtres de requête fetch
  const requestInit = {
    method: 'GET',
    mode: 'cors',
    cache: 'default'
  }

  // Construction de l'URL de la requête API
  const requestUrl = 'http://publicartmuseum.net/w/api.php?' + 
  Object.keys(requestParameters).map(function(key) {
    return encodeURIComponent(key) + '=' + encodeURIComponent(requestParameters[key])
  }).join('&')

  // Appel de l'API
  return fetch(requestUrl, requestInit)
    .then(response => {
      return response.json()
    })
}

/**
 * Appel de l'API interne atlasmuseum avec une méthode GET
 *
 * @param {Object} requestParameters - Paramètres à passer à l'API
 */
function getAMAPI(requestParameters) {
  // Paramêtres de requête fetch
  const requestInit = {
    method: 'GET',
    mode: 'cors',
    cache: 'default'
  }
  // Construction de l'URL de la requête API
  const requestUrl = 'http://publicartmuseum.net/w/amapi/index.php?' + 
  Object.keys(requestParameters).map(function(key) {
    return encodeURIComponent(key) + '=' + encodeURIComponent(requestParameters[key])
  }).join('&')

  // Appel de l'API
  return fetch(requestUrl, requestInit)
    .then(response => {
      return response.json()
    })
    .then(response => {
      return response
    })
}
