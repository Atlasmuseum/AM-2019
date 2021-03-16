import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from '../views/home'
import Search from '../views/search'
import SearchStandard from '../views/search/searchStandard'
import SearchDate from '../views/search/searchDate'
import SearchArtist from '../views/search/searchArtist'
import SearchArtists from '../views/search/searchArtists'
import SearchCities from '../views/search/searchCities'
import SearchCountries from '../views/search/searchCountries'
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
      <Route exact path="/search" component={Search} />
      <Route exact path="/search/standard" component={SearchStandard} />
      <Route exact path="/search/date" component={SearchDate} />
      <Route exact path="/search/artists" component={SearchArtists} />
      <Route exact path="/search/artist/:title" component={SearchArtist} />
      <Route exact path="/search/cities" component={SearchCities} />
      <Route exact path="/search/countries" component={SearchCountries} />
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
