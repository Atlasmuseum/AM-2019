import React from 'react'

import Header from '../../elements/header'
import ArtworkMap from '../../elements/map'

import './map.css'

/**
 * Aide
 */
const Help = () => (
  <div id="appContainer">
    <Header
      text="Carte des œuvres"
      back
      link="/"
    />
    <main id="appContent" className="mapContainer">
      <ArtworkMap />
    </main>
  </div>
)

export default Help
