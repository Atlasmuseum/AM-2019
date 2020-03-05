import React from 'react'

import Header from '../../elements/header'
import AtlasmuseumPageLoader from '../../elements/atlasmuseumPageLoader'

import './help.css'

/**
 * Aide
 */
const Help = () => (
  <div id="appContainer">
    <Header
      text="Aide"
      back
      link="/"
    />
    <main id="appContent">
      <AtlasmuseumPageLoader
        page="Aide (application)"
      />
    </main>
  </div>
)

export default Help
