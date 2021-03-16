import React from 'react'

import Header from '../../elements/header'
import Artwork from '../../elements/artwork'

/**
 * Œuvre
 */
const Help = () => (
  <div id="appContainer">
    <Header
      text="Notice de l'œuvre"
      back
      link="/"
      edit={true}
    />
    <main id="appContent" className="noPadding">
      <Artwork />
    </main>
  </div>
)

export default Help
