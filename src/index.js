import React from 'react'
import { render } from 'react-dom'

import store from './js/store'
import Root from './js/components/root'

import './css/index.css'
import './css/font.css'

render(
  <Root store={store} />,
  document.getElementById('root')
)
