import React from 'react'

import Header from '../../elements/header'
import Edit from '../../elements/edit'

/**
 * Œuvre
 */
const Help = () => (
  <div id="appContainer">
    <Header
      text="Contribuer"
      back
      link="/"
    />
    <main id="appContent" className="noPadding noOverflow">
      <Edit />
    </main>
  </div>
)

export default Help
