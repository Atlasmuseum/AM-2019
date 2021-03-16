import React from 'react'

import Header from '../../elements/header'
import SearchArtist from '../../elements/search/searchArtist'

const SearchArtistView = () => (
  <div id="appContainer">
    <Header
      text="Rechercher"
      back
      link="/"
    />
    <main id="appContent">
      <SearchArtist />
    </main>
  </div>
)

export default SearchArtistView
