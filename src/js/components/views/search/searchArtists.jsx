import React from 'react'

import Header from '../../elements/header'
import SearchArtists from '../../elements/search/searchArtists'

const SearchArtistsView = () => (
  <div id="appContainer">
    <Header
      text="Rechercher"
      back
      link="/"
    />
    <main id="appContent">
      <SearchArtists />
    </main>
  </div>
)

export default SearchArtistsView
