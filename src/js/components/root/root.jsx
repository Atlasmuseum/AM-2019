import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from '../views/home'
import News from '../views/news'

const Root = ({ store }) => (
  <Provider store={store}>
    <Router basename={'/app'}>
      <Route exact path="/news" component={News} />
      <Route exact path="/" component={Home} />
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root
