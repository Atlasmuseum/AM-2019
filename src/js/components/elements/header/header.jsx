import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from "react-router"

import backIcon from '../../../../assets/images/arrowLeft.png'
import headerIcon from '../../../../assets/images/headerIcon.png'

import './header.css'

/**
 * En-tête
 */
export class Header extends Component {
  onClick = () => {
    const {
      history,
      link,
    } = this.props

    history.push(link)
  }

  render() {
    const {
      text,
      back,
    } = this.props

    return (
      <header className="appHeader">
        <h1
          role="button"
          onClick={this.onClick}
        >
          { back
          ? <img className="appHeaderBackIcon" src={backIcon} alt="back" />
          : <span className="appHeaderBackSpacer" />
          }
          <img className="appHeaderIcon" src={headerIcon} alt={text} />
          <span>{text}</span>
        </h1>
      </header>
    )
  }
}

Header.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  text: PropTypes.string,
  back: PropTypes.bool,
  link: PropTypes.string,
}

Header.defaultProps = {
  text: 'atlasmuseum',
  back: false,
  link: '/',
}

export default withRouter(Header)
