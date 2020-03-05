import React from 'react'

import Header from '../../elements/header'
import AtlasmuseumPageLoader from '../../elements/atlasmuseumPageLoader'

import './about.css'

/**
 * À propos
 */
const About = () => (
  <div id="appContainer">
    <Header
      text="À propos"
      back
      link="/"
    />
    <main id="appContent">
      <AtlasmuseumPageLoader
        page="À propos (application)"
      />
    </main>
  </div>
)

export default About
