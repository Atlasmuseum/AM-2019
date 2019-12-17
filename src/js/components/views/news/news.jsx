import React from 'react'

import Header from '../../elements/header'
import AtlasmuseumPageLoader from '../../elements/atlasmuseumPageLoader'

import './news.css'

/**
 * Actualités
 */
const Home = () => (
  <div id="appContainer">
    <Header
      text="Actualités"
      back
      link="/"
    />
    <main id="appContent">
      <AtlasmuseumPageLoader
        page="Actualités"
      />
    </main>
  </div>
)

export default Home
