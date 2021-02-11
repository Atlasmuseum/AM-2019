import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from '../views/home'
import ArtworkMap from '../views/map'
import Edit from '../views/edit'
import Help from '../views/help'
import News from '../views/news'
import About from '../views/about'
import Artwork from '../views/artwork'
import Around from '../views/around'
import Login from '../views/login'

const Root = ({ store }) => (
  <Provider store={store}>
    <Router basename={'/app'}>
      <Route exact path="/map" component={ArtworkMap} />
      <Route exact path="/help" component={Help} />
      <Route exact path="/news" component={News} />
      <Route exact path="/about" component={About} />
      <Route exact path="/around" component={Around} />
      <Route exact path="/artwork/:title" component={Artwork} />
      <Route exact path="/edit" component={Edit} />
      <Route exact path="/edit/:title" component={Edit} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={Home} />
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root
