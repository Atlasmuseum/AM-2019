import React from 'react'

import Header from '../../elements/header'
import Login from '../../elements/login'

/**
 * Œuvre
 */
const LoginView = () => (
  <div id="appContainer">
    <Header
      text="Se connecter"
      back
      link="/"
    />
    <main id="appContent" className="noPadding">
      <Login />
    </main>
  </div>
)

export default LoginView
