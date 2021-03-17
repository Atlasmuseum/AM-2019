import React from 'react'
import { Link } from "react-router-dom";

import Header from '../../elements/header'

import './search.css';

/**
 * Aide
 */
const Help = () => (
  <div id="appContainer">
    <Header
      text="Rechercher"
      back
      link="/"
    />
    <main id="appContent">
      <div className="nearbyArtworksContainer searchContainer">
        <div className="artworkLine">
          <h2><Link to="search/standard">Rechercher par artiste, titre, lieu</Link></h2>
        </div>
        {/*
        <div className="artworkLine">
          <h2><Link to="search/date">Rechercher par date</Link></h2>
        </div>
        */}
        <div className="artworkLine">
          <h2><Link to="search/artists">Liste des artistes</Link></h2>
        </div>
        {/*
        <div className="artworkLine">
          <h2><Link to="search/cities">Liste des villes</Link></h2>
        </div>
        <div className="artworkLine">
          <h2><Link to="search/countries">Liste des pays</Link></h2>
        </div>
        */}
      </div>
    </main>
  </div>
)

export default Help
