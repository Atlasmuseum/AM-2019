import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from '../views/home'
import Map from '../views/map'
import Help from '../views/help'
import News from '../views/news'
import About from '../views/about'

const Root = ({ store }) => (
  <Provider store={store}>
    <Router basename={'/app'}>
      <Route exact path="/map" component={Map} />
      <Route exact path="/help" component={Help} />
      <Route exact path="/news" component={News} />
      <Route exact path="/about" component={About} />
      <Route exact path="/" component={Home} />
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root
