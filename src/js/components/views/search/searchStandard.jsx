import React from 'react'

import Header from '../../elements/header'
import SearchStandard from '../../elements/search/searchStandard'

const SearchStandardView = () => (
  <div id="appContainer">
    <Header
      text="Rechercher"
      back
      link="/"
    />
    <main id="appContent">
      <SearchStandard />
    </main>
  </div>
)

export default SearchStandardView
