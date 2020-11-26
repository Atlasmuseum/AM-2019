import React from 'react'

import Header from '../../elements/header'
import NearbyArtworks from '../../elements/nearbyArtworks'

import './around.css'

/**
 * 
 */
const Around = () => (
  <div id="appContainer">
    <Header
      text="Autour de moi"
      back
      link="/"
    />
    <main id="appContent" className="noPadding">
      <NearbyArtworks />
    </main>
  </div>
)

export default Around
