import React from 'react'
import { Link } from "react-router-dom";

import Header from '../../elements/header'

const SearchCountries = () => (
  <div id="appContainer">
    <Header
      text="Rechercher"
      back
      link="/"
    />
    <main id="appContent">
    </main>
  </div>
)

export default SearchCountries
